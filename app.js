const express=require('express');
const hbs=require('hbs')
const app=express();
const port=3000;
hbs.registerPartials(__dirname+"/views/partials")


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/",function(req,resp){
    resp.render("main.hbs")
})