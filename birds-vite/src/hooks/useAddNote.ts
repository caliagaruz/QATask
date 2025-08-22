import { useMutation } from '@apollo/client';
import { ADD_NOTE } from '@/graphql/mutations/addNote';

export function useAddNote() {
  const [addNoteMutation, { loading, error }] = useMutation(ADD_NOTE)

  const addNote = async (birdId: string, comment: string) => {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const { data } = await addNoteMutation({
        variables: { birdId, comment, timestamp },
      })

      return data.addNote
    } catch (err) {
      console.error('Error adding note:', err)
      throw err
    }
  }

  return {
    addNote,
    loading,
    error,
  }
}
