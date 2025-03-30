"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { StoreProductItem, StoreProductItemProps } from "./StoreProductItem";

// Debounce function to limit the number of resize events
const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

export default function StoreProduct({ storeId }: { storeId: string }) { 
    const [giftList, setGiftList] = useState<StoreProductItemProps[]>([]);
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
        const handleResize = debounce(updateNumColumns, 200); // 200ms debounce for resize
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Function to distribute items across columns
    const distributeItems = (items: StoreProductItemProps[], numColumns: number) => {
        const columns: StoreProductItemProps[][] = Array.from({ length: numColumns }, () => []);
        items.forEach((item, index) => {
            const columnIndex = index % numColumns;
            columns[columnIndex].push(item);
        });
        return columns;
    };

    const columns = distributeItems(giftList, numColumns);

    const fetchData = async () => {
        if (!storeId) return; // Prevent API call if storeId is missing

        try {
            const response = await fetch(`/api/store/products?sid=${storeId}&page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const { data: newItems, hasMore: moreAvailable } = await response.json();

            if (!newItems || newItems.length === 0) {
                setHasMore(false);
            } else {
                setGiftList((prevItems) => [...prevItems, ...newItems]);
                setPage((prevPage) => prevPage + 1);
                setHasMore(moreAvailable);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        setGiftList([]); // Reset product list when storeId changes
        setPage(0); // Reset page count
        setHasMore(true); // Reset hasMore flag
        fetchData();
    }, [storeId]); // Re-fetch when storeId changes

    return (
        <InfiniteScroll
            dataLength={giftList.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
            <div className="flex justify-between gap-5">
                {columns.length > 0 && columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="flex flex-col gap-3">
                        {column.map((item, index) => (
                            <div key={index} className="pb-3">
                                <StoreProductItem imgSrc={item.imgSrc} productId={item.productId} storeId={storeId}/>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    );
}
