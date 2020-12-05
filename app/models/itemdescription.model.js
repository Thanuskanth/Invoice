

module.exports = (sequelize, Sequelize) => {
    const Invoice_Description = sequelize.define("invoice_description", {
     
      description: {
        type: Sequelize.STRING(1234)
      },
      service: {
        type: Sequelize.STRING(1234)
      },
      amount: {
        type: Sequelize.DOUBLE
      },
      count: {
        type: Sequelize.DOUBLE
      }
    });
  
    return Invoice_Description;
  };