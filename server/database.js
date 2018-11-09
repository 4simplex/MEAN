const moongose = require('mongoose');
const URI = 'mongodb://localhost/app';

moongose.connect(URI, { useNewUrlParser: true })
.then(db => console.log('db connected'))
.catch(err => console.log('something went wrong with the db!'))

module.exports = moongose;