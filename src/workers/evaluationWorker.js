const { Worker } = require('bullmq');
const redisConnection = require('../config/redisConfig');
const axios = require('axios');

function evaluationWorker(queue) {
    new Worker('EvaluationQueue', async job => {
        if (job.name === 'EvaluationJob') {

            try {
                const response = await axios.post('http://localhost:3001/sendPayload', {
                    userId: job.data.userId,
                    payload: job.data
                })
               // console.log("this is respone",response);
                console.log(job.data);
            } catch(error) {
                console.log(error)
            }
        }
    }, {
        connection: redisConnection
    });
}

console.log("abc", evaluationWorker);


module.exports = evaluationWorker;




// const { Worker } = require('bullmq');
// const redisConnection = require('../config/redisConfig');
// const Submission = require('../models/submissionModels');
// const axios = require('axios');

// function evaluationWorker() {

//     console.log("🚀 Worker started...");

//     new Worker('EvaluationQueue', async job => {
//          if (job.name === 'EvaluationJob') {
//        console.log("🔥 Job received:", job.data);

//         const data = job.data;
// const submissionId = data.submissionId;

//         console.log("Processing submission:", submissionId);

//         try {
//             const response = await axios.post(
//                 'http://localhost:3001/sendPayload',
//                 data   // ✅ full payload
//             );

//             const result = response.data;

//             console.log("✅ Execution Result:", result);

//             let finalStatus = "Success";

//             if (result.status !== "SUCCESS") {
//                 finalStatus = "RE";
//             } else if (result.output.trim() !== data.outputCase.trim()) {
//                 finalStatus = "WA";
//             }

//             await Submission.findByIdAndUpdate(submissionId, {
//                 status: finalStatus,
//                 output: result.output
//             });

//         } catch (error) {
//             console.log("❌ Worker Error:", error.message);

//             if (error.response) {
//                 console.log("❌ Evaluator Error:", error.response.data);
//             }

//             await Submission.findByIdAndUpdate(submissionId, {
//                 status: "RE",
//                 error: error.message
//             });
//         }

//          }
//     }, {
//         connection: redisConnection
//     });
// }

// module.exports = evaluationWorker;