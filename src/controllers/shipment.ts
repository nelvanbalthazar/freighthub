import { RequestHandler } from 'express';
import { ShipmentUpdateListener, ShipmentDataSender } from '../implementation/shipment';


export const updateShipment: RequestHandler <{id: string}>= async (req, res, next) => {
   const shipmentId = req.params.id;
   const shipmentData = req.body;
   try {
     const shipmentUpdate = await new ShipmentUpdateListener().receiveUpdate(shipmentId, shipmentData);
     res.status(201).json({message: 'Data Updated !', shipmentData: {id : shipmentId, shipmentUpdate}});
   } catch(error) {
     res.status(400).json({error: error.message});
   }
}

export const getShipment: RequestHandler = async (req, res, next) => {
    try {
      const shipmentList = await new ShipmentDataSender().sendShipmentData();
      res.status(201).json({message: 'Data Retrieved Successfully !', shipmentData: shipmentList});
    } catch(error) {
      res.status(400).json({error: error.message});
    }
 }
