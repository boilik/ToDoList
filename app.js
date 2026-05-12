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

app.use("/",function(req,resp){
    resp.render("main")
})



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});