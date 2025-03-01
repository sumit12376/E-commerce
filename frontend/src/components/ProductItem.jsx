import React, { useContext } from "react";
import { ShopContext } from "../context/Shopcontext";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${product._id}`} className="block w-full sm:w-60">
      <div className="p-3 sm:p-4 shadow-lg rounded-md hover:shadow-xl transition flex flex-col items-center">

        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-md overflow-hidden flex justify-center items-center">
          <img
            src={product.image?.[0]}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>


        <h3 className="text-xs sm:text-sm lg:text-lg font-semibold mt-1 sm:mt-2 text-center">
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
