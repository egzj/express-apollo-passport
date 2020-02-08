import mongoose from 'mongoose';
import 'jest-extended';

import { connectDB } from '../../connectDB';
import { User } from '../User';

beforeAll(async () => {
  connectDB();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Create new user', () => {
  const userId = mongoose.Types.ObjectId();
  const userObj = {
    _id: userId,
    display_name: 'Test_1'
  };

  test('should create new user successfully', async () => {
    const savedUser = await new User(userObj).save();
    console.log(savedUser);
    expect(savedUser).toBeTruthy();
  });

  afterAll(async () => {
    await User.deleteOne({ _id: userId });
  });
});
