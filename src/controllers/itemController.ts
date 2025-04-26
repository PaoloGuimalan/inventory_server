import { Request, Response, NextFunction } from 'express';
import { Item } from '../services/items/models/item';
import {
  createItemToDB,
  deleteItemFromDB,
  getItemByNameDescFromDB,
  getItemsFromDB,
  updateItemFromDB,
} from '../services/items/core/items';
import { Types } from 'mongoose';

// Create an item
export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, description, category, price } = req.body;
    const newItem: Item = {
      dateAdded: Date.now(),
      name,
      description,
      category,
      price,
    };
    await createItemToDB(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

// Read all items
export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const itemsList = await getItemsFromDB();
    res.json(itemsList);
  } catch (error) {
    next(error);
  }
};

// Read single item
export const getItemById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);
    // const item = items.find((i) => i.id === id);
    // if (!item) {
    //   res.status(404).json({ message: 'Item not found' });
    //   return;
    // }
    // res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getItemByNameDesc = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const context = req.params.context;
    const items = await getItemByNameDescFromDB(context);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// Update an item
export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = new Types.ObjectId(req.params.id);
    const updatedItem = req.body;
    await updateItemFromDB(id, updatedItem);
    res.json({ status: true, message: 'Item has been updated' });
  } catch (error) {
    next(error);
  }
};

// Delete an item
export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    await deleteItemFromDB(new Types.ObjectId(id));
    res.json({ status: true, message: 'Item has been deleted' });
  } catch (error) {
    next(error);
  }
};
