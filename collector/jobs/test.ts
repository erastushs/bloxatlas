import { getGamesStats } from '../sources/roblox'

const stats = await getGamesStats([2753915549, 4924922222])

console.log(stats)
