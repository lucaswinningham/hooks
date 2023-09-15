import { PropsWithChildren } from 'react';

import './typography.css';

const Size = {
  xs: '0.75rem',
  sm: '0.867rem',
  md: '1rem',
  lg: '1.133rem',
  xl: '1.267rem',
  xxl: '1.533rem',
  '3xl': '1.933rem',
  '4xl': '3.067rem',
  '5xl': '4rem',
} as const;

const Height = {
  sm: 1.1,
  md: 1.25,
  lg: 1.5,
  xl: 2,
} as const;

const Weight = {
  lt: 100,
  normal: 'normal',
  md: 400,
  bold: 'bold',
  hv: 700,
};

type TypographyProps = PropsWithChildren<{
  size?: keyof typeof Size;
  height?: keyof typeof Height;
  weight?: keyof typeof Weight;
}>;

export const Typography = ({
  size = 'md',
  height = 'md',
  weight = 'md',
  children,
}: TypographyProps) => (
  <div className="typography" style={{
    fontSize: Size[size],
    fontWeight: Weight[weight],
    lineHeight: Height[height],
  }}>
    {children}
  </div>
);
