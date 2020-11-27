

module.exports = (sequelize, Sequelize) => {
  const DebitDescription = sequelize.define("debitnote_description", {
 
    description: {
      type: Sequelize.STRING
    },
    amount: {
      type: Sequelize.DOUBLE
    }
  });

  return DebitDescription;
};