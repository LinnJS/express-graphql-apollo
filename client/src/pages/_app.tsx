import { AudioProvider } from '@/components/AudioProvider';
import { Layout } from '@/components/Layout';
import { AppProps } from 'next/app';

import '@/styles/tailwind.css';
import 'focus-visible';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AudioProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AudioProvider>
  );
}
