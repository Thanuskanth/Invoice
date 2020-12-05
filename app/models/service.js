

module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("services", {
      service: {
        type: Sequelize.STRING
      },
    
     
    });
  
    return Service;
  };