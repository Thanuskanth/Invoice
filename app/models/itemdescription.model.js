

module.exports = (sequelize, Sequelize) => {
    const Invoice_Description = sequelize.define("invoice_description", {
      invoice: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
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