const Price = require('../models/price');
const priceCtrl = {};

const productCodeCtrl = require('./productCode.controller');
const codeGenerator = require('../helpers/codeGenerator');

priceCtrl.getPriceLst = async (req, res) => {
    const priceLst = await Price.find();
    res.json(priceLst);
}

priceCtrl.createPrice = async (req, res) => {
    console.log("Price item a insertar:");
    console.log(req.body);
    const price = new Price(req.body);

    var generatedCode = codeGenerator.generateProductCode();
    var codeExists = productCodeCtrl.findProductCode(generatedCode);
    while (codeExists) {
        generatedCode = codeGenerator.generateProductCode();
        codeExists = productCodeCtrl.findProductCode(generatedCode);
    }
    price.productCode = generatedCode;
    await price.save();
    res.json(price);
}

priceCtrl.getPrice = async (req, res) => {
    console.log(req.params);
    const price = await Price.findById(req.params.id);
    res.json(price);
}

priceCtrl.editPrice = async (req, res) => {
    console.log(req.body);
    const price = {
        purchasePrice: req.body.purchasePrice,
        salePrice: req.body.salePrice,
        provider: { 
            _id: req.body.provider._id, 
            name: req.body.provider.name 
        }
    };
    await Price.findByIdAndUpdate(req.params.id, {$set:price});
    res.json({status: 'Price updated'});
}

priceCtrl.deletePrice = async (req, res) => {
    await Price.findByIdAndRemove(req.params.id);
    res.json({status: 'Price deleted'});
}

module.exports = priceCtrl;