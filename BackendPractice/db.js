const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/NotebookPractice'

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to Mongodb');
    } catch (error) {
        console.log('Not Connected to Mongodb')
    }
}

module.exports=connectToMongo