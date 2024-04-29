const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( () => {
    console.log("DB connection is successful..🆗");
}).catch( (e) => {
    console.log("error ❌");
});