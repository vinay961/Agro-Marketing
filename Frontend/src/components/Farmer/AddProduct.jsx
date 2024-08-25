import { useState } from 'react';
import { post } from '../../services/Api.jsx';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productImage, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDesc', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('quantity', quantity);
    if (productImage) {
      formData.append('productImage', productImage);
    }
    try {
      const response = await post('/products/registerproduct', formData, true);
      console.log('Registration successful:', response.data);
      setTimeout(() => {
        alert('Product added successfully!');
        setIsSubmitting(false);
        setProductName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setQuantity('');
        setImage(null);
      }, 1000);
    } catch (error) {
      alert('Registration Failed');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Add New Product</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="mb-6">
          <label htmlFor="productName" className="block text-lg font-medium text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
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
            name="productDesc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
            rows="5"
            placeholder="Enter product description"
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">Category</label>
          <select
            id="category"
            name="category"
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
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
            placeholder="Enter product price"
            required
          />
          <p className="text-sm text-gray-600 mt-1">Please enter the price per kg or per dozen.</p>
        </div>
        <div className="mb-6">
          <label htmlFor="quantity" className="block text-lg font-medium text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
            placeholder="Enter product quantity in kg or dozen"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="productImage" className="block text-lg font-medium text-gray-700 mb-2">Product Image</label>
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
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
