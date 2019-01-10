const Stock = require('../models/stock');
const stockCtrl = {};

const productCodeCtrl = require('./productCode.controller');
const codeGenerator = require('../helpers/codeGenerator');

stockCtrl.getStockLst = async (req, res) => {
    const stockLst = await Stock.find();
    res.json(stockLst);
}

stockCtrl.createStock = async (req, res) => {
    console.log("Stock item a insertar:");
    console.log(req.body);
    const stock = new Stock(req.body);

    var generatedCode = codeGenerator.generateProductCode();
    var codeExists = productCodeCtrl.findProductCode(generatedCode);
    while (codeExists) {
        generatedCode = codeGenerator.generateProductCode();
        codeExists = productCodeCtrl.findProductCode(generatedCode);
    }
    stock.productCode = generatedCode;
    await stock.save();
    res.json(stock);
}

stockCtrl.getStock = async (req, res) => {
    console.log(req.params);
    const stock = await Stock.findById(req.params.id);
    res.json(stock);
}

stockCtrl.editStock = async (req, res) => {
    const stock = {
        purchasePrice: req.body.purchasePrice,
        salePrice: req.body.salePrice,
        stockQty: req.body.stockQty
    };
    await Stock.findByIdAndUpdate(req.params.id, {$set:stock});
    res.json({status: 'Stock updated'});
}

stockCtrl.deleteStock = async (req, res) => {
    await Stock.findByIdAndRemove(req.params.id);
    res.json({status: 'Stock deleted'});
}

module.exports = stockCtrl;