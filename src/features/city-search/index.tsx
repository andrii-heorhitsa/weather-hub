"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { useId, useState } from "react";
import CitySearchView from "./city-search.view";
import { CityResult } from "@/types/cities";
import { useCitiesSearch } from "@/hooks/use-city-search";

const EMPTY_RESULTS: CityResult[] = [];

export function CitySearch({
  onSelect,
}: {
  onSelect: (city: CityResult) => void;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 400);
  const { data: results = EMPTY_RESULTS, isPending } =
    useCitiesSearch(debouncedQuery);
  const listboxId = useId();

  const [prevResults, setPrevResults] = useState(results);
  if (results !== prevResults) {
    setPrevResults(results);
    setHighlightedIndex(-1);
  }

  function handleSelect(city: CityResult) {
    onSelect(city);
    setQuery("");
    setIsOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0) {
        e.preventDefault();
        handleSelect(results[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <CitySearchView
      query={query}
      onQueryChange={(value) => {
        setQuery(value);
        setIsOpen(true);
      }}
      onKeyDown={handleKeyDown}
      isOpen={isOpen && query.length > 0}
      results={results}
      highlightedIndex={highlightedIndex}
      isPending={isPending}
      onSelect={handleSelect}
      onBlur={() => setIsOpen(false)}
      listboxId={listboxId}
    />
  );
}
