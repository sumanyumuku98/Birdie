export const APP_NAME = 'Birdie';
export const APP_URL = 'https://x.com';

export const ALLOWED_DOMAINS = [
  'x.com',
  'twitter.com',
  'twimg.com',
  't.co',
  'abs.twimg.com',
  'pbs.twimg.com',
  'video.twimg.com',
  'ton.twimg.com',
  'api.x.com',
  'api.twitter.com',
  'upload.twitter.com',
  'caps.twitter.com',
];

export const ALLOWED_PERMISSIONS: string[] = [
  'notifications',
  'media',
  'clipboard-read',
  'clipboard-sanitized-write',
];

export const STORE_KEYS = {
  WINDOW_BOUNDS: 'windowBounds',
  THEME: 'theme',
} as const;

export const DEFAULT_WINDOW_BOUNDS = {
  width: 1200,
  height: 800,
  x: undefined as number | undefined,
  y: undefined as number | undefined,
};

export type WindowBounds = {
  width: number;
  height: number;
  x: number | undefined;
  y: number | undefined;
};
