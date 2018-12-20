const productCTRL = {};
const Product = require('../models/product');

productCTRL.getProduct = async (req, res) => {
    const product = await Product.find();
    res.json(product);
}

productCTRL.createProduct = async (req, res) => {

    const product = new Product(req.body);
    await product.save();
    res.json({ 'status': 'product Saved' });
}

productCTRL.deleteProduct = async (req, res) => {
    await Product.findOneAndRemove(req.params.id);
    res.json({ status: "Product deleted" })
}

productCTRL.getProductById = async (req, res) => {
    const productById = await Product.findById(req.params.id);
    res.json(productById);
}

productCTRL.updateProduct = async (req, res) => {
    const product = new Product(req.body);
    await Product.findByIdAndUpdate(req.params.id, { $set: product });
    res.json({ status: "product updated" })
}

module.exports = productCTRL;