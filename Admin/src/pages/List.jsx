import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendurl } from "../App";

function List() {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/product/v1/list`);
    
      setList(response.data.message);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
  
      await axios.post(`${backendurl}/api/product/v1/remove/${id}`, {},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setList((prevList) => prevList.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };
  

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen  py-10">
      <h1 className="text-3xl font-bold text-center  mb-6">
        Product List
      </h1>

      {list.length > 0 ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg p-5"
            >
              {/* Display All Images */}
              <div className="flex overflow-x-auto space-x-2 p-2">
                {product.image && product.image.length > 0 ? (
                  product.image.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md border border-gray-300"
                    />
                  ))
                ) : (
                  <div className="w-full h-24 bg-gray-300 flex items-center justify-center text-gray-500 rounded-md">
                    No Image
                  </div>
                )}
              </div>

              <h2 className="text-lg font-semibold text-gray-900 mt-4">
                {product.name}
              </h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-medium mt-2">Price: ${product.price}</p>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-gray-600">Subcategory: {product.subcategory}</p>
              <p
                className={`font-medium ${
                  product.bestseller ? "text-green-600" : "text-red-600"
                }`}
              >
                Bestseller: {product.bestseller ? "Yes" : "No"}
              </p>
              <p className="text-gray-600">
                Sizes: {product.size.length > 0 ? product.size.join(", ") : "N/A"}
              </p>
              <button
                onClick={() => removeProduct(product._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </div>
  );
}

export default List;
