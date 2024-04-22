
const normalizeURL = (url) => {
    const myURL = new URL(url);

    let trimmed_pathname = myURL.pathname
    if (trimmed_pathname.endsWith('/')) {
        trimmed_pathname = trimmed_pathname.slice(0, -1);

    }
    return myURL.hostname + trimmed_pathname
}



module.exports = {
    normalizeURL
  }
  