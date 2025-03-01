import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shopcontext';
import ProductItem from './ProductItem';

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
  
    if (products.length > 0) {
      setProductList(products); 
    }
  }, [products]); 

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-2 ">
        <div className="flex items-center gap-2 py-7">
          <p className="md:text-2xl text-gray-600 text-center uppercase tracking-wider font-bold text-3xl">
            Latest Collection
          </p>
          <div className="w-16 md:w-20 h-[2px] bg-[#414141]" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {productList.slice(0, 8).map((product) => (
  <ProductItem key={product.id} product={product} /> 
))}

      </div>
    </div>
  );
}

export default LatestCollection;
