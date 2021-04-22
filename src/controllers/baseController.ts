import {Request , Response} from 'express'
import {getRepository} from  'typeorm'

// export const createNewRecord  = async(req:Request,res:Response) : Promise<Response> => {
    
// }


// export const getRecords = async (req: Request,res :Response ): Promise<Response> => {
//   const users =  await getRepository(User).find();
//   return res.json(users);
// }

// export const createNewRecord = async (req: Request,res :Response ): Promise<Response> => {
//     const newRecord =  getRepository(User).create(req.body);
//     const result = await getRepository(User).save(newRecord)
//     return res.json(result);
//   }