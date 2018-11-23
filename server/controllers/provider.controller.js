const Provider = require('../models/provider');
const providerCtrl = {};


providerCtrl.getProviders = async (req, res) => {
    const providers = await Provider.find();
    res.json(providers);
}

providerCtrl.createProvider =  async (req, res) => {
    console.log(req.body);
    const provider = new Provider(req.body);
    await provider.save();
    res.json({'status': 'Provider Saved' });
}

providerCtrl.getProvider = async (req, res) => {
    console.log(req.params);
    const provider = await Provider.findById(req.params.id);
    res.json(provider);
}

providerCtrl.editProvider = async (req, res) => {
    const provider = {
        name: req.body.name,
        info: req.body.info
    };
    await Provider.findByIdAndUpdate(req.params.id, {$set:provider});
    res.json({status: 'Provider updated'});
}

providerCtrl.deleteProvider = async (req, res) => {
    await Provider.findByIdAndRemove(req.params.id);
    res.json({status: 'Provider deleted'});
}

module.exports = providerCtrl;