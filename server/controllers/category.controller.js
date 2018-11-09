const CategoryModel = require('../models/category');
const Category = {};

Category.Create = async (req, res) => {
    const newCategory = new CategoryModel({
        name: req.body.name
    })
    await newCategory.save();
    res.json({status: "ok"})
}

Category.Read = async (req, res) => {
    const allCategories = await CategoryModel.find();
    res.json(allCategories);
}

module.exports = Category;