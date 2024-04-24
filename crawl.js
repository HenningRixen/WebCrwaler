
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
        if (relative_URL[i] === baseURL){
            absolute_URL.push('/')
        } else {
            absolute_URL.push(baseURL + relative_URL[i])
        }
    
    }
    
    return absolute_URL
    
    
    // loop through the list and add the base url to every element
    
}



module.exports = {
    normalizeURL,
    getURLsFromHTML,
  }
  