import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UserProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare bio: string

  @column()
  declare telephone: string

  @column()
  declare email: string

  @column()
  declare address: string

  @column()
  declare pays: string

  @column()
  declare ville: string

  @column()
  declare code_postal: string

  @column()
  declare user_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}