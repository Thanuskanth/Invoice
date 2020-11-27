module.exports = (sequelize, Sequelize) => {
    const Invoice = sequelize.define("invoice", {
      
      order_id: {
        type: Sequelize.STRING,
        
      },
      total: {
        type: Sequelize.DOUBLE,
        
      },
      status: {
        type: Sequelize.STRING,
        
      },
      package: {
        type: Sequelize.STRING
      },
      program: {
        type: Sequelize.STRING
      },
      owner: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      customer_name: {
        type: Sequelize.STRING
      },
      nic: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phonenumber: {
        type: Sequelize.STRING
      }
    });
  
    return Invoice;
  };