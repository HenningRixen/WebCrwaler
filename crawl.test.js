const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')


test('normalize https /', () => {
  expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('normalize https', () => {
  expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('normalize http /', () => {
  expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('normalize http', () => {
  expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('getURl absolute', () => {
  const htmlBody = '<a href="https://boot.dev">Learn Backend Development</a>'
  const baseURL = 'https://boot.dev'
  const actual = getURLsFromHTML(htmlBody, baseURL)
  const expected = ['https://boot.dev/']
  expect(actual).toEqual(expected)
})


test('getURl one', () => {
  const htmlBody = '<a href="/path">Learn Backend Development</a>'
  const baseURL = 'https://boot.dev'
  const actual = getURLsFromHTML(htmlBody, baseURL)
  const expected = ['https://boot.dev/path']
  expect(actual).toEqual(expected)
})

test('getURl both', () => {
  const htmlBody = '<a href="/path">Learn Backend Development</a> <a href="/path/blog">Learn Backend Development</a>' 
  const baseURL = 'https://boot.dev'
  const actual = getURLsFromHTML(htmlBody, baseURL)
  const expected = ['https://boot.dev/path', 'https://boot.dev/path/blog' ]
  expect(actual).toEqual(expected)
})

test('getURL handle error', () => {
  const htmlBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHTML(baseURL, htmlBody)
  const expected = [ ]
  expect(actual).toEqual(expected)
})