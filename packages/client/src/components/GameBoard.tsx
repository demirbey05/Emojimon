import { useComponentValueStream } from '@latticexyz/std-client'
import { useMUD } from '../MUDContext'
import { useEffect } from 'react'
import { uuid } from '@latticexyz/utils'
import { useMovement } from '../hooks/useMovement'
import { useJoinGame } from '../hooks/useJoinGame'
import { useMapConfig } from '../hooks/useMapConfig'

export const GameBoard = () => {
  const { width, height, terrainValues } = useMapConfig()
  const rows = new Array(height).fill(0).map((_, i) => i)
  const columns = new Array(width).fill(0).map((_, i) => i)

  const {
    components: { Position },
    playerEntity,
  } = useMUD()

  const playerPosition = useComponentValueStream(Position, playerEntity)

  useMovement()
  const { joinGame, canJoinGame } = useJoinGame()

  return (
    <div className="inline-grid p-2 bg-lime-500">
      {rows.map((y) => {
        return columns.map((x) => {
          // Get the emoji for the terrain type
          const terrain = terrainValues.find(
            (t) => t.x === x && t.y === y,
          )?.type
          return (
            <div
              key={`${x},${y}`}
              className={`w-8 h-8 flex items-center justify-center ${
                canJoinGame ? 'cursor-pointer hover:ring' : ''
              }`}
              style={{
                gridColumn: x + 1,
                gridRow: y + 1,
              }}
              onClick={(event) => {
                event.preventDefault()
                if (canJoinGame) {
                  joinGame(x, y)
                }
              }}
            >
              <div className="flex flex-wrap gap-1 items-center justify-center relative">
                {terrain ? (
                  <div className="absolute inset-0 flex items-center justify-center text-3xl pointer-events-none">
                    {terrain.emoji}
                  </div>
                ) : null}
                <div className="relative">
                  {playerPosition?.x === x && playerPosition?.y === y ? (
                    <>🤠</>
                  ) : null}
                </div>
              </div>
            </div>
          )
        })
      })}
    </div>
  )
}
