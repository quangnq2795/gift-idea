"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@heroui/input";
import { SearchIcon } from "@/components/icons";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import NarbarSearchSuggestionDefault from "./narbar-search-suggest-default";
import NarbarSearchSuggestionList from "./narbar-search-suggestion-list";
import { useSearchSuggestions } from "./useSearchSuggestion";

export const NarBarSeachInput = () => {
  const [isSearchIconHovered, setSearchIconHovered] = useState(false);
  const [isSuggestionVisible, setSuggestionVisible] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [debouncedSearchString, setDebouncedSearchString] = useState(searchString);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionPanelRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const { searchSuggestionsList, loading, error } = useSearchSuggestions(debouncedSearchString);

  const onFocus = () => {
    setSuggestionVisible(true);
  };

  const onValueChange = (value: string) => {
    setSearchString(value);
  };

  const onSearch = () => {
    if (searchString.trim() === "") return;
    router.push(`/search?q=${encodeURIComponent(searchString)}`);
    setSuggestionVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchString(searchString);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchString]);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (text: string) => {
    setSearchString(text);
    setSuggestionVisible(false);
    router.push(`/search?q=${encodeURIComponent(text)}`);
  };

  const renderSuggestions = () => {
    if (loading) return <p>Loading suggestions...</p>;
    if (error) return <p>{error}</p>;

    if (debouncedSearchString.trim() === "") {
      return (
        <NarbarSearchSuggestionDefault
          onCardClick={handleSuggestionClick}
        />
      );
    } else {
      return (
        <NarbarSearchSuggestionList
          searchSuggest={searchSuggestionsList}
          onSuggestClick={handleSuggestionClick}
        />
      );
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
        onValueChange={onValueChange}
        value={searchString}
      />

      {isSuggestionVisible && (
        <div
          ref={suggestionPanelRef}
          className="absolute top-full mt-2 bg-white shadow-lg rounded-lg z-10 w-full"
        >
          {renderSuggestions()}
        </div>
      )}
    </div>
  );
};
