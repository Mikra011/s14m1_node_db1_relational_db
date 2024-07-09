const db = require('../../data/db-config')

async function checkId(req, res, next) {
  const shipper = await db('shippers').where('shipperid', req.params.id).first()
  if (!shipper) {
    next({ status: 404, message: 'that id does not exists'})
  } else {
    next()
  }
}

function checkPayload(req, res, next) {
  if (!req.body.phone || !req.body.shippername) {
    next({ status: 422, message: 'Phone and shippername are required'})
  } else {
    next()
  }
}

module.exports = {
  checkId,
  checkPayload,
}
