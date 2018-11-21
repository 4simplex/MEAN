const Brand = require('../models/brand');
const brandCtrl = {};

brandCtrl.getBrands = async (req, res) => {
    const brands = await Brand.find();
    res.json(brands);
}

brandCtrl.createBrand =  async (req, res) => {
    console.log(req.body);
    const brand = new Brand(req.body);
    await brand.save();
    res.json({'status': 'Brand Saved' });
}

brandCtrl.getBrand = async (req, res) => {
    console.log(req.params);
    const brand = await Brand.findById(req.params.id);
    res.json(brand);
}

brandCtrl.editBrand = async (req, res) => {
    const brand = {
        name: req.body.name
    };
    await Brand.findByIdAndUpdate(req.params.id, {$set:brand});
    res.json({status: 'Brand updated'});
}

brandCtrl.deleteBrand = async (req, res) => {
    await Brand.findByIdAndRemove(req.params.id);
    res.json({status: 'Brand deleted'});
}

module.exports = brandCtrl;