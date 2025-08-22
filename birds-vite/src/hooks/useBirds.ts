import { useQuery } from '@apollo/client';
import { GET_BIRDS } from '@/graphql/queries/getBirds';
import { normalize } from '@/utils/strings';
import type { Bird } from '@/types/bird';
import { useMemo } from 'react';

export function useBirds() {
  const { data, loading, error } = useQuery(GET_BIRDS)

  type RawBird = Record<string, unknown>

  const birds: Bird[] = useMemo(() => {
    if (!data?.birds) return []
    return data.birds.map((b: RawBird) => normalize<Bird>(b))
  }, [data?.birds])

  return {
    birds,
    loading,
    error,
  }
}
