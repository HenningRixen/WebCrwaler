const { crawlPage } = require('./crawl.js')

function main() {
    if (process.argv.length < 3) {
        console.log('no website given')
        return
    }
    if (process.argv.length > 3) {
        console.log('too many urls')
        return
    }
    const baseURL = process.argv[2]
    
    console.log(`crawling: ${baseURL}...`)
    crawlPage(baseURL)
    }
  
  main()
  