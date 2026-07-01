const express = require('express')
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
const getUserRoutes = require('../src/routes/getUser.routes')
const userSignupRoutes = require('../src/routes/userSignup.routes')
const userLoginRoutes = require('../src/routes/userLogin.routes')
const uploadPfpRoutes = require('../src/routes/uploadPfp.routes')
const uploadPdfRoutes = require('../src/routes/uploadPdf.routes')
const chatBotRoutes = require('../src/routes/chatBot.routes')
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: function(origin, callback) {
        callback(null, true);
    }
}));

app.use('/auth',getUserRoutes);
app.use('/auth',userSignupRoutes);
app.use('/auth',userLoginRoutes);
app.use('/auth',uploadPfpRoutes);
app.use('/auth',uploadPdfRoutes);
app.use('/ai',chatBotRoutes);
module.exports = app;
