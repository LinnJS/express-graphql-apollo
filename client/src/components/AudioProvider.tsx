/* eslint-disable jsx-a11y/media-has-caption */
// @ts-nocheck
import { createContext, useContext, useMemo, useReducer, useRef } from 'react';

const AudioPlayerContext = createContext();

const reducers = {
  SET_META(state: any, action: { payload: any; }) {
    return { ...state, meta: action.payload };
  },
  PLAY(state: any, _action: any) {
    return { ...state, playing: true };
  },
  PAUSE(state: any, _action: any) {
    return { ...state, playing: false };
  },
  TOGGLE_MUTE(state: { muted: any; }, _action: any) {
    return { ...state, muted: !state.muted };
  },
  SET_CURRENT_TIME(state: any, action: { payload: any; }) {
    return { ...state, currentTime: action.payload };
  },
  SET_DURATION(state: any, action: { payload: any; }) {
    return { ...state, duration: action.payload };
  },
};

function audioReducer(state: any, action: { type: string | number; }) {
  return reducers[action.type](state, action);
}

export function AudioProvider({ children }: any) {
  const [state, dispatch] = useReducer(audioReducer, {
    playing: false,
    muted: false,
    duration: 0,
    currentTime: 0,
    meta: null,
  });
  const playerRef = useRef(null);

  const actions = useMemo(() => {
    return {
      play(data: { audio: { src: any; }; }) {
        if (data) {
          //
          dispatch({ type: 'SET_META', payload: data });

          if (playerRef.current.currentSrc !== data.audio.src) {
            const playbackRate = playerRef.current.playbackRate;
            playerRef.current.src = data.audio.src;
            playerRef.current.load();
            playerRef.current.pause();
            playerRef.current.playbackRate = playbackRate;
            playerRef.currentTime = 0;
          }
        }

        playerRef.current.play();
      },
      pause() {
        playerRef.current.pause();
      },
      toggle(data) {
        this.isPlaying(data) ? actions.pause() : actions.play(data);
      },
      seekBy(amount) {
        playerRef.current.currentTime += amount;
      },
      seek(time) {
        playerRef.current.currentTime = time;
      },
      playbackRate(rate) {
        playerRef.current.playbackRate = rate;
      },
      toggleMute() {
        dispatch({ type: 'TOGGLE_MUTE' });
      },
      isPlaying(data) {
        return data ? state.playing && playerRef.current.currentSrc === data.audio.src : state.playing;
      },
    };
  }, [state.playing]);

  const api = useMemo(() => ({ ...state, ...actions }), [state, actions]);

  return (
    <>
      <AudioPlayerContext.Provider value={api}>{children}</AudioPlayerContext.Provider>
      <audio
        ref={playerRef}
        onPlay={() => dispatch({ type: 'PLAY' })}
        onPause={() => dispatch({ type: 'PAUSE' })}
        onTimeUpdate={(event) => {
          dispatch({
            type: 'SET_CURRENT_TIME',
            payload: Math.floor(event.target.currentTime),
          });
        }}
        onDurationChange={(event) => {
          dispatch({
            type: 'SET_DURATION',
            payload: Math.floor(event.target.duration),
          });
        }}
        muted={state.muted}
      />
    </>
  );
}

export function useAudioPlayer(data) {
  const player = useContext(AudioPlayerContext);

  return useMemo(
    () => ({
      ...player,
      play() {
        player.play(data);
      },
      toggle() {
        player.toggle(data);
      },
      get playing() {
        return player.isPlaying(data);
      },
    }),
    [player, data]
  );
}
