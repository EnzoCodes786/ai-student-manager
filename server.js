require('@dotenvx/dotenvx').config()
const app = require('./src/app')
const PORT = process.env.SERVER_PORT || 4000

    console.log("HOST:", process.env.SMTP_HOST);
console.log("USER:", process.env.SMTP_USER);
console.log("PASS:", process.env.SMTP_PASS?.slice(0, 5));
app.listen(PORT,()=>{
    console.log('server is running at : http://localhost:4000')
})