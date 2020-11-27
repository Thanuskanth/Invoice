module.exports = (sequelize, Sequelize) => {
    const Program = sequelize.define("programs", {
      program_name: {
        type: Sequelize.STRING
      }
     
    });
  
    return Program;
  };