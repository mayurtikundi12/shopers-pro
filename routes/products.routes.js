let express = require('express') ; 
let router = express.Router() ;

let productCtrl = require('../controllers/products.controller')

router.route('/products').get(productCtrl.getproducts) ;
router
.route('/product')
.get(productCtrl.getproduct) 
.post(productCtrl.addproduct)
.patch(productCtrl.upadteproduct)
.delete(productCtrl.removeproduct)


module.exports = router ;