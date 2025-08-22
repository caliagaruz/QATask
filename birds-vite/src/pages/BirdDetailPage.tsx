import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import WatermarkedImage from '@/components/images/WatermarkedImage';
import AddNoteModal from '@/components/modals/AddNoteModal';
import ImageZoomModal from '@/components/modals/ImageZoomModal';

import { useBird } from '@/hooks/useBird';
import { useAddNote } from '@/hooks/useAddNote';

import type { Note } from '@/types/note';

export default function BirdDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { bird, loading, error } = useBird(id || '')
  const { addNote } = useAddNote()

  const [localNotes, setLocalNotes] = useState<Note[]>([])
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false)
  const [isImageZoomModalOpen, setIsImageZoomModalOpen] = useState(false)

  const handleAddNote = async (note: { comment: string }) => {
    await addNote(bird!.id, note.comment)

    const newNote: Note = {
      id: crypto.randomUUID(),
      comment: note.comment,
      timestamp: Date.now(),
    }

    setLocalNotes((prev) => [...prev, newNote])
    setIsAddNoteModalOpen(false)
  }

  const allNotes = bird ? [...bird.notes, ...localNotes] : []

  const handleBack = () => {
    const timeout = setTimeout(() => {
      navigate('/')
    }, 250)
  
    window.addEventListener('popstate', () => {
      clearTimeout(timeout)
    }, { once: true })
  
    navigate(-1)
  }
  
  return (
    <div className="flex flex-col">
      <div className="py-4 px-6 flex items-center justify-between border-b border-blue-mist-100">
        <div className="text-3.5xl font-bold text-[#0D171C66]">
          <button
            onClick={handleBack}
            className="hover:underline transition-colors cursor-pointer"
          >
            Birds
          </button>
          {' / '}
          <span className="text-blue-tide-900">
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-[#0D171C66] border-t-transparent rounded-full animate-spin align-middle ml-2" />
            ) : (
              bird?.englishName || 'Unknown'
            )}
          </span>
        </div>

        {!loading && bird && (
          <Button variant='secondary' onClick={() => setIsAddNoteModalOpen(true)}>Add Note</Button>
        )}
      </div>

      {!loading && (error || !bird) && (
        <div className="flex flex-col items-center justify-center text-center h-[60vh] px-6">
          <h2 className="text-2xl font-semibold text-blue-tide-900">Bird not found</h2>
          <p className="text-gray-500 mt-2">We couldn't find this bird. It may have been removed or never existed.</p>
          <Button onClick={() => navigate(-1)} className="mt-4">Go back</Button>
        </div>
      )}

      {!loading && bird && (
        <div className="space-y-2">
          <div className="w-full px-6 mt-6">
          <div
            className={`relative aspect-video max-w-[301.33px] rounded-lg overflow-hidden ${
              bird.imageUrl ? 'cursor-zoom-in' : 'cursor-default'
            }`}
            onClick={() => {
              if (bird.imageUrl) {
                setIsImageZoomModalOpen(true)
              }
            }}
          >
            <WatermarkedImage url={bird.imageUrl} alt={bird.englishName} priority={0} />
          </div>
          </div>

          <div className="flex flex-col">
            <div className="text-[1.375rem] text-blue-tide-900 font-bold pt-5 px-6 pb-3">Notes</div>

            {allNotes.length === 0 ? (
              <div className="text-blue-tide-300 mb-6 px-6 text-sm">No notes yet. Add your first note!</div>
            ) : (
              <div className="space-y-4 mb-8">
                {allNotes.map((note) => (
                  <div key={note.id} className="flex gap-4 items-center px-6">
                    <div className="w-14 h-14 relative shrink-0">
                      <WatermarkedImage url={bird.imageUrl} alt={bird.englishName} priority={0} />
                    </div>
                    <div>
                      <div className="text-base font-medium text-blue-tide-900">
                        Spotted on {new Date(note.timestamp * 1000).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <p className="text-blue-tide-300 font-normal text-sm">{note.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col pl-6 pr-8">
            <div className="text-[1.375rem] text-blue-tide-900 font-bold pb-6 border-b border-blue-mist-100">
              In Other Languages
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex flex-col w-full pt-4 pr-2 pb-4 space-y-1">
                <div className="text-blue-tide-300 text-sm font-normal">Spanish</div>
                <div className="text-blue-tide-900 text-sm font-normal">{bird.englishName}</div>
              </div>
              <div className="flex flex-col w-full pt-4 pl-2 pb-4 space-y-1">
                <div className="text-blue-tide-300 text-sm font-normal">Latin</div>
                <div className="text-blue-tide-900 text-sm font-normal">{bird.latinName}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddNoteModalOpen && bird && (
        <AddNoteModal onClose={() => setIsAddNoteModalOpen(false)} onAddNote={handleAddNote} />
      )}

      {isImageZoomModalOpen && bird && bird?.imageUrl && (
        <ImageZoomModal
          imageUrl={bird.imageUrl}
          alt={bird.englishName}
          onClose={() => setIsImageZoomModalOpen(false)}
        />
      )}
    </div>
  )
}
