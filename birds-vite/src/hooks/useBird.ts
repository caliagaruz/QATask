import { useQuery } from '@apollo/client';
import { GET_BIRD } from '@/graphql/queries/getBird';
import { normalize } from '@/utils/strings';
import type { Bird } from '@/types/bird';
import { useMemo } from 'react';

export function useBird(id: string) {
  const { data, loading, error } = useQuery(GET_BIRD, {
    variables: { id },
    skip: !id,
  })

  const bird = useMemo(() => {
    if (!data?.bird) return undefined
    return normalize<Bird>(data.bird)
  }, [data?.bird])

  return {
    bird,
    loading,
    error,
  }
}
