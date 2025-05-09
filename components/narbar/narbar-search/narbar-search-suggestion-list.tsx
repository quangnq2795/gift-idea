"use client";

import { Listbox, ListboxItem } from "@heroui/listbox";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface NarbarSearchSuggestionListProps {
  searchSuggest: string[];
  onSuggestClick?: (text: string) => void;
}

export default function NarbarSearchSuggestionList({
  searchSuggest = [],
  onSuggestClick,
}: NarbarSearchSuggestionListProps) {
  const router = useRouter();

  const handleTextClick = useCallback(
    (text: string) => {
      if (onSuggestClick) {
        onSuggestClick(text);
      }
      router.push(`/search?q=${encodeURIComponent(text)}`);
    },
    [router, onSuggestClick]
  );

  return (
    <div className="px-2">
      {searchSuggest.length > 0 && (
        <Listbox
          aria-label="Categories"
          selectionMode="single"
          onAction={(key) => handleTextClick(searchSuggest[Number(key)])}
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
