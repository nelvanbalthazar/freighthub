import express, {Request, Response, NextFunction} from 'express';
import { json } from 'body-parser';
import shipmentRoutes from './routes/shipment';

const app = express();

app.use(json());

app.use('/shipment', shipmentRoutes);
app.use((err:Error, req:Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
});
app.listen(3000, () => {
        console.log('Freighthub Coding Challenge - App listening on port 3000')
    }
);
