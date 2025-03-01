import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/Shopcontext';
import { assets } from '../assets/assets';
import Relatedproduct from '../components/Relatedproduct';
import { toast } from 'react-toastify';

function Product() {
  const { productid } = useParams();
  const { currency, products, addtocart, token } = useContext(ShopContext);
  const [productdata, setProductdata] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [size, setsize] = useState('');
  const navigate = useNavigate();

  const fetchproduct = async () => {
    const product = products.find((item) => item._id === productid);
    if (product) {
      setProductdata(product);
      setMainImage(product.image[0]);
    } else {
      setProductdata(null); // Handle case where product is not found
    }
  };

  useEffect(() => {
    fetchproduct();
  }, [productid, products]); // Add `products` to dependency array

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  if (!productdata) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (!token) {
      toast.error("Please login to add items to your cart");
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    if (!size) {
      toast.error("Please select a size");
      return;
    }

    addtocart(productdata._id, size);
  };

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center lg:items-start">
        {productdata.image?.length > 0 ? (
          <>
            <div className="flex lg:flex-col gap-2 lg:w-24">
              {productdata.image.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover cursor-pointer border-2 border-transparent hover:border-gray-400 rounded-md"
                  alt={`Product Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(item)}
                />
              ))}
            </div>

            <div className="w-full max-w-md md:max-w-lg lg:w-[50%]">
              <img
                src={mainImage}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                alt="Main Product"
              />
            </div>
          </>
        ) : (
          <p className="text-red-500">No images available for this product.</p>
        )}

        <div className="w-full lg:w-[40%] flex flex-col text-center lg:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">{productdata.name}</h1>
          <div className="flex justify-center lg:justify-start items-center gap-1 mt-2">
          </div>
          <p className="text-gray-600 mt-2">{productdata.description}</p>
          <p className="text-2xl font-semibold mt-4">
            {currency}
            {productdata.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors w-full sm:w-auto"
          >
            Add to Cart
          </button>
          <p className="text-3xl py-6">Select Sizes</p>
          {productdata.size?.length > 0 ? (
            <div className="flex gap-2 p-2 rounded-md">
              {productdata.size.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setsize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : 'border-gray-300'}`}
                  aria-label={`Select size ${item}`}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-red-500">No sizes available for this product.</p>
          )}
          <div className="text-gray-600 mt-5 flex flex-col gap-1">
            <p>✅ 100% Original product.</p>
            <p>🚚 Cash on delivery is available on this product.</p>
            <p>🔄 Return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <Relatedproduct category={productdata.category} subcategory={productdata.subcategory} />
    </div>
  );
}

export default Product;