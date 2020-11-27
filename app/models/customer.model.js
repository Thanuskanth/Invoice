module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customers", {
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
  
    return Customer;
  };