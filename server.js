require('@dotenvx/dotenvx').config()
const app = require('./src/app')
const PORT = process.env.SERVER_PORT || 4000
const redis = require("./src/config/redis");

app.listen(4000, "0.0.0.0", () => {
    console.log("server is running at: http://localhost:4000");
});