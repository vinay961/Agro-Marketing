import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Cart } from '../model/cart.model.js';

// Add item to cart
export const addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      cartItems: [{ productId, quantity }],
    });
  } else {
    const existingItem = cart.cartItems.find(item => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.cartItems.push({ productId, quantity });
    }
  }

  await cart.save();

  res.status(200).json(new ApiResponse('Item added to cart', cart));
});

// Get cart for the logged-in user
export const getCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId }).populate('cartItems.productId');
  if (!cart) {
    return next(new ApiError('Cart not found', 404));
  }

  res.status(200).json(new ApiResponse('Cart retrieved', cart));
});

export const updateCartItem = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return next(new ApiError('Cart not found', 404));
  }

  const item = cart.cartItems.find(item => item.productId.equals(productId));

  if (!item) {
    return next(new ApiError('Item not found in cart', 404));
  }

  item.quantity = quantity; 

  await cart.save();

  res.status(200).json(new ApiResponse('Cart item updated', cart));
});

// Remove an item from the cart
export const removeCartItem = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return next(new ApiError('Cart not found', 404));
  }

  cart.cartItems = cart.cartItems.filter(item => !item.productId.equals(productId));

  await cart.save();

  res.status(200).json(new ApiResponse('Item removed from cart', cart));
});

// Clear the entire cart
export const clearCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return next(new ApiError('Cart not found', 404));
  }

  cart.cartItems = []; 
  await cart.save();

  res.status(200).json(new ApiResponse('Cart cleared', cart));
});
