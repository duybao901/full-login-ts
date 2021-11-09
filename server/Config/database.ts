import mongoose from 'mongoose'

const URI = process.env.MONGODB_URL

const option = {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(`${URI}`, option, (err) => {
    if (err) throw err;
    console.log('Mongodb connection')
})
