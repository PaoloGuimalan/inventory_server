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
import { permissionChecker } from '../middlewares/permissionChecker';

const router = Router();

router.get('/', getItems);
// router.get('/:id', getItemById);
router.get('/search/:context', permissionChecker, getItemsByNameDesc);
router.get('/category/:context', permissionChecker, getItemsByCategory);
router.get('/categories', permissionChecker, getCategories);
router.post('/', permissionChecker, createItem);
router.put('/:id', permissionChecker, updateItem);
router.delete('/:id', permissionChecker, deleteItem);

export default router;
