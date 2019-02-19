const moongose = require('mongoose');
const URI = 'mongodb://localhost/app';

moongose.connect(URI, { useNewUrlParser: true })
.then(db => console.log('DB is connected.'))
.catch(err => console.error(err))

module.exports = moongose;