"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { StoreProductItem, StoreProductAddItem } from "./StoreProductItem";
import type { StoreProductItemProps } from "./StoreProductItem";

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
        
        // Nếu số sản phẩm ít hơn số cột, chỉ phân phối vào đúng 1 cột (bắt đầu từ cột 1)
        if (items.length <= numColumns) {
            items.forEach((item, idx) => {
                // Đảm bảo mỗi sản phẩm chỉ vào 1 cột duy nhất
                columns[(idx + 1) % numColumns] = [item];
            });
            return columns;
        }

        // Phân phối đều các sản phẩm vào các cột, bắt đầu từ cột 1
        items.forEach((item, index) => {
            const columnIndex = (index + 1) % numColumns;
            columns[columnIndex].push(item);
        });

        return columns;
    };

    const columns = distributeItems(giftList, numColumns);
    console.log("Column counts:", columns.map(col => col.length));

    const fetchData = async () => {
        if (!storeId) return;

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
            console.log("Fetched data:", newItems);

            if (!newItems || newItems.length === 0) {
                setHasMore(false);
            } else {
                setGiftList((prevItems) => page === 0 ? newItems : [...prevItems, ...newItems]);
                setHasMore(moreAvailable);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Khi storeId thay đổi, reset state và set page về 0
    useEffect(() => {
        setGiftList([]);
        setPage(0);
        setHasMore(true);
    }, [storeId]);

    // Khi page hoặc storeId thay đổi, fetch dữ liệu
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, storeId]);

    return (
        <InfiniteScroll
            dataLength={giftList.length}
            next={() => setPage((prev) => prev + 1)}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
            <div className="flex justify-between gap-5">
                {columns.length > 0 && columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="flex-1 flex flex-col gap-3">
                        {columnIndex === 0 && (
                            <div className="pb-3">
                                <StoreProductAddItem storeId={storeId} />
                            </div>
                        )}
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
