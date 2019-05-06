const { EntitySchema } = require('typeorm')
const Category = require('../models/Category')
const Binding = require('../models/Binding')
const User = require('../models/User')

module.exports = new EntitySchema({
  target: Category,
  tableName: 'categories',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: true
    },
    name: {
      type: 'varchar',
      unique: true
    },
    color: {
      type: 'varchar'
    },
    weight: {
      type: 'integer'
    },
    created_at: {
      type: 'datetime'
    },
    updated_at: {
      type: 'datetime'
    }
  },
  relations: {
    user: {
      target: () => User,
      type: 'many-to-one',
      joinColumn: true,
      inverseSide: 'categories'
    },
    bindings: {
      target: () => Binding,
      type: 'many-to-many',
      joinTable: {
        name: 'bindings_categories',
        joinColumn: {
          name: 'category_id',
          referencedColumnName: 'id'
        },
        inverseJoinColumn: {
          name: 'binding_id',
          referencedColumnName: 'id'
        }
      }
    }
  }
})
