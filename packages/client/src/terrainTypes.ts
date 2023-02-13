export enum TerrainType {
  TallGrass = 1,
  Boulder,
}

type terrainConfig = {
  emoji: string
}

export const terrainTypes: Record<TerrainType, terrainConfig> = {
  [TerrainType.TallGrass]: {
    emoji: '🌳',
  },
  [TerrainType.Boulder]: {
    emoji: '🪨',
  },
}
