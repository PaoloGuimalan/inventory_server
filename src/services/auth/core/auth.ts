import { Types } from 'mongoose';
import { User } from '../models/user';
import UserDB from '../schema/userSchema';

export const createUserToDB = async (newUser: User) => {
  await UserDB.insertOne(newUser)
    .then(() => {
      return true;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getUserFromDB = async (id: Types.ObjectId) => {
  return await UserDB.findOne(id)
    .then((value) => {
      return value;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const deleteUserFromDB = async (id: Types.ObjectId) => {
  return await UserDB.deleteOne(id)
    .then(() => {
      return true;
    })
    .catch((err) => {
      throw new Error(err);
    });
};
