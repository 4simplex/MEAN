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
    await Product.findByIdAndRemove(req.params.id);
    res.json({ status: "Product deleted" })
}

productCTRL.getProductBy = async (req, res) => {
    if ((req.params.id != "noId" && req.params.name != null) || req.params.name != null) {
        return Product.findOne({ name: { $regex: new RegExp("^" + req.params.name + "$", 'i') } });
    }

    if (req.params.id != "noId") {
        return Product.findById(req.params.id);
    }
}

productCTRL.getProductById = async (req, res) => {
    const productById = await productCTRL.getProductBy(req, res);
    res.json(productById);
}

productCTRL.updateProduct = async (req, res) => {
    const product = new Product(req.body);
    await Product.findByIdAndUpdate(req.params.id, { $set: product });
    res.json({ status: "product updated" })
}

productCTRL.hasProducts = async (req, res) => {
    const productFind = await Product.findOne({ 'brand._id': req.params.id });
    res.json(productFind);
}

productCTRL.categoryhasProducts = async (req, res) => {
    const productFind = await Product.findOne({ 'category._id': req.params.id });
    res.json(productFind);
}

productCTRL.searchProductByName = async (req, res) => {
    const prod = await Product.find({ "brand.name": { "$regex": req.params.character, "$options": "i" } });

    if (prod.length == 0) {
        const name = await Product.find({ "name": { "$regex": req.params.character, "$options": "i" } });
        res.json(name);
        return;
    }
    res.json(prod);
}

module.exports = productCTRL;