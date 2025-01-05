"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { ScrollBarItem, ScrollBarItemProps } from "./ScrollBarItem";

export default function ScrollBar() {
    const [giftList, setGiftList] = useState<ScrollBarItemProps[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [numColumns, setNumColumns] = useState(3); // Default for small screens

    // Function to set numColumns based on window width
    const updateNumColumns = () => {
        const width = window.innerWidth;
        if (width < 640) { // Small screens (Tailwind CSS breakpoint)
            setNumColumns(3);
        } else if (width < 768) { // Medium screens
            setNumColumns(5);
        } else { // Large screens
            setNumColumns(7);
        }
    };

    // Call updateNumColumns on initial render and on resize
    useEffect(() => {
        updateNumColumns();
        window.addEventListener('resize', updateNumColumns);
        
        return () => {
            window.removeEventListener('resize', updateNumColumns);
        };
    }, []);

    // Function to distribute items across columns
    const distributeItems = (items: ScrollBarItemProps[], numColumns: number) => {
        const columns: ScrollBarItemProps[][] = Array.from({ length: numColumns }, () => []);
        items.forEach((item, index) => {
            const columnIndex = index % numColumns;
            columns[columnIndex].push(item);
        });
        return columns;
    };

    const columns = distributeItems(giftList, numColumns);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/items?page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newItems: ScrollBarItemProps[] = await response.json();

            if (newItems.length === 0) {
                setHasMore(false);
            } else {
                setGiftList((prevItems) => [...prevItems, ...newItems]);
                setPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <InfiniteScroll
            dataLength={giftList.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
            <div className="flex justify-between gap-5">
                {columns.map((column, columnIndex) => (
                    <div key={columnIndex}>
                        {column.map((item, index) => (
                            <div key={index} className="pb-3">
                                <ScrollBarItem imgSrc={item.imgSrc} productId={item.productId} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    );
}
