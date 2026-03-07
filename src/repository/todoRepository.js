const fp = require('fastify-plugin');
class TodoRepository {
    constructor(db) {
        this.db = db;
    }

    async getAll() {
        return this.db.todos;
    }

    async create(todotext) {
        const todoList = this.db.todos;
        this.db.todos.push({
            text: todotext,
            id: todoList.length
        })
        return this.db.todos;
    }

    async getOne(id) {
        console.log(this.db.todos)
        return this.db.todos.find(todo => todo.id == id);
    }

    async deleteOne(id) {
      console.log(this.db.todos)
      return this.db.todos.findByIdAndDelete(todo => todo.id == id);

    }

    async deleteAll() {

    }
}

async function todoRepository(fastify, options) {
    const { db } = fastify;
    const repo = new TodoRepository(db);
    fastify.decorate('todoRepository', repo);

}

module.exports = fp(todoRepository);