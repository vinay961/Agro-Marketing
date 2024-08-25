import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { get, put } from '../../services/Api.jsx';

const EditProduct = () => {
  const location = useLocation();
  const { productId } = location.state || {}; 

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productImage, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [initialProduct, setInitialProduct] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!productId) return; 

    const fetchProductDetails = async () => {
      try {
        const response = await get(`/products/getspecificproduct/${productId}`);
        const { product } = response.data; 

        setProductName(product.productName);
        setDescription(product.productDesc);
        setCategory(product.category);
        setPrice(product.price);
        setQuantity(product.quantity); 
        setExistingImage(product.productImage);

        setInitialProduct(product);

      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const updatedFields = {};

  if (productName !== initialProduct.productName) updatedFields.productName = productName;
  if (description !== initialProduct.productDesc) updatedFields.description = description;
  if (category !== initialProduct.category) updatedFields.category = category;
  if (price !== initialProduct.price) updatedFields.price = price;
  if (quantity !== initialProduct.quantity) updatedFields.quantity = quantity;

  const url = `/products/editproduct/${productId}`;

  try {
    if (productImage) {
      const formData = new FormData();
      Object.keys(updatedFields).forEach(key => {
        formData.append(key, updatedFields[key]);
      });
      formData.append('productImage', productImage);

      await put(url, formData, true);
    } else {
      await put(url, updatedFields);
    }

    alert('Product updated successfully!');
  } catch (error) {
    console.error('Failed to update product:', error);
    alert('Failed to update product.');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Edit Product</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="mb-6">
          <label htmlFor="productName" className="block text-lg font-medium text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
            rows="3"
            placeholder="Enter product description"
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
            required
          >
            <option value="">Select a category</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="dairy">Dairy</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="price" className="block text-lg font-medium text-gray-700 mb-2">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
            placeholder="Enter product price"
            required
          />
          <p className="text-sm text-gray-600 mt-1">Please enter the price for per kg or per dozen.</p>
        </div>
        <div className="mb-6">
          <label htmlFor="quantity" className="block text-lg font-medium text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
            placeholder="Enter product quantity in kg or dozen"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">Product Image</label>
          {existingImage && (
            <div className="mb-4">
              <img src={existingImage} alt="Existing Product" className="w-full h-auto rounded-lg mb-2" />
            </div>
          )}
          <input
            type="file"
            id="productImage"
            name="productImage"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-150 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
