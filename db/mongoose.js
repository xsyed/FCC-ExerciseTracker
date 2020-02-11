const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/exercise',{
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(v => {
    console.log('Successfully connected to DB')
}).catch(err => {
    console.log('Failed to connect to MongoDB')
    process.exit(1);
})