const express = require('express')
const session = require('session')
const exphbs = require('express-handlebars')

const app = express()
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Tech blog secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  
app.use(session(sess));


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    sequelize.sync({ force: false });
  });