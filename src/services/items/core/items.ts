import { Types } from 'mongoose';
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

export const getItemsFromDB = async (page: number = 1, limit: number = 10) => {
  const totalItems = await ItemDB.countDocuments({});
  const skip = (page - 1) * limit;
  return await ItemDB.find()
    .skip(skip)
    .limit(limit)
    .then((response) => {
      return { items: response, meta: { total: totalItems, limit, page } };
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getCategoriesFromDB = async (
  page: number = 1,
  limit: number = 10,
) => {
  const totalItems = await ItemDB.countDocuments({});
  const skip = (page - 1) * limit;
  return await ItemDB.find()
    .skip(skip)
    .limit(limit)
    .then((response) => {
      return { items: response, meta: { total: totalItems, limit, page } };
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

export const getItemsByNameDescFromDB = async (
  context: string,
  page: number = 1,
  limit: number = 10,
) => {
  const totalItems = await ItemDB.countDocuments({});
  const skip = (page - 1) * limit;
  return await ItemDB.find({
    $or: [
      { name: { $regex: context, $options: 'i' } },
      { description: { $regex: context, $options: 'i' } },
    ],
  })
    .skip(skip)
    .limit(limit)
    .then((response) => {
      return { items: response, meta: { total: totalItems, limit, page } };
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const getItemsByCategoryFromDB = async (
  context: string,
  page: number = 1,
  limit: number = 10,
) => {
  const totalItems = await ItemDB.countDocuments({});
  const skip = (page - 1) * limit;
  return await ItemDB.find({ category: { $regex: context, $options: 'i' } })
    .skip(skip)
    .limit(limit)
    .then((response) => {
      return { items: response, meta: { total: totalItems, limit, page } };
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
