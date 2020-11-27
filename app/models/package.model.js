module.exports = (sequelize, Sequelize) => {
    const Package = sequelize.define("packages", {
      package_name: {
        type: Sequelize.STRING
      }
    });
  
    return Package;
  };