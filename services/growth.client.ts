export async function getGrowth(gameId: number) {
  const response = await fetch(`/api/game/${gameId}/growth`)

  const data = await response.json()

  return data.growth
}
