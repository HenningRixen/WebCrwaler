const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {
    if (process.argv.length < 3) {
        console.log('no website given')
        return
    }
    if (process.argv.length > 3) {
        console.log('too many urls')
        return
    }
    const baseURL = process.argv[2]
    
    console.log(` sarting crawling: ${baseURL}...`)

    const pages = await crawlPage(baseURL)

    printReport(pages)


    }
  
  main()
  