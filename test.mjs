import puppeteer from "puppeteer";
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
import path from "node:path"

var fs = require('fs');


const __dirname = "C:/Users/headl/Desktop/snapshot/"

var express = require('express');
var app = express();

const cors = require('cors');

const bodyParser = require('body-parser');

app.use(cors(), express.json());


app.set('trust proxy', true)

app.get('/snap', async function (req, res){
  try{

  console.log(req.query)

  await makeScreenShot(req.query.url,req.query.name)

  let fullPath = path.join(__dirname, "snapshots/" + req.query.name + ".png")

    res.sendFile(fullPath, () => {
      fs.unlink(fullPath, () => {
        console.log("file removed")
      })
    })

 

  
}
catch(e){
  console.log("error occured")
  console.log(e)
  res.send("error occured")
}

})

async function makeScreenShot(url, name) {

  let browser = await puppeteer.launch({
    defaultViewport: {
      width: 1280,
      height: 2000,
    },
  })

  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: "snapshots/" + name + ".png" });
  await browser.close();
}

app.listen(80, function () {
  console.log("now listening on port 80")
});


