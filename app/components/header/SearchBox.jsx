"use client";
import { useSearchParams } from "next/navigation";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All";
  const categories = ["All", "Electronics", "Clothing", "Books"];
  return (
    <div className="flex w-full gap-4 shadow-orange-50">
      <input
        className="p-2 border-2 border-gray-300 rounded-lg"
        type="text"
        placeholder="Search"
        value={q}
        onChange={(e) => {
          searchParams.set("q", e.target.value);
        }}
      />
      <select
        className="p-2 border-2 border-gray-300 rounded-lg"
        value={category}
        onChange={(e) => {
          searchParams.set("category", e.target.value);
        }}
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button className="join-item btn">Search</button>
    </div>
  );
};

export default SearchBox;
