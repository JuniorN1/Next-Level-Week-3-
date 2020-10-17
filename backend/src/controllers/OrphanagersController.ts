import {Request,Response} from 'express';
import {getRepository} from 'typeorm';
import Orphanage from './../models/Orphanage';
import OrphanageView from './../views/orphanages_view';
import * as Yup from 'yup';
export default{
    async show(request : Request, response : Response){
        const {id} = request.params;
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(id,{
            relations:['images']
        });
        return response.json(OrphanageView.render(orphanage));
    },
    async index(request : Request, response : Response){
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.find({
            relations:['images']
        });
        return response.json(OrphanageView.renderMany(orphanage));
    },
    async create(request : Request, response : Response){
        const{            
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends, 
         } = request.body;
        const requestImage = request.files as Express.Multer.File[];
       const images = requestImage.map(image=>{
           return{
               path: image.filename
           }
       })
        const orphanagesRepository = getRepository(Orphanage);
        const newOrphanage = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends:open_on_weekends==='true',
            images
        };
        console.log(newOrphanage);
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.string().required(),
            longitude:Yup.string().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours:Yup.string().required(),
            open_on_weekends:Yup.string().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                 })
            )
        });
  
        await schema.validate(newOrphanage,{
            abortEarly:false,
        });
      
        const orphanage = orphanagesRepository.create(newOrphanage);
        try{
        await orphanagesRepository.save(orphanage);
        }catch(errorinfor){
            console.log({errorinfor});
            return response.json(errorinfor);
        }
        return response.status(201).json(orphanage);
     
    }

}
