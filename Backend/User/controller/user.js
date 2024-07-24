const db = require('../database/user');
const helper = require('../helper');
const config = require('../config');
const bcrypt = require('bcrypt');

// Display all the users info with the query for the database
async function getAllUser(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);

  const sql = 'SELECT users.email, users.phone, users.password, roles.name role, infos.name, infos.surname FROM users, roles, user_roles, infos where infos.userId = users.id and users.id = user_roles.userId and user_roles.roleId = roles.id LIMIT ?, ? ';
  const values = [offset, config.listPerPage];

  const rows = await db.query(sql, values);

  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {data,meta}
}

// Display the specific user with the query for the database
async function getUserById(id, page = 1){

  //console.log(id);

  const sql = 'SELECT users.email, users.phone, users.password, roles.name role, infos.name, infos.surname FROM users INNER JOIN infos ON infos.userId = users.id INNER JOIN user_roles ON users.id = user_roles.userId INNER JOIN roles ON user_roles.roleId = roles.id LIMIT ?, ?';

  const values = [id];
  const result = await db.query(sql, values);

  const data = helper.emptyOrRows(result);
  const meta = {page};

  return {data,meta}
}


// Modification of a user with the query for the database
async function updateUser(id, user){
  // Preparation of the query
  const sql = `UPDATE users 
  SET email=?, phone=?, password=? 
  WHERE id=?;
  UPDATE infos
  SET name=?, surname=?
  WHERE userId=?`;

const values = [user.email, user.phone, user.password, user.name, user.surname, id];
const result = await db.query(sql, values);
let message = 'Error in updating the user.';
  if (result.affectedRows) {
    message = 'The user is updated successfully';
  }
  return {message};
}

// Remove the user with the query
async function deleteUser(id){
  // Preparation of the query
  const sql = 'DELETE  FROM users WHERE id = ?';

  const values = [id];
  const result = await db.query(sql, values);
  let message = 'Error in deleting the user.';
  if (result.affectedRows) {
    message = 'The user is deleted successfully.';
  }

  return {message};
}

module.exports = {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser
}


