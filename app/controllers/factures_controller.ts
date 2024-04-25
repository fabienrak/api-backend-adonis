import Facture from '#models/facture'
import type { HttpContext } from '@adonisjs/core/http'

export default class FacturesController {
    
    //  TODO :  Create Service for more reusable code   -   fabienrak

    public async getFactureList({ response }: HttpContext){
        try {
            const factureList = await Facture.all()
            return response.ok({
                "status":200,
                "message":"LISTE FACTURE DISPONIBLE",
                "data": {
                    factureList
                }
            })
        } catch(error){
            return response.internalServerError({
                "status":   500,
                "message":  error
            })
        }
    }

    public async deleteFacture({ params, response }: HttpContext){
        try {
            const factureEffacer: any = await Facture.find(params.id)
            if(!factureEffacer){
                return response.notFound({
                    "status":   404,
                    "message":  "FACTURE NON TROUVE",
                })
            }
            await factureEffacer.delete()
            return response.ok({
                "status":   200,
                "message":  "FACTURE BIEN SUPPRIMER"
            })
        } catch(error){
            return response.internalServerError({
                "status":   500,
                "message":  error
            })
        }
    }

    public async findOneFacture({params, response}: HttpContext){
        try {
            const facture = await Facture.find(params.id);
            if(!facture){
                return response.notFound({
                    "status": 404,
                    "message":  "FACTURE NON TROUVE"
                })
            }
            return response.ok({
                "status": 200,
                "message":  "FACTURE EXISTANT",
                "data": {
                    facture
                }
            })
        } catch(error){
            return response.internalServerError({
                "status": 500,
                "message": error
            })
        }
    }

    public async createNewFacture({ auth, request, response }:  HttpContext) {

        try {
            const factureData = await request
            const newFacture = await Facture.create(factureData)

            
        } catch(error){
            return response.internalServerError({
                "status":   500,
                "message":  error
            })
        }
    }
}