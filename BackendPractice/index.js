const express = require('express')
const connectToMongo=require('./db')
var cors = require('cors')

connectToMongo()
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
