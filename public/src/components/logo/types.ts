import { HTMLAttributes } from 'react';

export type LogoProps = HTMLAttributes<HTMLDivElement> & {
  width?: string | number 
  height?: string | number
}
