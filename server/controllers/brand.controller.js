const BrandModel = require('../models/brand');
const Brand = {};

Brand.Create = async (req, res) => {
    const newBrand = new BrandModel({
        name: req.body.name
    })
    await newBrand.save();
    res.json({status: "Brand saved successfuly"})
}

Brand.Read = async (req, res) => {
    const allBrands = await BrandModel.find();
    res.json(allBrands);
}

Brand.Update = async (req, res) => {
    const brand = {
        name: req.body.name
    };
    await BrandModel.findByIdAndUpdate(req.params.id, {$set:brand});
    res.json({status: "Brand updated successfuly"});
}

Brand.Delete = async (req, res) => {
    await BrandModel.findByIdAndDelete(req.params.id);
    res.json({status: 'Brand deleted successfuly'});
}

module.exports = Brand;