
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      }
     
    });
  
    return User;
  };