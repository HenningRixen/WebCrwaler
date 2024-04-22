const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('console logs function working...', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
  });

test('console logs function working...', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
  });

test('console logs function working...', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
  });

test('console logs function working...', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
  });