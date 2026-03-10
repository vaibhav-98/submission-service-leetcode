const { createSubmission } = require("../../../controllers");

async function submissionRoutes(fastify, options) {
    fastify.post('/', createSubmission);
}

module.exports = submissionRoutes;