module.exports = (sequelize, Sequelize) => {
    const Owner = sequelize.define("owners", {
      owner_name: {
        type: Sequelize.STRING
      }
     
    });
  
    return Owner;
  };