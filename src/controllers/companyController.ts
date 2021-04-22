import {Request , Response} from 'express';
import {getRepository, getManager} from  'typeorm';
import {Company} from "../entities/Company";

export const getCompanies = async (req: Request,res :Response ): Promise<Response> => {
  const companies =  await getRepository(Company).find();
  return (companies.length > 0) ? res.json({"status":200 ,"companies":companies}) :res.json("Empty records");
}

export const createCompany = async (req: Request,res :Response ): Promise<Response> => {
    const newRecord =  getRepository(Company).create(req.query);
    const result = await getRepository(Company).save(newRecord).catch((err)=>{
      return res.json({"status":err.errno,"message":err.sqlMessage});
    })
    return (result) ? res.json({"status":200 ,"message":"New company record was created"}) : res.json("Failed to create a record");
  }

  export const getCompany = async (req: Request,res :Response ): Promise<Response> => {    
    const companyRecord =  await getRepository(Company).findOne(req.params.id);
    return (companyRecord) ? res.status(200).json({"status":200,"record":companyRecord}): res.status(404).json("No record found");
  }

  export const updateCompany = async (req: Request,res :Response ): Promise<Response> => {    
    const companyRecord =  await getRepository(Company).findOne(req.params.id);
     if(companyRecord) {
        getRepository(Company).merge(companyRecord,req.query);
        await getRepository(Company).save(companyRecord).catch((err)=>{
            return res.json({"status":err.errno,"message":err.sqlMessage});
        });
      return  res.json({'status':200,"message": "Record was updated"})
     } 
    return res.status(404).json({"status":404,"message":"Failed to update, because no such record exists"});
  }

  export const deleteCompany = async (req: Request,res :Response ): Promise<Response> => {    
      try{
         const result =  await getRepository(Company).delete(req.params.id);
         return (result.affected == 1) ? res.status(204).json({"status":204,"message":"Company record was deleted"}): res.json({"status":404,"message":"Company record was deleted already"})
      }catch(err)
      {
        return res.status(500).json({"status":500 ,"message":"failed to delete a record"})
      }
  }