import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shopcontext';
import ProductItem from '../components/ProductItem';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

function Collection() {
  const { products, searchQuery } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterproduct, setFilterProduct] = useState([]);
  const [Categories, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);

  const togglecategory = (e) => {
    setcategory(prev => 
      prev.includes(e.target.value) ? prev.filter(item => item !== e.target.value) : [...prev, e.target.value]
    );
  };

  const togglesubcategory = (e) => {
    setsubcategory(prev => 
      prev.includes(e.target.value) ? prev.filter(item => item !== e.target.value) : [...prev, e.target.value]
    );
  };

  const applyfilter = () => {
    let productcopy = [...products];
  
    const lowercaseCategories = Categories.map(cat => cat.toLowerCase());
    const lowercaseSubcategories = subcategory.map(sub => sub.toLowerCase());
  
    if (Categories.length > 0) {
      productcopy = productcopy.filter(item =>
        lowercaseCategories.includes(item.category.toLowerCase())
      );
    }
  
    if (subcategory.length > 0) {
      productcopy = productcopy.filter(item =>
        lowercaseSubcategories.includes(item.subcategory.toLowerCase())
      );
    }
  
    // Apply search filter
    if (searchQuery) {
      productcopy = productcopy.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    setFilterProduct(productcopy);
  };

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyfilter();
  }, [Categories, subcategory, searchQuery]); 

  const sortproduct = (e) => {
    let copy = [...filterproduct];
    if (e.target.value === 'low-high') {
      setFilterProduct(copy.sort((a, b) => a.price - b.price));
    } else if (e.target.value === 'high-low') {
      setFilterProduct(copy.sort((a, b) => b.price - a.price));
    } else {
      applyfilter();
    }
  };

  const toggleFilter = () => setShowFilter(!showFilter);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter */}
        <div className="w-full lg:w-64">
          <div className="flex items-center justify-between lg:block">
            <p className="text-xl font-semibold text-gray-800 cursor-pointer lg:cursor-auto" onClick={toggleFilter}>
              Filter
            </p>
            <button className="lg:hidden text-gray-600 hover:text-gray-800" onClick={toggleFilter}>
              {showFilter ? <FaChevronDown /> : <FaChevronUp />}
            </button>
          </div>

  
   {/* Category Filter */}
<div className={`mt-6 ${showFilter ? 'block' : 'hidden'} lg:block`}>
  <div className="border border-gray-200 rounded-lg p-4">
    <p className="text-lg font-bold text-gray-700 mb-3">Categories</p>
    <div className="space-y-2">
      {['Men', 'Women', 'Kids'].map((category) => (
        <label key={category} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={category}
            onChange={togglecategory}
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          />
          <span className="text-md font-semibold text-gray-700">{category}</span>
        </label>
      ))}
    </div>
  </div>
</div>

{/* Subcategory Filter */}
<div className={`mt-6 ${showFilter ? 'block' : 'hidden'} lg:block`}>
  <div className="border border-gray-200 rounded-lg p-4">
    <p className="text-lg font-bold text-gray-700 mb-3">Type</p>
    <div className="space-y-2">
      {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
        <label key={type} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={type}
           
            onChange={togglesubcategory}
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150"
          />
          <span className="text-md font-semibold text-gray-700">{type}</span>
        </label>
      ))}
    </div>
  </div>
</div>

        </div>

       
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
              Latest Collection
            </h1>
            <select
              onChange={sortproduct}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterproduct.length > 0 ? (
              filterproduct.map((item, index) => <ProductItem key={index} product={item} />)
            ) : (
              <p className="text-center text-gray-500 col-span-full">No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
