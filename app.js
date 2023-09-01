import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const dailyList = [];
const workList = [];

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        listName: "Daily List",
        listItems : dailyList
    });
});

app.get("/work", (req, res) => {
    res.render("index.ejs", {
        listName : "Work",
        listItems : workList
    })
})

app.post("/", (req, res) => {
    const taskName = req.body.inputText;
    const typeOfList = req.body.type;


    if (typeOfList === "Work") {
        workList.push(taskName);
        res.redirect("/work");
    } else {
        dailyList.push(taskName);
        res.redirect("/");
    }
    
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})