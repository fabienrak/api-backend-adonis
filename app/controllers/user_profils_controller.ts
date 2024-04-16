// import type { HttpContext } from '@adonisjs/core/http'

import UserProfile from "#models/profil";
import { HttpContext } from "@adonisjs/core/http";

export default class UserProfilsController {

    async createProfil({request, response}: HttpContext){
        /* try {
            
        } catch (error) {
            return response.internalServerError({
                "status":   500,
                "message":  error,
                "data": [
                    
                ]
            })
        } */

        const userProfile = request.all() as Partial<UserProfile>
            const user_profil = await UserProfile.create(userProfile)

            console.log("DATA ALEFA : " + user_profil);

            if (user_profil) {
                return response.created({
                    "status":   201,
                    "message":  "PROFIL CREER",
                    "data": {
                        user_profil
                    }
                })
            } else {
                return response.internalServerError({
                    "status":   500,
                    "message":  "UNE ERREUR EST SURVENUE"
                })
            }

    } 

}