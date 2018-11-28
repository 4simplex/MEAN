const multer = require('multer');
var DIR = './uploads';

var upload = multer({dest: DIR}).single('photo');