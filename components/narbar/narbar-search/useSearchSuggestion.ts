import { useState, useEffect } from "react";

export const useSearchSuggestions = (searchString: string) => {
  const [searchSuggestionsList, setSearchSuggestionsList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchSuggestions = async () => {
      if (!searchString) {
        setSearchSuggestionsList([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/search/text-list?q=${encodeURIComponent(searchString)}`);
        const data = await response.json();
        setSearchSuggestionsList(data);
      } catch (err) {
        setError("Error fetching search suggestions");
        console.error("Error fetching search suggestions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchSuggestions();
  }, [searchString]);

  return { searchSuggestionsList, loading, error };
};
