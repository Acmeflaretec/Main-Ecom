const Order = require('../models/Order')

const getOrders = async (req, res) => {
  try {
    const data = await Order.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { _id } = req?.decoded
    const data = await Order.find({ userId:_id })
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const createOrder = async (req, res) => {
  const { userId, payment_mode, amount, address, products, status, offer } = req?.body
  try {
    const data = await Order.create({ userId, payment_mode, amount, address, products, status, offer })
    res.status(201).json({ data, message: 'Order placed successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const updateOrder = async (req, res) => {
  const { _id, status } = req?.body
  try {
    const data = await Order.updateOne({ _id },
      { $set: { status }})
    res.status(201).json({ data, message: 'Order updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

module.exports = {
    getOrders,
    getUserOrders,
    createOrder,
    updateOrder,
  }