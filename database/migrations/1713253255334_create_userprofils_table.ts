import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'userprofils'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('bio')
      table.string('telephone')
      table.string('email')
      table.string('address')
      table.string('pays')
      table.string('ville')
      table.string('code_postal')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE') // delete profile when user is deleted
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}