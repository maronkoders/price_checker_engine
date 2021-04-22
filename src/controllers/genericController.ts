
import {Request , Response} from 'express';
import { Company } from '../entities/Company';
import {getRepository} from  'typeorm';
import { Location } from '../entities/Location';
import { Product } from '../entities/Product';



export const searchCity = async(req:Request,res:Response) => {

    const locationRecord = await getRepository(Location).findOne({where:{name:req.query.name}});
    const companies = await getRepository(Company).find({where:{locationId:locationRecord?.id}})
 
    const allproducts:object[] =[];
    let products =  companies.forEach( async (company) => {
       // console.Log("company products =>", await getRepository(Product).find({where: { companyId: company?.id}}));
        
        allproducts.push( getRepository(Product).find({where: { companyId: company?.id}}));
    });
   
    console.log("all Products",allproducts);

}
