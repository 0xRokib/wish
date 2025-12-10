export enum WishTone {
  PROFESSIONAL = 'Professional',
  FUNNY = 'Funny',
  HEARTFELT = 'Heartfelt',
  POETIC = 'Poetic'
}

export interface GeneratedWishResponse {
  wish: string;
}

export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}