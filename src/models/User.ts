import { Document, Model, Schema, SchemaTypes, Types, model } from 'mongoose';

interface IUserDocument extends Document {
  display_name: string;
}

interface IUserModel extends Model<IUserDocument> {
  getUser(queryObj: any): IUserDocument | null;
}

const UserSchema = new Schema({
  google_id: { type: String, required: true },
  display_name: { type: String, required: true }
});

UserSchema.statics.getUser = async function(queryObj: any) {
  const foundUser = await User.findOne(queryObj).lean();
  return foundUser;
};

export const User = model<IUserDocument, IUserModel>('User', UserSchema);
