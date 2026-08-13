"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { useState } from "react";
import CitySearchView from "./city-search.view";
import { CityResult } from "@/types/cities";
import { useCitiesSearch } from "@/hooks/use-city-search";

export function CitySearch({
  onSelect,
}: {
  onSelect: (city: CityResult) => void;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 400);
  const { data: results = [], isPending } = useCitiesSearch(debouncedQuery);

  function handleSelect(city: CityResult) {
    onSelect(city);
    setQuery("");
    setIsOpen(false);
  }

  return (
    <CitySearchView
      query={query}
      onQueryChange={(value) => {
        setQuery(value);
        setIsOpen(true);
      }}
      isOpen={isOpen && query.length > 0}
      results={results}
      isPending={isPending}
      onSelect={handleSelect}
      onBlur={() => setIsOpen(false)}
    />
  );
}
