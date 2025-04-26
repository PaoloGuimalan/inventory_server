import { Request, Response, NextFunction } from 'express';
import { Item } from '../services/items/models/item';
import {
  createItemToDB,
  deleteItemFromDB,
  getItemsByCategoryFromDB,
  getItemByIdFromDB,
  getItemsByNameDescFromDB,
  getItemsFromDB,
  updateItemFromDB,
  getCategoriesFromDB,
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
    res.status(201).json({ status: true, message: 'Item has been created' });
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
    const page = Array.isArray(req.headers['page'])
      ? req.headers['page'][0]
      : String(req.headers['page'] ?? 1);
    const limit = Array.isArray(req.headers['limit'])
      ? req.headers['limit'][0]
      : String(req.headers['limit'] ?? 10);
    const itemsList = await getItemsFromDB(parseInt(page), parseInt(limit));
    res.json({ status: true, data: itemsList });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = Array.isArray(req.headers['page'])
      ? req.headers['page'][0]
      : String(req.headers['page'] ?? 1);
    const limit = Array.isArray(req.headers['limit'])
      ? req.headers['limit'][0]
      : String(req.headers['limit'] ?? 10);
    const categoryList = await getCategoriesFromDB(
      parseInt(page),
      parseInt(limit),
    );
    res.json({ status: true, data: categoryList });
  } catch (error) {
    next(error);
  }
};

// Read single item
export const getItemById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = new Types.ObjectId(req.params.id);
    const fetchedItem = await getItemByIdFromDB(id);
    res.json({ status: true, data: fetchedItem });
  } catch (error) {
    next(error);
  }
};

export const getItemsByNameDesc = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = Array.isArray(req.headers['page'])
      ? req.headers['page'][0]
      : String(req.headers['page'] ?? 1);
    const limit = Array.isArray(req.headers['limit'])
      ? req.headers['limit'][0]
      : String(req.headers['limit'] ?? 10);
    const context = req.params.context;
    const items = await getItemsByNameDescFromDB(
      context,
      parseInt(page),
      parseInt(limit),
    );
    res.json({ status: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const getItemsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = Array.isArray(req.headers['page'])
      ? req.headers['page'][0]
      : String(req.headers['page'] ?? 1);
    const limit = Array.isArray(req.headers['limit'])
      ? req.headers['limit'][0]
      : String(req.headers['limit'] ?? 10);
    const context = req.params.context;
    const items = await getItemsByCategoryFromDB(
      context,
      parseInt(page),
      parseInt(limit),
    );
    res.json({ status: true, data: items });
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
