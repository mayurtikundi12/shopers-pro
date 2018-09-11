let dbConn = require('../models/db.connection')




    module.exports.getcustomers = (req,res,next)=>{
        let collection = dbConn.get().db('shopdb').collection('customers') ;
        let searchname = req.query.name ;
        let query = {} ;
                collection.find(query).toArray((err,dbres)=>{
                if(err){
                    console.log('some problem in getting the data');
                    res.status(200).send("some problem in getting the data" + err) ; 
    
                }else{
                    res.status(200).json(dbres)
                }
            })
    
        } ;


module.exports.getcustomer = (req,res,next)=>{
            let collection = dbConn.get().db('shopdb').collection('customers');
            let searchname = req.query.name ;
            let query = {name:searchname}
            if(searchname){
                collection.findOne(query,(err,dbres)=>{
                    if(err){
                        console.log('some problem in getting the data');
                        res.status(200).send("some problem in getting the data" + err) ; 
        
                    }else{
                        res.status(200).json(dbres)
                    }
                })
                }else{
                    res.status(404).send('please fill all the needed information ')
                }
            } ;


    module.exports.addcustomer = (req,res,next)=>{
        let collection = dbConn.get().db('shopdb').collection('customers');
        let qbody = req.body ;
        let insertObj = {name:qbody.name ,place:qbody.place,extrainfo:qbody.extrainfo,bills:qbody.bills }
        if(qbody && qbody.name && qbody.place && qbody.extrainfo && qbody.bills){
            collection.insertOne(insertObj,(err,dbres)=>{
                if(err){
                    console.log('some problem in inserting the data');
                    res.status(200).send("some problem in inserting the data" + err) ; 
    
                }else{
                    res.status(200).json(dbres)
                }
            })
    
        }else{
            res.status(400).send('please fill all the required fields')
        }
        } ;


        module.exports.updatecustomer = (req,res,next)=>{
            let collection = dbConn.get().db('shopdb').collection('customers');
            let qbody = req.body ;
            let filter = {name:qbody.name  }
            let updates = {} ;
            for (const key in qbody) {
                updates[key] = qbody[key] ;
            }
            let updatequery = {$set :updates}
            if(updates!={}){
                collection.updateOne(filter,updatequery,(err,dbres)=>{
                    if(err){
                        console.log('some problem in updating the data');
                        res.status(200).send("some problem in updating the data" + err) ; 
        
                    }else{
                        res.status(200).json(dbres)
                    }
                })
        
            }else{
                res.status(400).send('please fill all the required fields')
            }
            } ;




            module.exports.removecustomer = (req,res,next)=>{
                let collection = dbConn.get().db('shopdb').collection('customers');
                let qbody = req.body ;
                let filter = {name:qbody.name }

                if(qbody.name){
                    collection.deleteOne(filter,(err,dbres)=>{
                        if(err){
                            console.log('some problem in deleting the data');
                            res.status(200).send("some problem in deleting the data" + err) ; 
            
                        }else{
                            res.status(200).json(dbres)
                        }
                    })
            
                }else{
                    res.status(400).send('please fill all the required fields')
                }
                } ;