
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
        let href = relative_URL[i].href
        try{
        if (!href.startsWith('http')) {
            // If href is relative
            if (baseURL.endsWith('/') && href.startsWith('/')) {
                // If base URL ends with '/' and href starts with '/', remove one of the slashes
                href = baseURL + href.slice(1);
            } else {
                href = baseURL + href;
            }
        }
        absolute_URL.push(href)
        } catch(err) {
            console.log(`${err.message}: ${href}`)
        }
        
    }
    return absolute_URL
}

async function fetching_html(current_url) {
    
    let response
    try {
        response = await fetch(current_url)
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
    return response.text()  
}


// use default args to prime the first call

async function crawlPage(baseURL, current_url = baseURL, pages = {}) {
    // offsite break instantly
    const currentURLObj = new URL(current_url)
    const baseURLObj = new URL(baseURL)
    if (currentURLObj.hostname !== baseURLObj.hostname) {
        return pages
    }
    // normalize URl
    const normal_current = normalizeURL(current_url)
    
    //
    if (pages[normal_current] > 0) {
        pages[normal_current]++
        return pages
      }
    // page doesnt exist in pages so make it exist
    pages[normal_current] = 1

    //get the html of the page
    console.log(`crawling ${current_url}`)
    let html = ''
    try {
    html = await fetching_html(current_url)
    } catch (err) {
    console.log(`${err.message}`)
    return pages
    }

    // get the urls as arry from the html
    const urls_fromHTML = getURLsFromHTML(html, baseURL)

    //recursive call
    for (let next_url of urls_fromHTML) {
        pages = await crawlPage(baseURL, next_url, pages)
            
    }
    
    return pages 
}




module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
  }
  