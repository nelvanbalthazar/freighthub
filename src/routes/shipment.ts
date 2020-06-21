import { Router } from 'express';

import {updateShipment, getShipment} from '../controllers/shipment'

const router = Router();


router.patch('/update/:id', updateShipment);
router.get('/', getShipment);

export default router;