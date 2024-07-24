module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define('users', {
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
          },
        password: {
            type: Sequelize.STRING
        }
    });

    return user;
}