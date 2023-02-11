//SPDX-License-Identifier: MIT

import { useCallback, useMemo } from 'react'
import { useComponentValueStream } from '@latticexyz/std-client'
import { useMUD } from '../MUDContext'
import { uuid } from '@latticexyz/utils'

export const useJoinGame = () => {
  const {
    components: { Player, Position },
    systems,
    playerEntity,
  } = useMUD()

  const canJoinGame =
    useComponentValueStream(Player, playerEntity)?.value !== true

  const joinGame = useCallback(
    async (x: number, y: number) => {
      if (!canJoinGame) {
        throw new Error('already joined game')
      }

      const positionId = uuid()
      Position.addOverride(positionId, {
        entity: playerEntity,
        value: { x, y },
      })

      const playerId = uuid()
      Player.addOverride(playerId, {
        entity: playerEntity,
        value: { value: true },
      })

      try {
        const tx = await systems['system.JoinGame'].executeTyped({ x, y })
        await tx.wait()
      } finally {
        Position.removeOverride(positionId)
        Player.removeOverride(playerId)
      }
    },
    [canJoinGame, systems, playerEntity, Player, Position],
  )

  return useMemo(() => ({ joinGame, canJoinGame }), [joinGame, canJoinGame])
}
