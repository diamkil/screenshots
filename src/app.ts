import express from 'express';
import path from 'path';
import fileUpload, { UploadedFile } from 'express-fileupload';
import bodyParser from 'body-parser';

import FileInfo from './lib/FileInfo';
const config = require('../config');

const app = express();
const port = process.env.PORT || 8757;

const configKey = process.env.KEY || config.key;
const siteTitle = process.env.TITLE || config.title;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ createParentPath: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('../views/index.ejs', {
    title: siteTitle,
  });
});

app.post('/addFile', (req, res) => {
  if (!req.files || !req.files.file) {
    res.status(400);
    res.send('No files sent!');
  } else if (req.query.key != configKey) {
    res.status(403);
    res.send('Key is Invalid!');
    console.warn(`Request with bad key! Key used: '${req.query.key}'`);
  } else {
    let uploadedFile = req.files.file as UploadedFile;

    let ext = /(?:\.([^.]+))?$/.exec(uploadedFile.name)[1];

    let file: FileInfo = new FileInfo(ext);

    let imageStorage = path.join(
      process.cwd(),
      'public',
      'raw',
      file.year,
      file.month,
      file.day,
      file.fileName(),
    );

    uploadedFile.mv(imageStorage);

    res.send(file.fullFileName());
    console.log(`File ${imageStorage} created!`);
  }
});

app.get('/:time', (req, res) => {
  let ext = /(?:\.([^.]+))?$/.exec(req.params.time)[1];
  let fileName = req.params.time.substring(
    0,
    req.params.time.length - ext.length - 1,
  );

  let file: FileInfo = new FileInfo(ext, fileName);
  res.render('../views/image.ejs', {
    fileInfo: file,
    title: siteTitle,
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
