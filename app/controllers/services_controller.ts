import Service from '#models/service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ServicesController {
    
    //  TODO :  Create Service for more reusable code   -   fabienrak


    public async getServiceList({ response }: HttpContext){
        try {
            const service = await Service.all()
            return response.ok({
                "status":200,
                "message":"SERVICE DISPONIBLE",
                "data": {
                    service
                }
            })
        } catch(error){
            return response.internalServerError({
                "status":   500,
                "message":  error
            })
        }
    }

    public async findOneService({params, response}: HttpContext){
        try {
            const oneService = await Service.find(params.id);
            if(!oneService){
                return response.notFound({
                    "status": 404,
                    "message":  "SERIVCE NON TROUVE"
                })
            }
            return response.ok({
                "status": 200,
                "message":  "SERVICE TROUVER",
                "data": {
                    oneService
                }
            })
        } catch(error){
            return response.internalServerError({
                "status": 500,
                "message": error
            })
        }
    }
}