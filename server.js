const express = require("express");
const fs = require("fs");
const path = require("path");

app = express();
app.set("view engine", "ejs");

app.use("/resurse", express.static(__dirname + "/resurse"));

console.log("Cale folder proiect", __dirname);

app.get("/", function(req, res, next){
    res.render("pagini/index", {eroare: false, ip: req.ip});
});

app.get("/home",function(req, res, next){
    res.render("pagini/index", {eroare: false, ip: req.ip});
});
app.get("/index", function(req, res, next){
    res.render("pagini/index", {title: 'WetNose - Adopția câinilor și pisicilor', eroare: false, ip: req.ip});
});
app.get("/despre",function(req, res, next){
    res.render("pagini/despre", {eroare: false});
});

app.get("/:page",function(req, res, next){
    const page = req.params.page;
    if(path.extname(page) === '.ejs') {
        fs.readFile('erori.json', (err, data) => {
            if (err) throw err;
            let erori = JSON.parse(data);
            res.status(403).render('pagini/eroare', erori["403"]);
        });
    } else {
        fs.access(`./views/pagini/${page}.ejs`, fs.constants.F_OK, (err) => {
            if (err) {
                fs.readFile('erori.json', (err, data) => {
                    if (err) throw err;
                    let erori = JSON.parse(data);
                    res.status(404).render('pagini/eroare', erori["404"]);
                });
            } else {
                res.render(`pagini/${page}`, {eroare: false});
            }
        });
    }
});
app.get('/index', function(req, res) {
    res.render('index.ejs', {title: 'WetNose - Adopția câinilor și pisicilor'});
});

app.listen(8080);
console.log("Serverul a pornit!");
