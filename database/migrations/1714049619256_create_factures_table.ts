import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'factures'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('reference_facture').unique()
      table.integer('status')
      table.string('date_debut')
      table.string('date_fin')
      table.integer('proprietaire_id')
      table.integer('client_id')
      table.integer('service_id')
      table.integer('quantite')
      table.string('montant_total')
      table.string('notes')
      table.integer('remise')
      table.integer('taxes')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}