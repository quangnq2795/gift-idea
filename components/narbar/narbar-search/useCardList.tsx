import { useState, useEffect } from 'react';

const CACHE_KEY = 'cardListCache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface NarBarSearchCardList {
    title: string;
    image: string;
  }

const useCardList = () => {
  const [cardList, setCardList] = useState<NarBarSearchCardList[]>([]);

  useEffect(() => {
    const fetchCardList = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheTime = localStorage.getItem(`${CACHE_KEY}_time`);

        const currentTime = new Date().getTime();
        const isCacheExpired = !cacheTime || currentTime - parseInt(cacheTime) > CACHE_EXPIRY;

        if (cachedData && !isCacheExpired) {
          setCardList(JSON.parse(cachedData));
        } else {
          const response = await fetch('/api/search/card-list');
          const data = await response.json();
          setCardList(data);

          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
          localStorage.setItem(`${CACHE_KEY}_time`, currentTime.toString());
        }
      } catch (error) {
        console.error('Error fetching card list:', error);
      }
    };

    fetchCardList();
  }, []);

  return cardList;
};

export default useCardList;
