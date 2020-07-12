const express = require("express");
const cors = require("cors");
const axios=require('axios');
const bodyparser = require('body-parser');
const { response } = require("express");
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static('compiler/build'))
app.listen(process.env.PORT||9000, function(){
    console.log("server started at port 9000")
})


app.post('/',function(req,res){
    console.log("hibaddu");
    const datas=req.body;
    console.log(datas)
    axios.post("https://api.jdoodle.com/v1/execute",datas)
    .then(response=>res.json(response.data))
})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'compiler','build','index.html'))
})
