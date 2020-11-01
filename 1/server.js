var express = require("express");
var app     = express();
var fs      = require("fs");


// this is the JSON data
var jsonData = {count:12,message:"hey"}

app.get("/",(req,res)=>{
    fs.readFile("index.html",(err,buffer)=>{
        //console.log(buffer);
        var html = buffer.toString();
        //console.log(html);
        // if you dont set the header
        // this will download
        // not show
        res.setHeader("Content-Type",'text/html');
        res.send(html);
    })
})


// this is the simpler way
app.get("/simple",(req,res)=>{
    res.sendFile(__dirname+'/index.html',(err)=>{
        if(err){
            console.log(err);
        }
    });

});


//json response
// added nodemon
app.get("/data",(req,res)=>{
    res.json(jsonData);

})



app.listen(3000,()=>{
    console.log("Server started");
});