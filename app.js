const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let items = ["make your bed"];
let workItems =[];
app.set("view-engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("css"));
app.get("/", function(req,res){
    var today =  new Date();
    
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list.ejs", {listTitle: day, newListItems: items});
})

app.post("/", function(req,res){
    let item = req.body.newItem;

    if(req.body.list === "work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req,res){
    res.render("list.ejs", {listTitle: "work list", newListItems: workItems});
})

app.listen(3000, function(){
    console.log("server is successfully running on local port 3000");
});