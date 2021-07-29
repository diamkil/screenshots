import express from 'express';
const minify = require('express-minify-html-2');
import getImageInfo from './lib/getImageInfo';

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
  res.render('../views/index.ejs', {
    title: "diamkil's IMG Share",
  });
});

app.get('/:time', (req, res) => {
  const imageInfo = getImageInfo(req.params.time);
  res.render('../views/image.ejs', {
    imageInfo: imageInfo,
    title: "diamkil's IMG Share",
  });
});

app.post('/addImage', (req, res) => {});

app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`);
});
