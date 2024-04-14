import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare type: string

  @column()
  declare nombre: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}