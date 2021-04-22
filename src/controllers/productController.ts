import {Request , Response} from 'express';
import {getRepository} from  'typeorm';
import {Product} from "../entities/Product";

export const getProducts = async (req: Request,res :Response ): Promise<Response> => {
  const products =  await getRepository(Product).find();
  return (products.length > 0) ? res.json({"status":200 ,"products":products}) :res.json("Empty records");
}

export const createProduct = async (req: Request,res :Response ): Promise<Response> => {

    const newRecord =  getRepository(Product).create(req.query);
    const result = await getRepository(Product).save(newRecord).catch((err)=>{
      return res.json({"status":err.errno,"message":err.sqlMessage});
    })
    return (result) ? res.json({"status":200 ,"message":"New record was created"}) : res.json("Failed to create a record");
  }

  export const getProduct = async (req: Request,res :Response ): Promise<Response> => {    
    const ProductRecord =  await getRepository(Product).findOne(req.params.id);
    return (ProductRecord) ? res.status(200).json(ProductRecord): res.status(404).json("No record found");
  }

  export const updateProduct = async (req: Request,res :Response ): Promise<Response> => {    
    const ProductRecord =  await getRepository(Product).findOne(req.params.id);
     if(ProductRecord) {
        getRepository(Product).merge(ProductRecord,req.query);
        await getRepository(Product).save(ProductRecord);
      return  res.json({'status':200,"message": "Record was updated"})
     } 
    return res.status(404).json("No record found");
  }

  export const deleteProduct = async (req: Request,res :Response ): Promise<Response> => {    
      try{
         const result =  await getRepository(Product).delete(req.params.id);
        return result?res.status(204).json("Product record was deleted"): res.json("Failed to delete a record")
      }catch(err)
      {
        return res.status(500).json({"status":500 ,"message":"failed to delete a record"})
      }
  }