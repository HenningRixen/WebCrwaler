
async function crawlPage(baseURL, current_url = baseURL, pages = {}) {
    console.log('fetching all urls...')
    if (current_url !== baseURL) {
        return pages
    }
    let normal_current = normalizeURL(current_url)
    if (normal_current in pages) {
        pages[normal_current] += 1 
    }

    pages[normal_current] = 1

    console.log(`crawling ${current_url}`)
    let html = ''
    try {
    html = await fetching_html(current_url)
    } catch (err) {
    console.log(`${err.message}`)
    return pages
    }

    //recursive call
    const urls_fromHTML = getURLsFromHTML(html, baseURL)

    for (let next_url of urls_fromHTML) {
        pages = await crawlPage(baseURL, next_url, pages);
            
    }
    
    return pages 
}