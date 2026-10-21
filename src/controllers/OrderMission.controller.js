import {generateOrderMission} from '../services/pdfService.js';
import {uploadOrderMission} from '../services/storage.service.js';
import { randomUUID } from "node:crypto";




export const createOrderMission = async(req, res, next) => {
     try{
        const { id } = req.params;
        // console.log(id); return;
        const bufferpdf = await generateOrderMission(id);

        const year = new Date().getFullYear();
        const s3Key = `orders/${year}/${id}-${randomUUID()}.PDF`;

        const metadata = await uploadOrderMission(bufferpdf, s3Key);

        return res.status(201).json({
            success: true,
            message:'Order de mission cree avec succes',
            data: metadata
        })

     }catch(err){
        next(err);
     }
}