import express from 'express';
import path from 'path';
import fs from 'fs';
import {MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
console.log(__dirname);

const app = express()
const port = 8000
//here is a change
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));

app.use(express.static(path.join(__dirname, '../posters')));
//app.use(express.static("posters"));

const upload = multer({ dest: 'posters/' })

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
});

/*const movieData = JSON.parse(fs.readFileSync('./movies.json'));
console.log(movieData);
/*let movieData = [
    {"title":"Terminator 2"},
    {"title":"Rocky IV"},
    {"title":"Titanic"},
    {"title":"Die Hard"}
];*/

app.get('/api/movies', async (req, res) => {
    
    //res.json(movieData)
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('movie-data');

    const movieData = await db.collection('movies').find({}).toArray();
    console.log(movieData);
    res.json(movieData);

})

app.post('/api/review', upload.single('movie_poster'),  async (req,res) => {
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();

  const db = client.db('movie-data');


  const insertOperation = await db.collection('movies').insertOne( {'title':req.body.title, 'poster':req.file.filename});
  console.log(insertOperation);
  res.redirect('/');

    /*movieData.push( { "title":req.body.title })
    saveData();
    console.log("update movies called");
    console.log(req.body);
    res.redirect('/');*/
})


const saveData = () => {
  const jsonContent = JSON.stringify(movieData);
  fs.writeFile("./movies.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
    }
    console.log("JSON file has been saved.");
  });
}



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
