const query = 'blox fruits'

const response = await fetch(
  `https://apis.roblox.com/search-api/omni-search?urlLocale=en_us&searchQuery=${encodeURIComponent(query)}&pageToken=&sessionId=test&pageType=all`,
)

const data = await response.json()

const first = data.searchResults?.[0]?.contents?.[0]

console.log(first)
export {}
