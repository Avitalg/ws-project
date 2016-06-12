var mongoose = require('mongoose');
var schema = mongoose.Schema;

var looksSchema = new schema({
    look: String,
    image: String,
    steps: [
        {
        	"number": {type:Number, required:true},
            "face_image": String,
            "description": String,
            "product_id": Number
        }
    ]
},  {collection: 'looks'});

var Looks = mongoose.model('Looks', looksSchema);

module.exports = Looks;


