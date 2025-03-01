import React, { useContext } from "react";
import { ShopContext } from "../context/Shopcontext";

function Searchbar() {
  const { searchQuery, setSearchQuery } = useContext(ShopContext);

  return (
    <div className="p-4 bg-white shadow-md">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full p-2 border border-gray-300 rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
    </div>
  );
}

export default Searchbar;
