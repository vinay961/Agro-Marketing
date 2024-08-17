import React from 'react';

const ProductDetails = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row">
        {/* Product Image Gallery */}
        <div className="flex-1">
          <img
            src="https://th.bing.com/th/id/OIP.HcFdIAP4zeO1zdEQTc3KdwHaHa?rs=1&pid=ImgDetMain"
            alt="Product"
            className="w-full h-auto object-cover mb-4 mr-5"
          />
          <div className="flex space-x-4">
            <img src="https://th.bing.com/th/id/OIP.3I6FbcMMyJ32MzvnK9051QHaE8?rs=1&pid=ImgDetMain" alt="Thumbnail 1" className="w-16 h-16 object-cover" />
            <img src="https://th.bing.com/th/id/OIP.JMRIOYp2jmlICSlEma_3gQHaE7?rs=1&pid=ImgDetMain" alt="Thumbnail 2" className="w-16 h-16 object-cover" />
            <img src="https://th.bing.com/th/id/OIP.hYvPzkbLmclOygsV_JDYCAHaHa?w=551&h=551&rs=1&pid=ImgDetMain" alt="Thumbnail 3" className="w-16 h-16 object-cover" />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 md:ml-8">
          <h1 className="text-4xl font-bold mb-4">Organic Tomatoes</h1>
          <p className="text-2xl font-semibold text-green-500 mb-2">30-/ per kg</p>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="ml-2 text-gray-500">(85 reviews)</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">
            Farm-fresh organic tomatoes, perfect for your kitchen. Rich in flavor and nutrients, these tomatoes are
            grown without pesticides.
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-4 text-lg font-semibold">Quantity:</label>
            <input type="number" id="quantity" name="quantity" defaultValue="1" className="border p-2 w-20 text-center" />
          </div>

          {/* Add to Cart Button */}
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">Add to Cart</button>

          {/* Related Products */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Related Products</h2>
          <div className=" flex overflow-x-auto space-x-8 space-x-4">
            {/* Related Product Item */}
            <div className="bg-white p-4 rounded-lg shadow-lg flex-shrink-0" style={{ minWidth: '200px' }}>
              <img src="https://th.bing.com/th/id/OIP.7yZ0dtiUa6R4dndMqMg0gwHaHa?rs=1&pid=ImgDetMain" alt="Related Product" className="w-full h-40 object-cover mb-2" />
              <h3 className="text-lg font-bold">Organic Spinach</h3>
              <p className="text-green-500 font-semibold">39/- per bunch</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg flex-shrink-0" style={{ minWidth: '200px' }}>
              <img src="https://th.bing.com/th/id/OIP.7yZ0dtiUa6R4dndMqMg0gwHaHa?rs=1&pid=ImgDetMain" alt="Related Product" className="w-full h-40 object-cover mb-2" />
              <h3 className="text-lg font-bold">Organic Spinach</h3>
              <p className="text-green-500 font-semibold">39/- per bunch</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg flex-shrink-0" style={{ minWidth: '200px' }}>
              <img src="https://th.bing.com/th/id/OIP.7yZ0dtiUa6R4dndMqMg0gwHaHa?rs=1&pid=ImgDetMain" alt="Related Product" className="w-full h-40 object-cover mb-2" />
              <h3 className="text-lg font-bold">Organic Spinach</h3>
              <p className="text-green-500 font-semibold">39/- per bunch</p>
            </div>
            {/* Repeat for more related products */}
          </div>
          

          {/* Customer Reviews */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Customer Reviews</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Yashwani Sisodia</p>
            <div className="flex items-center">
              <span className="text-yellow-500">★★★★★</span>
              <span className="ml-2 text-gray-500">(Posted on: 2024-08-15)</span>
            </div>
            <p className="text-gray-700 mt-2">
              These tomatoes are fantastic! They’re fresh, juicy, and perfect for salads and sandwiches.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Janhavi Rai</p>
            <div className="flex items-center">
              <span className="text-yellow-500">★★★★★</span>
              <span className="ml-2 text-gray-500">(Posted on: 2024-08-15)</span>
            </div>
            <p className="text-gray-700 mt-2">
              These tomatoes are fantastic! They’re fresh, juicy, and perfect for salads and sandwiches.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Nihal Rai</p>
            <div className="flex items-center">
              <span className="text-yellow-500">★★★★★</span>
              <span className="ml-2 text-gray-500">(Posted on: 2024-08-15)</span>
            </div>
            <p className="text-gray-700 mt-2">
              These tomatoes are fantastic! They’re fresh, juicy, and perfect for salads and sandwiches.
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
        <p className="text-gray-700">
          Ships within 3-5 business hours. Free shipping on orders over 500/-.
        </p>
      </div>

      {/* Seller Information */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Seller Information</h2>
        <p className="text-gray-700">
          Farmer: Vinay | Location: Farmer's Hub, Hathani, Ghazipur 
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
