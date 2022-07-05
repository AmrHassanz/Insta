const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');


// 01
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    firstName: { type: String },
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String }, // string because of zero problem
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female'], default: 'Male' },
    profilePic: String,
    coverPic: Array,
    gallery: Array,
    confirmEmail: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    role: { type: String, default: 'User' },
    socialLinks: Array,
    follower: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    pdfLink: String,
    code: String,
    lastSeen: String
}, {
    // created at , updated at
    timestamps: true
})

// 03 hash password before saving in DB
userSchema.pre('save', async function (next) {
    // parseInt to convert saltRound from string to number
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound));
    next();
})

// increse version
userSchema.pre('findOneAndUpdate', async function (next) {
    console.log({ hookthis: this.model }); // { hookthis: Model { User } }
    console.log({ hookthis: this.getQuery() }); // { hookthis: { _id: new ObjectId("62c04a07d0a549ccabdc8794") } }
    const hookData = await this.model.findOne(this.getQuery()).select('__v');
    this.set({ __v: hookData.__v + 1 });
})

// 02
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
