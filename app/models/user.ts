import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import UserProfile from './profil.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { HttpContext } from '@adonisjs/core/http'


const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare full_name: string | null

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @hasOne(()  =>  UserProfile)
  declare profile: HasOne<typeof UserProfile>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn:  '1 days',
    prefix: crypto.randomUUID(),
    tokenSecretLength:  250
  })



  /* @beforeSave()
  public static async hashPassword(user:  User){
    if(user.$dirty.password){
      user.password = await Hash.make(user.password);
    }
  } */

}
