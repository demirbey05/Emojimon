import {
  defineCoordComponent,
  defineBoolComponent,
} from '@latticexyz/std-client'
import { world } from './world'
import { defineComponent, Type } from '@latticexyz/recs'

export const components = {
  MapConfig: defineComponent(
    world,
    {
      width: Type.Number,
      height: Type.Number,
      terrain: Type.String,
    },
    {
      id: 'MapConfig',
      metadata: { contractId: 'component.MapConfig' },
    },
  ),
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
  Obstruction: defineBoolComponent(world, {
    metadata: {
      contractId: 'component.Obstruction',
    },
  }),
}

export const clientComponents = {}
