import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Cart } from '../model/cart.model.js';

const addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOneAndUpdate(
      { userId },
      { $setOnInsert: { cartItems: [] } },
      { new: true, upsert: true }
    );

    const existingItem = cart.cartItems.find(item => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.cartItems.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(new ApiResponse('Item added to cart', cart));
  } catch (error) {
    next(new ApiError('Error adding item to cart', 500));
  }
});

const getCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return next(new ApiError('Cart not found', 404));
    }

    return res.status(200).json(new ApiResponse('Cart retrieved', cart));
  } catch (error) {
    next(new ApiError('Error retrieving cart', 500));
  }
});

const updateCartItem = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
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
  } catch (error) {
    next(new ApiError('Error updating cart item', 500));
  }
});

const removeCartItem = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return next(new ApiError('Cart not found', 404));
    }

    cart.cartItems = cart.cartItems.filter(item => !item.productId.equals(productId));
    await cart.save();

    res.status(200).json(new ApiResponse('Item removed from cart', cart));
  } catch (error) {
    next(new ApiError('Error removing item from cart', 500));
  }
});

const clearCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return next(new ApiError('Cart not found', 404));
    }

    cart.cartItems = []; 
    await cart.save();

    res.status(200).json(new ApiResponse('Cart cleared', cart));
  } catch (error) {
    next(new ApiError('Error clearing cart', 500));
  }
});

export {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
};
