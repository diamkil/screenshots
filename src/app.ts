import express from 'express';
const minify = require('express-minify-html-2');
import getImageInfo from './lib/getImageInfo';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 8757;

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

app.get('/', (req, res) => {
  fs.readFile(
    path.join(process.cwd(), '/public/raw/title.txt'),
    'utf8',
    (err, data) => {
      res.render('../views/index.ejs', {
        title: data,
      });
    },
  );
});

app.get('/:time', (req, res) => {
  const imageInfo = getImageInfo(req.params.time);
  fs.readFile(
    path.join(process.cwd(), '/public/raw/title.txt'),
    'utf8',
    (err, data) => {
      res.render('../views/image.ejs', {
        imageInfo: imageInfo,
        title: data,
      });
    },
  );
});

app.post('/addImage', (req, res) => {});

app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`);
});
