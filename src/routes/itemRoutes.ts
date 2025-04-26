import { Router } from 'express';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemByNameDesc,
} from '../controllers/itemController';

const router = Router();

router.get('/', getItems);
// router.get('/:id', getItemById);
router.get('/:context', getItemByNameDesc);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
