module.exports = (sequelize, Sequelize) => {
    const Program_Package = sequelize.define("program_package", {
     
    
      items: {
        type: Sequelize.STRING(1234)
      },
      service: {
        type: Sequelize.STRING(1234)
      },
     
      amount: {
        type: Sequelize.DOUBLE
      }
    });
  
    return Program_Package;
  };  