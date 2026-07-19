require('@dotenvx/dotenvx').config()
const app = require('./src/app')
const PORT = process.env.SERVER_PORT || 4000

app.listen(PORT,()=>{
    console.log('server is running at : http://localhost:4000')
})