const { Schema, model } = require('mongoose');

const customerSchema = new Schema(
    {   
 //   "Id", "Name", "Description", "Address", "Mobile", "Email"]
        Id:{ type: String },
        Name:{ type: String },
        Descripcion:{ type: String },
        Address:{ type: String },
        Mobile:{ type: String },
        Email:{ type: String }
    }, {
        timestamps: true
    });

module.exports = model('customer', customerSchema);
