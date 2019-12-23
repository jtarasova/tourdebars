const mongoose = require('mongoose');


let userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    key: Number,
})

// статический метод поиска юзера для "отображения пользователя" в user.js (в контроллере)
userSchema.statics.getUser = async function (id) {
    return await this.findById(id)
}

userSchema.statics.getUserByName = async function (username) {
    return await this.findOne({ name: username });
}

userSchema.statics.getUserByKey = async function (inpkey) {
    return await this.findOne({ key: inpkey })
}

module.exports = mongoose.model('User', userSchema);