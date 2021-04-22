import {Request , Response} from 'express'
import {getRepository} from  'typeorm'
import {User} from "../entities/User";
//import {createNewRecord , getRecords} from "../controllers/baseController"; 

export const getUsers = async (req: Request,res :Response ): Promise<Response> => {
  const users =  await getRepository(User).find();
  return (users.length >0) ?res.json({"status":200 ,"data":users}) :res.json("Empty records");
}

export const newUser = async (req: Request,res :Response ): Promise<Response> => {

    console.log("errors", req.query);

    const newRecord =  getRepository(User).create(req.query);
    const result = await getRepository(User).save(newRecord)
    return (result) ? res.json({"status":200 ,"message":"New record was created"}) : res.json("Failed to create a record");
  }

  export const getUser = async (req: Request,res :Response ): Promise<Response> => {    
    const userRecord =  await getRepository(User).findOne(req.params.id);
    return (userRecord) ? res.status(200).json(userRecord): res.status(404).json("No record found");
  }

  export const updateUser = async (req: Request,res :Response ): Promise<Response> => {    
    const userRecord =  await getRepository(User).findOne(req.params.id);
     if(userRecord) {
        getRepository(User).merge(userRecord,req.query);
        await getRepository(User).save(userRecord);
      return  res.json({'status':200,"message": "Record was updated"})
     } 
    return res.status(404).json("No record found");
  }

  export const deleteUser = async (req: Request,res :Response ): Promise<Response> => {    
      try{
         const result =  await getRepository(User).delete(req.params.id);
        return result?res.status(204).json("User record was deleted"): res.json("Failed to delete a record")
      }catch(err)
      {
        return res.status(500).json({"status":500 ,"message":"failed to delete a record"})
      }
  }