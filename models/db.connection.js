let MongoClient = require('mongodb').MongoClient ;

const dbURL =  'mongodb://shopdbUser:ruyam@127.0.0.1:27017/shopdb' ;
let CONFIG = require('../config/index')
var connection = null ; 

function open(){
    MongoClient.connect(dbURL,{AuthSource:'shopdb'},(err,client)=>{
        if(err){
            console.log('bro error in connecting to the database ');
            
        }else{
            connection = client ; 
            console.log('yo bro! connection to the database successful ');
        }
    })
}

function get(){
    if(connection!=null){
        return connection ; 
    }else{
        console.log('connection is still null ');
        
    }
}

module.exports = {
    open : open , 
    get : get 
}