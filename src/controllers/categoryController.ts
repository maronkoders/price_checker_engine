import {Request , Response} from 'express';
import {getRepository, getManager} from  'typeorm';
import {ProductCategory} from "../entities/ProductCategory";
import {validate} from "class-validator";

export const getCategories = async (req: Request,res :Response ): Promise<Response> => {
  const categories =  await getRepository(ProductCategory).find();
  return (categories.length > 0) ? res.json({"status":200 ,"data":categories}) :res.json("Empty records");
}

export const createCategory = async (req: Request,res :Response ): Promise<Response> => {
    const newRecord =  getRepository(ProductCategory).create(req.query);
    const result = await getRepository(ProductCategory).save(newRecord).catch((err)=>{
      return res.json({"status":err.errno,"message":err.sqlMessage});
    })
    return (result) ? res.json({"status":200 ,"message":"New record was created"}) : res.json("Failed to create a record");
  }

  export const getCategory = async (req: Request,res :Response ): Promise<Response> => {    
    const userRecord =  await getRepository(ProductCategory).findOne(req.params.id);
    return (userRecord) ? res.status(200).json({"status":200,"record":userRecord}): res.status(404).json("No record found");
  }

  export const updateCategory = async (req: Request,res :Response ): Promise<Response> => {    
    const userRecord =  await getRepository(ProductCategory).findOne(req.params.id);
     if(userRecord) {
        getRepository(ProductCategory).merge(userRecord,req.query);
        await getRepository(ProductCategory).save(userRecord);
      return  res.json({'status':200,"message": "Record was updated"})
     } 
    return res.status(404).json("No record found");
  }

  export const deleteCategory = async (req: Request,res :Response ): Promise<Response> => {    
      try{
         const result =  await getRepository(ProductCategory).delete(req.params.id);
         return (result.affected == 1) ? res.status(204).json({"status":204,"message":"User record was deleted"}): res.json("Failed to delete a record")
      }catch(err)
      {
        return res.status(500).json({"status":500 ,"message":"failed to delete a record"})
      }
  }