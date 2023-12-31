import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { StudentModel, TAddress, TName, TOrder, TUser } from './user.interface';

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const nameSchema = new Schema<TName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new Schema<TUser, StudentModel>(
  {
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: nameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: { type: addressSchema, required: true },
    orders: { type: [orderSchema], required: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtuals
userSchema.virtual('fullname').get(function () {
  return `${this.fullName.firstName} ${this.fullName.lastName}`;
});

// user password hashing middleware
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const userData = this;
  userData.password = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// find and findOne condition middleware
userSchema.pre('find', function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});
userSchema.pre('findOne', function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});

userSchema.statics.isUserExits = async function (id: string) {
  const existingUser = await UserModel.findOne({ userId: id });
  return existingUser;
};

const UserModel = model<TUser, StudentModel>('TUser', userSchema);

export default UserModel;
