
const normalizeURL = (url) => {
    const myURL = new URL(url);

    let trimmed_pathname = myURL.pathname
    if (trimmed_pathname.endsWith('/')) {
        trimmed_pathname = trimmed_pathname.slice(0, -1);

    }
    return myURL.hostname + trimmed_pathname
}

const getURLsFromHTML = (htmlBody, baseURL) => {
    
    const absolute_URL = []
    // create JSDOM object, that searches automaticly in a htmlBody for links 
    const { JSDOM } = require('jsdom')
    const dom = new JSDOM(htmlBody)
    // gives out arry of html links:
    const relative_URL = dom.window.document.querySelectorAll('a')
    
    // incrementing absoluteURL with the baseURL added with the relativ_URL to create absolute URL
    for (let i = 0; i < relative_URL.length; i++) {
        let href = relative_URL[i].href;
        if (!href.startsWith('http')) {
            // If href is relative
            if (baseURL.endsWith('/') && href.startsWith('/')) {
                // If base URL ends with '/' and href starts with '/', remove one of the slashes
                href = baseURL + href.slice(1);
            } else {
                href = baseURL + href;
            }
        }
        absolute_URL.push(href);
        
    }
    return absolute_URL
}


async function crawlPage(url) {
    console.log('fetching url...')

    let response
    try {
        response = await fetch(url)
    } catch (err) {
      throw new Error(`Network Error ${err.message}`)  
    }
    if (response.status > 399) {
        console.log(`HTTP error: ${res.status} ${res.statusText}`)
        return
    }
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`No HTML-response; ${contentType}`)
        return
    }
    console.log(await response.text())  
}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
  }
  