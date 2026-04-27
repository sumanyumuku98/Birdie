import { describe, it, expect } from 'vitest';
import { isInternalURL } from '../../src/main/external-links';

describe('isInternalURL', () => {
  it('allows x.com', () => {
    expect(isInternalURL('https://x.com')).toBe(true);
    expect(isInternalURL('https://x.com/home')).toBe(true);
    expect(isInternalURL('https://x.com/user/status/123')).toBe(true);
  });

  it('allows twitter.com', () => {
    expect(isInternalURL('https://twitter.com')).toBe(true);
    expect(isInternalURL('https://twitter.com/home')).toBe(true);
  });

  it('allows twimg.com subdomains', () => {
    expect(isInternalURL('https://pbs.twimg.com/media/abc.jpg')).toBe(true);
    expect(isInternalURL('https://abs.twimg.com/something')).toBe(true);
    expect(isInternalURL('https://video.twimg.com/tweet_video/abc.mp4')).toBe(true);
  });

  it('allows t.co', () => {
    expect(isInternalURL('https://t.co/abc123')).toBe(true);
  });

  it('allows API domains', () => {
    expect(isInternalURL('https://api.x.com/graphql')).toBe(true);
    expect(isInternalURL('https://api.twitter.com/2/tweets')).toBe(true);
    expect(isInternalURL('https://upload.twitter.com/media')).toBe(true);
  });

  it('blocks external domains', () => {
    expect(isInternalURL('https://google.com')).toBe(false);
    expect(isInternalURL('https://github.com')).toBe(false);
    expect(isInternalURL('https://evil-x.com')).toBe(false);
    expect(isInternalURL('https://nottwitter.com')).toBe(false);
  });

  it('blocks non-https protocols', () => {
    expect(isInternalURL('file:///etc/passwd')).toBe(false);
    expect(isInternalURL('javascript:alert(1)')).toBe(false);
    expect(isInternalURL('data:text/html,<h1>hi</h1>')).toBe(false);
  });

  it('allows http (for redirects)', () => {
    expect(isInternalURL('http://x.com')).toBe(true);
    expect(isInternalURL('http://t.co/abc')).toBe(true);
  });

  it('handles invalid URLs', () => {
    expect(isInternalURL('')).toBe(false);
    expect(isInternalURL('not-a-url')).toBe(false);
    expect(isInternalURL('://missing-protocol')).toBe(false);
  });

  it('blocks domain spoofing attempts', () => {
    expect(isInternalURL('https://x.com.evil.com')).toBe(false);
    expect(isInternalURL('https://fakex.com')).toBe(false);
    expect(isInternalURL('https://twitter.com.phishing.net')).toBe(false);
  });
});
