import { CityResult } from "@/types/cities";

type CitySearchViewProps = {
  query: string;
  onQueryChange: (value: string) => void;
  isOpen: boolean;
  results: CityResult[];
  isPending: boolean;
  onSelect: (city: CityResult) => void;
  onBlur: () => void;
};

export default function CitySearchView({
  query,
  onQueryChange,
  isOpen,
  results,
  isPending,
  onSelect,
  onBlur,
}: CitySearchViewProps) {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onBlur={onBlur}
        placeholder="Search for a city…"
        className="w-full border-b border-hairline bg-transparent px-1 py-2 text-center font-display text-lg text-ink outline-none placeholder:text-ink-muted focus:border-ink"
      />

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full divide-y divide-hairline border-b border-hairline bg-paper font-display text-base">
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

          {results.map((city) => (
            <li key={city.id}>
              <button
                type="button"
                onMouseDown={() => onSelect(city)}
                className="w-full px-1 py-3 text-left text-ink transition-colors hover:text-ink-muted"
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
