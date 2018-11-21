const Stock = require('../models/stock');
const stockCtrl = {};

stockCtrl.getStockLst = async (req, res) => {
    const stockLst = await Stock.find();
    res.json(stockLst);
}

stockCtrl.createStock = async (req, res) => {
    console.log(req.body);
    const stock = new Stock(req.body);
    await stock.save();
    res.json({'status': 'Stock Saved' });
}

stockCtrl.getStock = async (req, res) => {
    console.log(req.params);
    const stock = await Stock.findById(req.params.id);
    res.json(stock);
}

stockCtrl.editStock = async (req, res) => {
    const stock = {
        purchasePrice: req.body.purchasePrice
    };
    await Stock.findByIdAndUpdate(req.params.id, {$set:stock});
    res.json({status: 'Stock updated'});
}

stockCtrl.deleteStock = async (req, res) => {
    await Stock.findByIdAndRemove(req.params.id);
    res.json({status: 'Stock deleted'});
}

module.exports = stockCtrl;