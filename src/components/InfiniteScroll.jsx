import React, { useState, useEffect, useRef, useCallback } from "react";

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  // Mock API call
  const fetchMoreItems = async () => {
    if (isLoading) return;
    setIsLoading(true);

    // Simulate API delay
    const newItems = Array.from({ length: 10 }, (_, i) => `Item ${items.length + i + 1}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (items.length + newItems.length >= 50) {
      setHasMore(false); // Simulate end of data
    }

    setItems((prevItems) => [...prevItems, ...newItems]);
    setIsLoading(false);
  };

  // IntersectionObserver callback
  const lastItemRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreItems();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [hasMore]
  );

  // Initial fetch
  useEffect(() => {
    fetchMoreItems();
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <h1>Infinite Scroll Example</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}>
            {item}
          </li>
        ))}
      </ul>
      <div ref={lastItemRef} style={{ height: "20px", background: "transparent" }} />
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>No more items to load</p>}
    </div>
  );
};

export default InfiniteScroll;
