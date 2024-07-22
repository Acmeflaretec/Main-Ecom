const Address = require('../models/address')

const getAddress = async (req, res) => {
  try {
    const { _id } = req.decoded
    const data = await Address.find({ userId:_id })
    res.status(200).json({ data ,message: 'Address fetching successfully' })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const addAddress = async (req, res) => {
  const { userId, firstname, lastname, country, address_line_1, address_line_2, city, state, zip, mobile, primary } = req?.body
  try {
    const data = await Address.create({
      userId, firstname, lastname, country, address_line_1, address_line_2, city, state, zip, mobile, primary
    })
    res.status(201).json({ data, message: 'Address created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const updateAddress = async (req, res) => {
  const { _id, firstname, lastname, country, address_line_1, address_line_2, city, state, zip, mobile, primary } = req?.body
  try {
    const data = await Address.updateOne({ _id },
      { $set: { firstname, lastname, country, address_line_1, address_line_2, city, state, zip, mobile, primary }})
    res.status(201).json({ data, message: 'Address updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const deleteAddress = async (req, res) => {
  try {
    const id = req.params.id
    await Address.deleteOne({ _id: id });
    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

module.exports = {
    getAddress,
    addAddress,
    updateAddress,
    deleteAddress,
  }