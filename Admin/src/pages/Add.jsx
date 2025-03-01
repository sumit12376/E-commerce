import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { backendurl } from "../App"; 
import { toast } from "react-toastify";
function Add({ token }) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("men");
  const [subCategory, setSubCategory] = useState("topwear");
  const [productPrice, setProductPrice] = useState("");
  const [images, setImages] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({
    S: false,
    M: false,
    L: false,
    XL: false,
  });
  const [bestseller, setBestseller] = useState(false);


  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = file;
      return newImages;
    });
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [size]: !prev[size],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("category", productCategory);
      formData.append("subcategory", subCategory);
      formData.append("price", productPrice);
      formData.append("bestseller", bestseller ? "true" : "false"); 
  
    
      formData.append("size", JSON.stringify(Object.keys(selectedSizes).filter((size) => selectedSizes[size])));
  
      // Ensure field name matches Multer config
      images.forEach((image) => {
        if (image) formData.append("images", image);
      });
  
      // console.log("Sending FormData:");
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }
  
      const response = await axios.post(`${backendurl}/api/product/v1/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  

      if (response.data.success) {
        toast.success("Product added successfully!");
  
        // Reset all fields
        setProductName("");
        setProductDescription("");
        setProductCategory("men");
        setSubCategory("topwear");
        setBestseller(false);
        setImages([]);
        setProductPrice("");
        setSelectedSizes({ S: false, M: false, L: false, XL: false });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      toast.error(error.message);
    }
  };
  


  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {/* Upload Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Images</label>
        <div className="flex gap-2 mt-1">
          {[0, 1, 2, 3].map((index) => (
            <div key={index}>
              <label htmlFor={`image${index + 1}`} className="cursor-pointer">
                <img
                  src={images[index] ? URL.createObjectURL(images[index]) : assets.upload_area}
                  alt="Upload Area"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <input
                  type="file"
                  id={`image${index + 1}`}
                  onChange={(e) => handleImageChange(e, index)}
                  className="hidden"
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Type here"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <label className="block text-sm font-medium text-gray-700">Bestseller</label>
      <select
  value={bestseller.toString()}
  onChange={(e) => setBestseller(e.target.value === "true")}
  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
>
  <option value="true">True</option>
  <option value="false">False</option>
</select>

      <div>
        <label className="block text-sm font-medium text-gray-700">Product Description</label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Type here"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Product Category</label>
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sub Category</label>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="topwear">Topwear</option>
          <option value="bottomwear">Bottomwear</option>
          <option value="winterwear">Winterwear</option>
        </select>
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700">Product Price</label>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Type here"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

    
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Size</label>
        <div className="flex gap-4">
          {Object.keys(selectedSizes).map((size) => (
            <label key={size} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={selectedSizes[size]} onChange={() => handleSizeChange(size)} className="hidden" />
              <span className={`px-3 py-2 rounded-md border ${selectedSizes[size] ? "bg-indigo-500 text-white" : "hover:bg-gray-100"}`}>
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>


      <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        Add Product
      </button>
    </form>
  );
}

export default Add;