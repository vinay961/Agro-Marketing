import { useState } from 'react';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert('Product added successfully!');
      setIsSubmitting(false);
      // Clear form fields
      setProductName('');
      setDescription('');
      setCategory('');
      setPrice('');
      setImage(null);
    }, 1000);
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
            rows="5"
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
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-2">Product Image</label>
          <input
            type="file"
            id="image"
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
