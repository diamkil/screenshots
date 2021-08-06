import express from 'express';
const minify = require('express-minify-html-2');
import path from 'path';
import fileUpload, { UploadedFile } from 'express-fileupload';
import bodyParser from 'body-parser';

import getFileInfo from './lib/getFileInfo';
import fileNaming from './lib/fileNaming';
const config = require('../config');

const app = express();
const port = process.env.PORT || 8757;

const configKey = process.env.KEY || config.key;
const siteTitle = process.env.TITLE || config.title;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(
  minify({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true,
    },
  }),
);
app.use(fileUpload({ createParentPath: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('../views/index.ejs', {
    title: siteTitle,
  });
});

app.post('/addImage', (req, res) => {
  if (!req.files) {
    res.status(400);
    res.send('No files sent!');
  } else {
    // Check key first!

    let key = req.query.key;

    if (key == configKey) {
      let image = req.files.image as UploadedFile;

      let fileName = fileNaming();
      let imageStorage = path.join(
        process.cwd(),
        'public',
        'raw',
        fileName.year,
        fileName.month,
        fileName.day,
        fileName.fileName + '.png',
      );

      image.mv(imageStorage);

      let imageUrl =
        fileName.year +
        fileName.month +
        fileName.day +
        fileName.fileName +
        '.png';
      res.send(imageUrl);
      console.log(`File ${imageStorage} created!`);
    } else {
      res.status(403);
      res.send('Key is Invalid!');
      console.warn(`Request with bad key! Key used: '${req.query.key}'`);
    }
  }
});

app.post('/addVideo', (req, res) => {
  if (!req.files) {
    res.status(400);
    res.send('No files sent!');
  } else {
    // Check key first!

    let key = req.query.key;

    if (key == configKey) {
      let video = req.files.video as UploadedFile;

      let fileName = fileNaming();
      let videoStorage = path.join(
        process.cwd(),
        'public',
        'raw',
        fileName.year,
        fileName.month,
        fileName.day,
        fileName.fileName + '.png',
      );

      video.mv(videoStorage);

      let imageUrl =
        fileName.year +
        fileName.month +
        fileName.day +
        fileName.fileName +
        '.mp4';
      res.send(imageUrl);
      console.log(`File ${videoStorage} created!`);
    } else {
      res.status(403);
      res.send('Key is Invalid!');
      console.warn(`Request with bad key! Key used: '${req.query.key}'`);
    }
  }
});

app.get('/:time', (req, res) => {
  const fileInfo = getFileInfo(req.params.time);
  res.render('../views/image.ejs', {
    fileInfo: fileInfo,
    title: siteTitle,
  });
});

app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`);
});
