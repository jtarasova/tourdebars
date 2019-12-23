const mongoose = require('mongoose');


let auctionSchema = mongoose.Schema({
    title: String,
    condition: String,
    start: String,
    end: String,
    // start: { type: Date, default: Date.now },
    // end: Date,
    description: String,
    owner: String,
})

// статический метод поиска аукциона по владельцу
auctionSchema.statics.getByOwner = async function (name) {
    return await this.find({ owner: name })
}
auctionSchema.statics.getById = async function (id) {
    return await this.findById(id)
}
// userSchema.statics.getUserByName = async function (username) {
//     return await this.findOne({ name: username });
// }

// userSchema.statics.getUserByKey = async function (inpkey) {
//     return await this.findOne({ key: inpkey })
// }

module.exports = mongoose.model('Auction', auctionSchema);