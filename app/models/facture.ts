import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@adonisjs/lucid/orm'
import Service from './service.js'

export default class Facture extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ref_facture: string
  
  @column()
  declare status: string

  @column()
  declare date_debut: string

  @column()
  declare date_fin: string

  //  One to one User
  @column()
  declare proprietaire: number
  
  @column()
  declare client: number

  //  One to many Service
  @hasMany(() =>  Service)
  public service: HasMany<typeof Service>

  @column()
  declare quantite: number

  @column()
  declare montant_total:  number

  @column()
  declare notes:  string

  @column()
  declare remise: number

  @column()
  declare taxes:  number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}