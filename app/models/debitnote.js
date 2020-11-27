

module.exports = (sequelize, Sequelize) => {
    const Debitnote = sequelize.define("debitnote", {
    
      balance_due: {
        type: Sequelize.DOUBLE
      },
      total: {
        type: Sequelize.DOUBLE
      }
    });
  
    return Debitnote;
  };