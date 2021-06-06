
const path = require('path');
const express = require("express")
const hbs = require('express-handlebars');
const app = express()
const data = require("./data/data.json")
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: {
        formatPrice: function(price){
            return `${price.toFixed(2)} $`;
        }
    }
}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
    let categories = data.items.map((book) => {
        return book.category
    });
    let names = data.items.map((book) =>{
        return book.title[0];
    });

    categories = [...new Set(categories)];
    names = [...new Set(names)];

    res.render('index', {
        books: data.items,
        header: "cw01",
        categories: categories,
        names: names
    });
    })

app.get('/filtered/', (req, res) => {

    const filtered = data.items.filter((book) => {
        return book.title[0] == req.query.f;
    });
    res.render('second',{
        books: filtered
    });

})


//nasłuch na określonym porcie
app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})