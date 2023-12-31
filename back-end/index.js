//SERVER SIDE CODE:

const express = require('express')
const app = express();

const mongoose = require('mongoose')
const blogModel = require('./models/blogs')

const cors = require('cors')
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/petArcadia');


//Routes here:
//Returns the blog

app.get('/getblogs', async (req, res) => {
    blogModel.find()
        .then(blog => res.json(blog))
        .catch(err => res.json(err))
})

app.post('/addblog', async (req, res) => {
    const title = req.body.title;
    const authorname = req.body.authorname;
    const description = req.body.description;
    console.log("BEFORE SAVING")

    blogModel.create({ title, authorname, description })
        .then(blog => res.json(blog))
        .catch(error => res.json(error))
});


app.get('/blogdetails/:id', async (req, res) => {
    const { id } = req.params;
    blogModel.findById(id)
        .then(blog => res.json(blog))
        .catch(err => res.json(err))
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
})
