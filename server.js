let express = require('express');
let app = express();
var CONFIG = require('./config') ;
var bodyParser = require('body-parser');
require('./models/db.connection').open() ;

var customerRoute = require('./routes/customer.routes')
var productRoute = require('./routes/products.routes') 
var billsRoute = require('./routes/bills.routes') 


app.use(bodyParser()) ; 
app.use(bodyParser.urlencoded({extended:true})) ;
app.use(customerRoute) ;
app.use(productRoute) ;
app.use(billsRoute) ;



app.listen(CONFIG.PORT,CONFIG.HOST,(err)=>{
  if(err){
      console.log('some error while starting the server :' +err );
  }else{
      console.log(`server started on port ${CONFIG.PORT} and host ${CONFIG.HOST}` );   
  } 
})