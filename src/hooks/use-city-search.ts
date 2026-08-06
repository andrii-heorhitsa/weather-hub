import { fetchCity } from "@/lib/client/city-client";
import { useQuery } from "@tanstack/react-query";

export function useCitiesSearch(query: string) {
  const hasMinLength = query.trim().length >= 3;

  return useQuery({
    queryKey: ["city", query],
    queryFn: () => fetchCity({ name: query }),
    enabled: hasMinLength,
  });
}
