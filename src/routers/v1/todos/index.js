const { getAllTodos, createTodo, getOneTodo, getOneAndDelete } = require("../../../controllers/todoController")

async function todoRouter(fastify, option) {
     fastify.get('/', getAllTodos)
     fastify.post('/', createTodo)
     fastify.get('/:id', getOneTodo)
     fastify.delete('/:id', getOneAndDelete)
}

module.exports = todoRouter
