"use client";

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface NarbarSearchSuggestionListProps {
  searchSuggest: string[];
}

export default function NarbarSearchSuggestionList({
  searchSuggest = [],
}: NarbarSearchSuggestionListProps) {
  const router = useRouter();

  const handleTextClick = useCallback((text: string) => {
    router.push(`/search?q=${encodeURIComponent(text)}`);
  }, [router]);

  return (
    <div className="px-2">
      {searchSuggest.length > 0 && (
        <Listbox
          aria-label="Categories"
          selectionMode="single"
          onAction={(key) => handleTextClick(searchSuggest[key as number])}
        >
          {searchSuggest.map((text, index) => (
            <ListboxItem key={index} textValue={text}>
              {text}
            </ListboxItem>
          ))}
        </Listbox>
      )}
    </div>
  );
}
