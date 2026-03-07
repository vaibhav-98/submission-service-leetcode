const todoRouter = require('./todos/index')

async function v1Router(fastify, option) {
    
   fastify.register(todoRouter, {prefix: '/todos'})
}

module.exports = v1Router