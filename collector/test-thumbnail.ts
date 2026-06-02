const universeId = 994732206

const response = await fetch(
  `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`,
)

const data = await response.json()

console.log(data.data[0])
export {}
