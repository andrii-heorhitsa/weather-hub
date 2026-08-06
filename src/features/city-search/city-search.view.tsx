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
        placeholder="City search..."
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
      />

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full rounded-md border border-zinc-200 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-900">
          {isPending && (
            <li className="px-3 py-2 text-sm text-zinc-500">Search...</li>
          )}

          {!isPending && results.length === 0 && (
            <li className="px-3 py-2 text-sm text-zinc-500">Nothing found</li>
          )}

          {results.map((city) => (
            <li key={city.id}>
              <button
                type="button"
                onMouseDown={() => onSelect(city)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {city.name}
                {city.admin1 ? `, ${city.admin1}` : ""}, {city.country}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
