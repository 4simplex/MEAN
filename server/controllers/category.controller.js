const Category = require('../models/category');
const categoryCtrl = {};


categoryCtrl.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
}

categoryCtrl.createCategory = async (req, res) => {
    console.log(req.body);
    const category = new Category(req.body);
    await category.save();
    res.json(category);
}

categoryCtrl.getCategory = async (req, res) => {
    const category = await categoryCtrl.getCategoryBy(req, res);
    res.json(category);
}

categoryCtrl.editCategory = async (req, res) => {
    const category = {
        name: req.body.name
    };
    await Category.findByIdAndUpdate(req.params.id, { $set: category });
    res.json({ status: 'Category updated' });
}

categoryCtrl.deleteCategory = async (req, res) => {
    await Category.findByIdAndRemove(req.params.id);
    res.json({ status: 'Category deleted' });
}

categoryCtrl.getCategoryBy = async (req, res) => {

    if ((req.params.id != "noId" && req.params.name != null) || req.params.name != null) {
        return Category.findOne({ name: { $regex: new RegExp("^" + req.params.name + "$", 'i') } });
    }

    if (req.params.id != "noId") {
        return Category.findById(req.params.id);
    }
}

module.exports = categoryCtrl;