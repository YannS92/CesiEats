module.exports = (sequelize, Sequelize) => {
    const userInfo = sequelize.define("info", {
      name: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        model: 'users',
        key: 'id'
      }
    });
  
    return userInfo;
};