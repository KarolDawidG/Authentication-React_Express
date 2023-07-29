const express = require('express');
const router = express.Router();
const middleware = require('../../config/middleware');
const { UsersRecord } = require('../../database/Records/UsersRecord');
const {  verifyToken } = require('../../config/config');

router.use(middleware);

 
router.get('/', verifyToken, async (req, res, next) => {
  const userRole = req.userRole; 
  console.log(`Autoryzacja: ${userRole}`);
  
  if (userRole !== 'admin') {
      return res.status(403).send('Brak uprawnień do dostępu do danych.');
  }
  try {
      const usersList = await UsersRecord.listAll();
      return res.json({ usersList });
  } catch (error) {
      console.error(error);
      return res.status(500).send('Unknown server error. Please contact your administrator.');
  }
});

// router.post('/delete/:id', async (req, res, next) => {
//    const id = req.params.id;

//    try {
//       await UsersRecord.delete(id);
//       res.status(200).send('The operation has been successful.');
//    } catch (error) {
//       console.error(error);
//       res.status(500).send('Unknown server error. Please contact your administrator.');
//    }
// });



module.exports = router;
