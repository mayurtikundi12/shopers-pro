let express = require('express') ; 
let router = express.Router() ;

let customerCtrl = require('../controllers/customer.controller')

router.route('/customers').get(customerCtrl.getcustomers) ;
router
.route('/customer')
.get(customerCtrl.getcustomer) 
.post(customerCtrl.addcustomer)
.patch(customerCtrl.updatecustomer)
.delete(customerCtrl.removecustomer)


module.exports = router ;