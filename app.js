const express=require('express');
const hbs=require('hbs')
const expressHbs=require('express-handlebars')

const app=express();
const port=3000;

hbs.registerPartials(__dirname + "/views/partials")

app.engine("hbs",expressHbs.engine({
    layoutsDir:__dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'layout',
    extname:'hbs',
    }
))
app.set('view engine','hbs')

app.use("/",function(req,resp){
    resp.render("main.hbs")
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});