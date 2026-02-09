import type { BlockType } from './chunkView'

const ELLIPSIS = '...'
const DEFAULT_BLOCK_DESCRIPTION = 'No additional details.'

const BLOCK_CARD_CLASS_NAMES: Record<BlockType, string> = {
  workshop: 'border-amber-200 bg-amber-50',
  business: 'border-blue-200 bg-blue-50',
  media: 'border-green-200 bg-green-50',
  roundtable: 'border-violet-200 bg-violet-50',
  harkness: 'border-red-200 bg-red-50',
  presentation: 'border-orange-200 bg-orange-50',
  reflection: 'border-slate-300 bg-slate-100',
  fitness: 'border-slate-300 bg-slate-100',
  academics: 'border-slate-300 bg-slate-100',
  awards: 'border-yellow-200 bg-yellow-50',
  other: 'border-zinc-300 bg-zinc-100',
}

function normalizeMaxLength(maxLength: number): number {
  if (!Number.isFinite(maxLength)) {
    return 110
  }

  return Math.max(4, Math.floor(maxLength))
}

export function truncateBlockDescription(description: string, maxLength = 110): string {
  const text = description.trim()
  if (text.length === 0) {
    return DEFAULT_BLOCK_DESCRIPTION
  }

  const normalizedMaxLength = normalizeMaxLength(maxLength)
  if (text.length <= normalizedMaxLength) {
    return text
  }

  return `${text.slice(0, normalizedMaxLength - ELLIPSIS.length).trimEnd()}${ELLIPSIS}`
}

export function getBlockCardClassName(blockType: BlockType): string {
  return BLOCK_CARD_CLASS_NAMES[blockType]
}
