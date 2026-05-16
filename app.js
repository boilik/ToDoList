const express=require('express');
const expressHbs=require('express-handlebars')

const app=express();
const port=3000;

app.engine("hbs",expressHbs.engine({
    layoutsDir:__dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'layout',
    extname:'hbs',
    }
))

app.use(express.static(__dirname + '/public'));
app.set('view engine','hbs')

app.get("/",function(req,resp){
    resp.render("main")
})
app.get("/calendar",function(req,resp){
    resp.render("calendar")
})

app.get("/statistics",function(req,resp){
    resp.render("statistics")
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});