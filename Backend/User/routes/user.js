const express = require("express");
const router = express.Router();
const userController = require("../controller/user");


//Display all users
router.get('/', async function(req, res, next) {
  try {
    res.json(await userController.getAllUser(req.query.page));
  } catch (err) {
    console.error(`Error while getting users.`, err.message);
    next(err);
  }
});

// Display the specific user
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await userController.getUserById(req.params.id,req.query.page));
  } catch (err) {
    console.error(`Error while getting the user.`, err.message);
    next(err);
  }
});

//Modification of a user
router.put('/:id', async function(req, res, next) {
 try {
    res.json(await userController.updateUser(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

//Delete a user
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await userController.deleteUser(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
});

module.exports = router;