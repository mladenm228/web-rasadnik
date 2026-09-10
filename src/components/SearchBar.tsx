import { useEffect, useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
  onSearch: (query: string) => void;
  delayMs?: number;
}


export function SearchBar({ initialValue = '', placeholder, onSearch, delayMs = 300 }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => onSearch(query), delayMs);
    return () => window.clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, delayMs]);

  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        value={query}
        placeholder={placeholder ?? 'Pretraži biljke...'}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Pretraga biljaka"
      />
    </div>
  );
}
