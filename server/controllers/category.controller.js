const Category = require('../models/category');
const categoryCtrl = {};


categoryCtrl.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
}

categoryCtrl.createCategory =  async (req, res) => {
    console.log(req.body);
    const category = new Category(req.body);
    await category.save();
    res.json({'status': 'Category Saved' });
}

categoryCtrl.getCategory = async (req, res) => {
    console.log(req.params);
    const category = await Category.findById(req.params.id);
    res.json(category);
}

categoryCtrl.editCategory = async (req, res) => {
    const category = {
        name: req.body.name
    };
    await Category.findByIdAndUpdate(req.params.id, {$set:category});
    res.json({status: 'Category updated'});
}

categoryCtrl.deleteCategory = async (req, res) => {
    await Category.findByIdAndRemove(req.params.id);
    res.json({status: 'Category deleted'});
}

module.exports = categoryCtrl;