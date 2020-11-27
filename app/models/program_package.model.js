module.exports = (sequelize, Sequelize) => {
    const Program_Package = sequelize.define("program_package", {
     
      pac: {
        type: Sequelize.STRING
      },
      program: {
        type: Sequelize.STRING
      },
     
      amount: {
        type: Sequelize.DOUBLE
      }
    });
  
    return Program_Package;
  };  