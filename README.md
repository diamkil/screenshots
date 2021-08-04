# Screenshots

A webpage to see your screen shots, similar to prnt.sc

# [Docker](https://github.com/diamkil/Screenshots/pkgs/container/screenshots) (recommended)

```
docker run -d \
  -p 8757:8757/tcp \
  -v /path/to/images:/app/public/raw \
  -e KEY=(API Key of your choosing) \
  -e TITLE=(site title) \
  ghcr.io/diamkil/screenshots:main
```

# Node.JS

This app uses Node.JS. To run it on your machine directly, you'll need to compile it.

## Compiling

```
git clone https://github.com/diamkil/screenshots
cd screenshots
yarn install (or npm i)
yarn build (or npm run build)
```

## Running

`node .` (use in the directory where screenshots is located)  
Change the Key and Site Title in config.js

## Where do images go?

They go in public/raw/(year)/(month)/(day)/(hour)(minute)(second).png

# Adding Images

You can use ShareX or manually add them, I'll only cover ShareX here

1. Create a Custom Uploader in ShareX
2. Use this template and change the values accordingly
   ![ShareX Settings](https://i.dkil.ca/raw/2021/08/03/225533.png)
