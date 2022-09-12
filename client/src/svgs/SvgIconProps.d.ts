import { SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGElement> {
  className?: string;
  children?: React.ReactNode;
}
