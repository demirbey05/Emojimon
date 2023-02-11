import { useComponentValueStream } from '@latticexyz/std-client'
import { useMUD } from '../MUDContext'
import { useEffect } from 'react'
import { uuid } from '@latticexyz/utils'
import { useMovement } from '../hooks/useMovement'
import { useJoinGame } from '../hooks/useJoinGame'
import { useMapConfig } from '../hooks/useMapConfig'

export const GameBoard = () => {
  const { width, height } = useMapConfig()
  console.log(width, height)
  const rows = new Array(height).fill(0).map((_, i) => i)
  const columns = new Array(width).fill(0).map((_, i) => i)

  const {
    components: { Position },
    playerEntity,
  } = useMUD()

  const playerPosition = useComponentValueStream(Position, playerEntity)

  const { moveTo } = useMovement()
  const { joinGame, canJoinGame } = useJoinGame()

  return (
    <div className="inline-grid p-2 bg-lime-500">
      {rows.map((y) => {
        return columns.map((x) => {
          return (
            <div
              key={`${x},${y}`}
              className="w-8 h-8"
              style={{
                gridColumn: x + 1,
                gridRow: y + 1,
              }}
              onClick={(event) => {
                event.preventDefault()
                if (canJoinGame) {
                  joinGame(x, y)
                } else {
                  moveTo(x, y)
                }
              }}
            >
              {playerPosition?.x === x && playerPosition?.y === y ? (
                <>🤠</>
              ) : null}
            </div>
          )
        })
      })}
    </div>
  )
}
