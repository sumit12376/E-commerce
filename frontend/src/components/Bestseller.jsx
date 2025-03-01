import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import ProductItem from "./ProductItem";

function Bestseller() {
  const { products = [] } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller);
    setBestSellers(bestProducts.slice(0, 4));
  }, [products]);

  return (<>
    <div className="flex flex-col items-center justify-center gap-2 ">
        <div className="flex items-center gap-2 py-7">
          <p className="md:text-2xl text-gray-600 text-center uppercase tracking-wider font-bold text-3xl">
          Bestsellers
          </p>
          <div className="w-16 md:w-20 h-[2px] bg-[#414141]" />
        </div>
      </div>
    <div className="mt-2">
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
    </>
  );
}

export default Bestseller;
