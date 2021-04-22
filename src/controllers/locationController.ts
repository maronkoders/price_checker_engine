import {Request , Response} from 'express';
import {getRepository} from  'typeorm';
import {Location} from "../entities/Location";

export const getLocations = async (req: Request,res :Response ): Promise<Response> => {
  const locations =  await getRepository(Location).find();
  return (locations.length > 0) ? res.json({"status":200 ,"locations":locations}) :res.json("Empty records");
}

export const createLocation = async (req: Request,res :Response ): Promise<Response> => {
    const newRecord =  getRepository(Location).create(req.query);
    const result = await getRepository(Location).save(newRecord).catch((err)=>{
      return res.json({"status":err.errno,"message":err.sqlMessage});
    })
    return (result) ? res.json({"status":200 ,"message":"New Location record was created"}) : res.json("Failed to create a record");
  }

  export const getLocation = async (req: Request,res :Response ): Promise<Response> => {    
    const LocationRecord =  await getRepository(Location).findOne(req.params.id);
    return (LocationRecord) ? res.status(200).json({"status":200,"record":LocationRecord}): res.status(404).json("No record found");
  }

  export const updateLocation = async (req: Request,res :Response ): Promise<Response> => {    
    const LocationRecord =  await getRepository(Location).findOne(req.params.id);
     if(LocationRecord) {
        getRepository(Location).merge(LocationRecord,req.query);
        await getRepository(Location).save(LocationRecord).catch((err)=>{
            return res.json({"status":err.errno,"message":err.sqlMessage});
        });
      return  res.json({'status':200,"message": "Record was updated"})
     } 
    return res.status(404).json({"status":404,"message":"Failed to update, because no such record exists"});
  }

  export const deleteLocation = async (req: Request,res :Response ): Promise<Response> => {    
      try{
         const result =  await getRepository(Location).delete(req.params.id);
         return (result.affected == 1) ? res.status(204).json({"status":204,"message":"Location record was deleted"}): res.json({"status":404,"message":"Location record was deleted already"})
      }catch(err)
      {
        return res.status(500).json({"status":500 ,"message":"failed to delete a record"})
      }
  }