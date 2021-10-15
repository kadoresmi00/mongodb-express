const express = require("express");
const app = express();
const config = require("./config");
const PORT = config.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect(config.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
const users = require('./Shema/users.js');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index", { error: null });
});

app.post("/", async(req, res) => {
    const user = req.body.user;
    if (!user) return res.redirect("/404");
    await users.create({ name: user });
    res.render("index", { error: "Başarılı Bir Şekilde Kaydedildi!" });
});

app.get("/users", async(req, res) => {
    const datas = await users.find();
    res.render("users", {
        error: null,
        kado: datas.map(({ name }) => { return { name }; }),
    });
});


app.all("*", (req, res) => { return res.render("404"); });


app.listen(PORT, () => { console.log(`Site ${PORT}'da başlatıldı. http://localhost:${PORT}`); });