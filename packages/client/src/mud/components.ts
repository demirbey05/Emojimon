import {
  defineCoordComponent,
  defineBoolComponent,
} from '@latticexyz/std-client'
import { world } from './world'

export const components = {
  Position: defineCoordComponent(world, {
    metadata: {
      contractId: 'component.Position',
    },
  }),
  Player: defineBoolComponent(world, {
    metadata: {
      contractId: 'component.Player',
    },
  }),
  Movable: defineBoolComponent(world, {
    metadata: {
      contractId: 'component.Movable',
    },
  }),
}

export const clientComponents = {}
