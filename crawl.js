
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

function crawlPage(root_URl) {
    

}



module.exports = {
    normalizeURL,
    getURLsFromHTML,
  }
  