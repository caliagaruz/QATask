import type { Note } from '@/types/note';

export interface Bird {
  id: string
  englishName: string
  latinName: string
  imageUrl: string
  thumbUrl: string
  notes: Note[]
}
