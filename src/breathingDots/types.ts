export enum Waves {
  smooth = 'smooth',
  bubble = 'bubble',
  roundedSquare = 'roundedSquare'
}

export type WavePreset = { f: number, t: number, zoom: number, label: string, wave: string };
export type WavePresets = Record<string, WavePreset>;
