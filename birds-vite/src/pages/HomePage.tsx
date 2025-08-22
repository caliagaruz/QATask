import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBirds } from '@/hooks/useBirds';
import type { Bird } from '@/types/bird';
import WatermarkedImage from '@/components/images/WatermarkedImage';
import BirdCard from '@/components/BirdCard';
import XIcon from '@/components/icons/XIcon';
import SearchIcon from '@/components/icons/SearchIcon';

export default function HomePage() {
  const { birds, loading } = useBirds()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBirds, setFilteredBirds] = useState<Bird[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!birds || !Array.isArray(birds)) return
  
    if (!searchTerm.trim()) {
      setFilteredBirds((prev) => {
        if (prev !== birds) return birds
        return prev
      })
      return
    }
  
    const lower = searchTerm.toLowerCase()
    const filtered = birds.filter(
      (b) =>
        b.englishName.toLowerCase().includes(lower) ||
        b.latinName.toLowerCase().includes(lower)
    )
  
    setFilteredBirds((prev) => {
      const same = prev.length === filtered.length && prev.every((b, i) => b.id === filtered[i].id)
      return same ? prev : filtered
    })
    setIsDropdownOpen(true)
  }, [searchTerm, birds])
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsDropdownOpen(!!e.target.value.trim())
  }

  const clearSearch = () => {
    setSearchTerm('')
    setIsDropdownOpen(false)
    setFilteredBirds(birds)
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col">
      <div className="py-4 px-6">
        <div className="text-3.5xl text-blue-tide-900 font-bold">Birds</div>
      </div>

      <div className="p-6 border-y border-blue-mist-100">
        <div className="relative">
          <div
            className="flex items-center rounded-lg bg-blue-mist-50 px-4 py-3 h-12"
            onClick={() => inputRef.current?.focus()}
          >
            <SearchIcon className="h-6 w-6 text-blue-tide-300 mr-2" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for birds"
              className="flex-1 outline-none bg-blue-mist-50 text-blue-tide-300 placeholder:text-blue-tide-300 placeholder:font-normal font-normal h-6"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchTerm.trim() && setIsDropdownOpen(true)}
            />
            {searchTerm && (
              <button onClick={clearSearch} className="text-blue-tide-300 hover:text-opacity-70">
                <XIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {filteredBirds.length > 0 ? (
                <ul>
                  {filteredBirds.map((bird) => (
                    <li key={bird.id}>
                      <Link
                        to={`/birds/${bird.id}`}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="w-10 h-10 relative rounded-lg overflow-hidden">
                          <WatermarkedImage url={bird.thumbUrl} alt={bird.englishName} />
                        </div>
                        <div>
                          <div className="font-medium text-blue-tide-900">{bird.englishName}</div>
                          <div className="text-xs text-gray-500">{bird.latinName}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-2 text-gray-500">No birds found</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full min-h-[calc(100vh-226px)]">
            <span className="inline-block w-7 h-7 border-[3px] border-blue-tide-300-soft border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {filteredBirds.map((bird, i) => (
              <BirdCard
                key={bird.id}
                bird={bird}
                priority={i < 20 ? 1 : 2}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
