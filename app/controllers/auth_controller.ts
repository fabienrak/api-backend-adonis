import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {

    async register({  request, response  }: HttpContext){
        const payload = await request.validateUsing(registerValidator)
        const user = await User.create(payload)
        return response.created({
            "status":   201,
            "message":  "INSCRIPTION REUSSI",
            "data": {
                user
            }
        })
    }

    async login({request, response}: HttpContext){
        const {username, password}  =   await request.validateUsing(loginValidator)

        const user = await User.verifyCredentials(username, password)
        const token = await User.accessTokens.create(user)
        
        return response.ok({
            "status":   200,
            "message":  "LOGIN SUCCESSFUL",
            "data": {
                /* "token": {
                    "type": token.type,
                    "access_token": token.value!.release(),
                    "is_expire": token.isExpired,
                    "expiration":token.expiresAt
                }, */
                "token": token,
                "user_data": {
                    ...user.serialize()
                }
            }
        })
    }



}