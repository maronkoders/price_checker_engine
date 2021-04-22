
import {Request , Response} from 'express';
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');
let loader = new TwingLoaderFilesystem('./dist/views');
let twing = new TwingEnvironment(loader);

export const index = async(req:Request,res:Response) => {

    twing.render('index.twig', {'name': 'World'}).then((output:any) => {
        res.end(output);
    });
  //  return res.send("Welcome to Savemo APIs v1.0.0");

    //return res.render
    //return res.render('../views/index.twig');
}


