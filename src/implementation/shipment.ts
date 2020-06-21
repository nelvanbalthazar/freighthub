import {SHIPMENT_DATA} from '../data/shipment';

async function sleep(ms: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

async function randomDelay() {
    const randomTime = Math.round(Math.random() * 1000)
    return sleep(randomTime)
}

class ShipmentSearchIndex {
    updateShipment(id: string,  shipmentData : any) {
     return new Promise( async(resolve, reject) => {
      try {
        const startTime = new Date()
        await randomDelay()
        const endTime = new Date()

        const shipmentIndex = await SHIPMENT_DATA.findIndex(shipment => shipment.id === +id);


        if (shipmentIndex < 0) {
           throw new Error('Could not find Shipment');
        }

       delete SHIPMENT_DATA[shipmentIndex].shipmentData ;
       SHIPMENT_DATA[shipmentIndex].shipmentData = shipmentData;

        console.log(`update ${id}@${
            startTime.toISOString()
            } finished@${
            endTime.toISOString()
            }`
        )
        return resolve ({ startTime, endTime })
      } catch (error){
        return reject (error);
      }
     });
    }
}

// Implementation needed
interface ShipmentUpdateListenerInterface {
    receiveUpdate(id: string, shipmentData : any): object 
}

class ShipmentUpdateListener implements ShipmentUpdateListenerInterface {
     receiveUpdate(id: string, shipmentData: any) {
        return new Promise( async(resolve, reject) => {
          try {
            let shipment =  new ShipmentSearchIndex();
            const update = await shipment.updateShipment(id, shipmentData);
            return resolve({ message:'Shipment Updated !', id, shipmentData, updateTime: update });
          } catch (error){
            return reject(error);
          }
      });
    }
}

class ShipmentDataSender {
    sendShipmentData() {
        return new Promise( async(resolve, reject) => {
            try {
              return resolve(SHIPMENT_DATA);
            } catch (error){
              return reject(error);
            }
        });
    }
}

export { ShipmentUpdateListener, ShipmentDataSender };