const ProductCode = require('../models/productCode');
const productCodeCtrl = {};

productCodeCtrl.findProductCode = function(code) {
    console.log("Código pasado como parámetro " + code);
    ProductCode.findOne({code: code}, 
        function(err, obj) {
            console.log("Objeto product code devuelto");
            console.log(obj);
            if(!obj){
                const productCode = new ProductCode();
                productCode.code = code;
                console.log(productCode);
                productCode.save();
                return false;
            } else {
                return true;
            }
        });
}

module.exports = productCodeCtrl;