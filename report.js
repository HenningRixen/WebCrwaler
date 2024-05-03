function printReport(pages) {
    console.log('report is starting...')

    const sorted_pages = sortPages(pages)

    for (let key in sorted_pages) {
        console.log(`Found ${pages[key]} internal links to ${key}`)
    }


}

function sortPages (pages) {
    let pagesarray = Object.entries(pages)

    pagesarray.sort((a, b) => b[1] - a[1])

    let sortedPages = Object.fromEntries(pagesarray)

    return sortedPages

}
module.exports = {
    sortPages,
    printReport,
    }
