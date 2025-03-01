import React, { useContext } from "react";
import { ShopContext } from "../context/Shopcontext";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${product._id}`} className="block w-full sm:w-64">
      <div className="p-3 sm:p-8 shadow-lg rounded-md hover:shadow-xl transition flex flex-col items-center">

        {/* Container with increased size */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-md overflow-hidden flex justify-center items-center">
          <img
            src={product.image?.[0]}
            alt={product.name}
            className="w-full h-full object-contain object-center" 
          />
        </div>

        <h3 className="text-xs sm:text lg:text-lg font-semibold mt-1 sm:mt-2 text-center ">
          {product.name.length > 15 ? product.name.slice(0, 15) + "..." : product.name}
        </h3>

        <p className="mt-1 sm:mt-2 font-bold text-base sm:text-lg">
          {currency} {new Intl.NumberFormat().format(product.price)}
        </p>
      </div>
    </Link>
  );
}

export default ProductItem;