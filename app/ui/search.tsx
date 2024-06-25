'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchValue, setSearchValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  useEffect(() => {
    const searchQuery = searchParams.get('query') || '';
    setSearchValue(searchQuery);
  }, [searchParams]);

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="text"
        className="peer block w-full rounded-md border border-gray-200 px-10 py-[9px] text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        autoComplete="off"
        ref={inputRef}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      {searchValue.length ? (
        <ClearSearch setSearchValue={setSearchValue} searchRef={inputRef} />
      ) : null}
    </div>
  );
}

export function ClearSearch({
  setSearchValue,
  searchRef,
}: {
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchRef: React.RefObject<HTMLInputElement>;
}) {
  const handleClearSearch = () => {
    setSearchValue('');

    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <button
      className="absolute right-1 top-1/2 -translate-y-1/2 border-none bg-transparent p-2 text-gray-500 shadow-none peer-focus:text-gray-900"
      onClick={handleClearSearch}
    >
      <span className="sr-only">Clear search</span>
      <XMarkIcon className="h-[18px] w-[18px]" />
    </button>
  );
}
