import { Router } from 'express';
import {
  createItem,
  getItems,
  // getItemById,
  updateItem,
  deleteItem,
  getItemsByNameDesc,
  getItemsByCategory,
  getCategories,
} from '../controllers/itemController';

const router = Router();

router.get('/', getItems);
// router.get('/:id', getItemById);
router.get('/:context', getItemsByNameDesc);
router.get('/category/:context', getItemsByCategory);
router.get('/categories', getCategories);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
