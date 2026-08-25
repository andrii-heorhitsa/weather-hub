import { CityResult } from "@/types/cities";

type CitySearchViewProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isOpen: boolean;
  results: CityResult[];
  highlightedIndex: number;
  isPending: boolean;
  onSelect: (city: CityResult) => void;
  onBlur: () => void;
  listboxId: string;
};

export default function CitySearchView({
  query,
  onQueryChange,
  onKeyDown,
  isOpen,
  results,
  highlightedIndex,
  isPending,
  onSelect,
  onBlur,
  listboxId,
}: CitySearchViewProps) {
  const activeOptionId =
    highlightedIndex >= 0
      ? `${listboxId}-option-${highlightedIndex}`
      : undefined;

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={activeOptionId}
        aria-autocomplete="list"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        placeholder="Search for a city…"
        className="w-full border-b border-hairline bg-transparent px-1 py-2 text-center font-display text-lg text-ink outline-none placeholder:text-ink-muted focus:border-ink"
      />

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-10 mt-1 w-full divide-y divide-hairline border-b border-hairline bg-paper font-display text-base"
        >
          {isPending && (
            <li className="px-1 py-3 text-center text-sm text-ink-muted">
              Searching…
            </li>
          )}

          {!isPending && results.length === 0 && (
            <li className="px-1 py-3 text-center text-sm text-ink-muted">
              Nothing found
            </li>
          )}

          {results.map((city, index) => (
            <li
              key={city.id}
              id={`${listboxId}-option-${index}`}
              role="option"
              aria-selected={index === highlightedIndex}
            >
              <button
                type="button"
                tabIndex={-1}
                onMouseDown={() => onSelect(city)}
                className={`w-full px-1 py-3 text-left text-ink transition-colors hover:bg-ink/5 hover:text-ink ${
                  index === highlightedIndex ? "bg-ink/5" : ""
                }`}
              >
                {city.name}
                <span className="text-ink-muted">
                  {city.admin1 ? `, ${city.admin1}` : ""}, {city.country}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
