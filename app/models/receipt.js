
module.exports = (sequelize, Sequelize) => {
    const Receipt = sequelize.define("receipt", {
        amount: {
        type: Sequelize.DOUBLE
      },
      from: {
        type: Sequelize.STRING
      },
      for_payment_of: {
        type: Sequelize.STRING
      },
      payment_method: {
        type: Sequelize.STRING
      },
      remark: {
        type: Sequelize.STRING
      },invoice_id: {
        type: Sequelize.INTEGER
      },
     
    });
  
    return Receipt;
  };