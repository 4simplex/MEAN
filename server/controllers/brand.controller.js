const Brand = require('../models/brand');
const brandCtrl = {};

brandCtrl.getBrands = async (req, res) => {
    const brands = await Brand.find();
    res.json(brands);
}

brandCtrl.createBrand = async (req, res) => {
    const brand = new Brand(req.body);
    await brand.save();
    res.json(brand);
}

brandCtrl.getBrand = async (req, res) => {
    const brand = await brandCtrl.getBrandBy(req, res);
    res.json(brand);
}

brandCtrl.editBrand = async (req, res) => {
    const brand = {
        name: req.body.name
    };
    await Brand.findByIdAndUpdate(req.body._id, { $set: brand });
    res.json({ status: 'Brand updated' });
}

brandCtrl.deleteBrand = async (req, res) => {
    await Brand.findByIdAndRemove(req.params.id);
    res.json({ status: 'Brand deleted' });
}

brandCtrl.getBrandBy = async (req, res) => {
    if (req.params.id != "noId") {
        return Brand.findById(req.params.id);
    }

    if ((req.params.id != "noId" && req.params.name != null) || req.params.name != null) {
        return Brand.findOne({ name: { $regex: new RegExp("^" + req.params.name + "$", 'i') } });
    }
}

module.exports = brandCtrl;