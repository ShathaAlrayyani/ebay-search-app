/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

const defaultImgSrc =
  "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?semt=ais_hybrid&w=740&q=80";

export default function Home() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<
    { image: string; title: string; price: number; link: string; id: string }[]
  >([]);

  const search = async () => {
    const res = await fetch(`/api/ebay/search?q=${query}`);
    const data = await res.json();
    setItems(data);
    console.log("first: " + data);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>eBay Search</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      <button onClick={search}>Search</button>

      <div style={{ marginTop: 20 }}>
        {items.length > 0 &&
          items.map((item) => (
            <div key={item.id} style={{ marginBottom: 20 }}>
              <img
                alt={item.title}
                src={item.image || defaultImgSrc}
                width={120}
                height={120}
              />
              <p>{item.title}</p>
              <p>${item.price}</p>
              <a href={item.link} target="_blank">
                View
              </a>
            </div>
          ))}
      </div>
    </main>
  );
}
