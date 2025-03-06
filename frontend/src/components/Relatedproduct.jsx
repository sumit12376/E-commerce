import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shopcontext';
import ProductItem from './ProductItem';

function Relatedproduct({ category, subcategory }) {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products
        .filter((item) => category === item.category)
        .filter((item) => subcategory === item.subcategory);
      
      setRelated(productCopy.slice(0, 5)); 
    }

//satrt with 0,0
    window.scrollTo(0, 0);
  }, [products, category, subcategory]); 

  return (
    <div className="my-24">
      <div className="flex items-center gap-2 py-7">
        <p className="md:text-2xl text-gray-600 text-center uppercase tracking-wider font-bold text-3xl">
          Related Products
        </p>
        <div className="w-16 md:w-20 h-[2px] bg-[#414141]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Relatedproduct;
