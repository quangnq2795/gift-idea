"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@heroui/input";
import { SearchIcon } from "@/components/icons";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import  NarbarSearchSuggestionDefault from "./narbar-search-suggest-default";
import  NarbarSearchSuggestionList from "./narbar-search-suggestion-list";
import { useSearchSuggestions } from "./useSearchSuggestion";

export const NarBarSeachInput = () => {
  const [isSearchIconHovered, setSearchIconHovered] = useState(false);
  const [isSuggestionVisible, setSuggestionVisible] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [debouncedSearchString, setDebouncedSearchString] = useState(searchString); // State for debounced value
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionPanelRef = useRef<HTMLDivElement | null>(null); // Ref for suggestion panel
  const router = useRouter();

  const { searchSuggestionsList, loading, error } = useSearchSuggestions(debouncedSearchString); // Use the debounced value for fetching suggestions

  const onFocus = () => {
    setSuggestionVisible(true);
  };

  const onValueChange = (value: string) => {
    setSearchString(value);
  };

  const onSearch = () => {
    if (searchString.trim() === "") {
      return;
    }
    router.push(`/search?q=${encodeURIComponent(searchString)}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchString(searchString);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchString]);

  // Function to hide suggestion panel when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputRef.current &&
      suggestionPanelRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      !suggestionPanelRef.current.contains(event.target as Node)
    ) {
      setSuggestionVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderSuggestions = () => {
    if (loading) return <p>Loading suggestions...</p>;
    if (error) return <p>{error}</p>;

    if (debouncedSearchString.trim() === "") {
      return <NarbarSearchSuggestionDefault />;
    } else {
      return <NarbarSearchSuggestionList searchSuggest={searchSuggestionsList} />;
    }
  };

  return (
    <div className="flex gap-2 relative">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        endContent={
          <Button
            isIconOnly
            className="bg-transparent text-transparent"
            onClick={onSearch}
            onMouseEnter={() => setSearchIconHovered(true)}
            onMouseLeave={() => setSearchIconHovered(false)}
          >
            <SearchIcon
              className={`text-base text-default-400 pointer-events-none flex-shrink-0 ${
                isSearchIconHovered ? "text-blue-700 w-[1.2em] h-[1.2em]" : ""
              }`}
            />
          </Button>
        }
        labelPlacement="outside"
        placeholder="Search..."
        baseRef={inputRef}
        onFocus={onFocus}
        onValueChange={(value) => onValueChange(value)}
      />

      {isSuggestionVisible && (
        <div
          ref={suggestionPanelRef} // Set the suggestionPanelRef for the panel
          className="absolute top-full mt-2 bg-white shadow-lg rounded-lg z-10 w-full"
        >
          {renderSuggestions()}
        </div>
      )}
    </div>
  );
};
