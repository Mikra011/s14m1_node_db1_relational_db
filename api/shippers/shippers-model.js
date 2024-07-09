const db = require('../../data/db-config')

async function get() {
  // this is without knex, but it works. Not a good practice!!
  // const result = await db.raw('select * from shippers;') 
  const result = await db('shippers')
  // to select columns
  // .select('phone', 'shippername') 
  return result
}

async function getById(shipperId) {
  const result = await db('shippers').where('shipperId', shipperId)
  return result
}

async function create(shipper) {
  const [shipperId] = await db('shippers').insert(shipper)
  const result = await getById(shipperId)
  return result
}

async function update(shipperId, changes) {
  await db('shippers').update(changes).where('shipperid', shipperId)
  const result = await getById(shipperId)
  return result
}

async function remove(shipperId) {
  const toBeDeleted = await getById(shipperId)
  await db('shippers').del().where('shipperid', shipperId)
  return toBeDeleted
}


module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}