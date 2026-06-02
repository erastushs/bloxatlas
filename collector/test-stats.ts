const universeId = 994732206

const response = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`)

const data = await response.json()

console.log(data.data[0])
export {}
