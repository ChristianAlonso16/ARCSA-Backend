const { taskRouter } = require('./task/task.controller');
const { authRouter} = require('./auth/auth.controller');
module.exports = {
taskRouter,authRouter
}