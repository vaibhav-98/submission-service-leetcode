const fp = require('fastify-plugin')
const apiRouter = require('./routers/apiRouter')
const db = require('./db/index')
const todoRepository = require('./repository/todoRepository')
const todoService = require('./services/servicePlugin')

async function app(fastify, option) {
                                        
   await fastify.register(db)
   await fastify.register(todoRepository)
   await fastify.register(todoService)
   await fastify.register(apiRouter , {prefix: '/api'})
}


module.exports = fp(app)