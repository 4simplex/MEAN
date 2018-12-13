const productCTRL = {};
const Product = require('../models/product');

productCTRL.getProduct = async (req, res) => {
    const product = await Product.find();
    res.json(product);
}

productCTRL.createProduct = async (req, res) => {
    
    const product = new Product(req.body);
    await product.save();
    res.json({'status': 'product Saved' });
}

productCTRL.deleteProduct = async (req, res) => {
    await Product.findOneAndRemove(req.params.id);
    res.json({status: "Product deleted"})
}

module.exports = productCTRL;