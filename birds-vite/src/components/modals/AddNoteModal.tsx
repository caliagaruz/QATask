import type React from 'react'
import { useState } from 'react'
import XIcon from '@/components/icons/XIcon'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface AddNoteModalProps {
  onClose: () => void
  onAddNote: (note: { comment: string }) => void
}

export default function AddNoteModal({ onClose, onAddNote }: AddNoteModalProps) {
  const [comment, setComment] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim()) {
      onAddNote({ comment })
    }
  }

  return (
    <div className="fixed inset-0 bg-white/60 flex justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md top-30 absolute shadow-modal border border-[#E9EAEA]">
        <div className="flex items-center justify-between p-4">
          <div className="text-[0.8125rem] font-semibold text-[#152351]">Add a note</div>
          <button onClick={onClose}>
            <XIcon className="h-4 w-4 text-black cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-4">
            <div className="space-y-1">
              <span id="location-label" className="block text-sm font-medium mb-1 text-[#6E6E6E]">
                Location
              </span>
              <Input
                id="location"
                placeholder="Where did you spot it?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                aria-labelledby="location-label"
              />
            </div>

            <div className="space-y-1">
              <span id="note-label" className="block text-sm font-medium mb-1 text-[#6E6E6E]">
                Note
              </span>
              <Input
                id="note"
                placeholder="Enter your notes here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                aria-labelledby="note-label"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 p-4 border-t border-[#E9EAEA]">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!location.trim() || !comment.trim()}>
              Add note
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
