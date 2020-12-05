

module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("items", {
      item_name: {
        type: Sequelize.STRING
      },
      detail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      service: {
        type: Sequelize.STRING(1234)
      },
      amount: {
        type: Sequelize.DOUBLE
      }
    });
  
    return Item;
  };