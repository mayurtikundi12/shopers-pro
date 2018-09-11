let express = require('express') ; 
let router = express.Router() ;

let billsCntrl = require('../controllers/bills.controller')

router.route('/bills').post(billsCntrl.addbill) ;
// router
// .route('/product')
// .get() 
// .post()
// .patch()
// .delete()


module.exports = router ;