let dbConn = require('../models/db.connection') ;
let customerCntrl = require('./customer.controller') ; 
let productsCntrl = require('./products.controller') ;
let ObjectId = require('mongodb').ObjectId ; 


 module.exports.addbill = async function(req,res,next){

    //inside body the required fields are 1. product name 2. username 3. quantity
    let qbody = req.body ;
    console.log(req.body);
    
    // 1. check if the product is available if not tell that transaction is not possible
    // 2. check if the user is available if not add if present get his ObjectId 
    // 3. add the product and user object id to bills collection and add bills objectId to the others
   
    // checking if the product is available

      var productDetails = await getproduct(qbody.pname) ; //pname = product name
      var customerDetails = await getcustomer(qbody.cname) ; // cname = customer name
      await finishinsertion(res , productDetails , customerDetails)
      console.log(productDetails);
      console.log(customerDetails);
      console.log("finished those 2 await functions");
      
      var  customer_id  ;
      var  product_id ; 

      function finishinsertion(res,productDetails , customerDetails){
        if(productDetails.name){
            if(customerDetails.name){
                customer_id = customerDetails['_id'] ;
                product_id = productDetails['_id'] ;
                let insertionObject = {
                    customer_id :customer_id ,
                    product_id : product_id ,
                    quantity : qbody.quantity
                }
                insertBill(insertionObject , billscollection , res) ;
            }else{
                res.status(200).send("first add the user") ; 
                // first add the user and then get his object id and then bill 
            }
      }else{
          res.status(404).send('sorry this product is not available')
      }
      }
 
    } ;


    function insertBill(insertObj ,collection , res){
        collection.insertOne(insertObj,(err,dbres)=>{
            res.status(200).json(dbres) ;
        })
    }





  function getproduct(searchname){
    let collection = dbConn.get().db('shopdb').collection('products');
        let query = {name:searchname}
        if(searchname){
            collection.findOne(query,(err,dbres)=>{
                if(err){
                    console.log('some problem in getting the data');
                    return null ;
               
                }else{
                    console.log('success dbres' );
                    console.log(dbres)
                    return dbres ;
                }
            })
            }else{
                console.log('please enter the valid product name');
                return null ;
            }
        } ;



function getcustomer(searchname){
            let collection = dbConn.get().db('shopdb').collection('customers');
            let query = {name:searchname}
            if(searchname){
                collection.findOne(query,(err,dbres)=>{
                    if(err){
                        console.log('some problem in getting the data');
        
                    }else{
                        console.log('successful retrieval operation ');
                        console.log(dbres);
                        
                        return dbres ;
                    }
                })
                }else{
                    console.log('please enter a valid customer name');
                    }
            } ;




  



  