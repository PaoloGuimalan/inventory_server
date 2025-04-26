import { ObjectId, Types } from 'mongoose';
import { Item } from '../models/item';
import ItemDB from '../schema/itemSchema';

export const createItemToDB = async (newItem: Item) => {
  return await ItemDB.insertOne(newItem)
    .then(() => {
      return true;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getItemsFromDB = async () => {
  return await ItemDB.find()
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getItemByIdFromDB = async (id: Types.ObjectId) => {
  return await ItemDB.findOne({ _id: id })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getItemByNameDescFromDB = async (context: string) => {
  return await ItemDB.find({
    $or: [{ name: { $regex: context } }, { description: { $regex: context } }],
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const deleteItemFromDB = async (id: Types.ObjectId) => {
  return await ItemDB.deleteOne({ _id: id })
    .then(() => {
      return true;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const updateItemFromDB = async (
  id: Types.ObjectId,
  updatedItem: Item,
) => {
  return await ItemDB.updateOne({ _id: id }, updatedItem)
    .then(() => {
      return true;
    })
    .catch((err) => {
      throw new Error(err);
    });
};
