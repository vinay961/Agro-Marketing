import React, { useState,useEffect } from 'react';
import { get } from '../../services/Api.jsx';

const OrderStatus = () => {
  const exampleOrders = [
    {
      _id: '12345',
      createdAt: '2024-10-12T14:30:00.000Z',
      products: [
        { _id: 'p1', name: 'Product 1', quantity: 2, price: 20 },
        { _id: 'p2', name: 'Product 2', quantity: 1, price: 50 },
      ],
      totalAmount: 90,
      status: 'Shipped',
    },
    {
      _id: '67890',
      createdAt: '2024-10-10T10:45:00.000Z',
      products: [
        { _id: 'p3', name: 'Product 3', quantity: 1, price: 30 },
      ],
      totalAmount: 30,
      status: 'Delivered',
    },
    {
      _id: '11223',
      createdAt: '2024-10-08T08:20:00.000Z',
      products: [
        { _id: 'p4', name: 'Product 4', quantity: 1, price: 15 },
        { _id: 'p5', name: 'Product 5', quantity: 3, price: 10 },
      ],
      totalAmount: 45,
      status: 'Pending',
    },
  ];

  useEffect(()=>{
    const getUserOrder = async() => {
      try {
        const response = await get('/order/getuserorder');
        console.log('Fetched Orders:', response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getUserOrder();
  })

  const [orders] = useState(exampleOrders); 

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-lg text-center">You have no orders at the moment.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded-lg shadow-md p-4 bg-white"
            >
              <h3 className="text-xl font-semibold">
                Order #{order._id.slice(-5).toUpperCase()}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">Items</h4>
                  <ul className="space-y-1">
                    {order.products.map((product) => (
                      <li
                        key={product._id}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm font-medium">
                          {product.name} (x{product.quantity})
                        </span>
                        <span className="text-sm text-gray-700">
                          ${product.price.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="mt-2">
                  <p
                    className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-500'
                        : order.status === 'Shipped'
                        ? 'bg-blue-500'
                        : 'bg-yellow-500'
                    }`}
                  >
                    {order.status}
                  </p>
                </div>

                {order.status === 'Delivered' ? (
                  <div className="mt-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">
                      View Invoice
                    </button>
                  </div>
                ) : order.status === 'Shipped' ? (
                  <div className="mt-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                      Track Shipment
                    </button>
                  </div>
                ) : (
                  <div className="mt-4">
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500">
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
