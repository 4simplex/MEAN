const Sale = require('../models/sale');
const saleCtrl = {};

saleCtrl.createSale = async (req, res) => {
    const sale = new Sale(req.body);
    await sale.save();
    res.json({ status: 'Venta realizada' });
}


module.exports = saleCtrl;