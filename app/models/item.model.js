

module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("items", {
      item_name: {
        type: Sequelize.STRING
      },
      detail: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DOUBLE
      }
    });
  
    return Item;
  };