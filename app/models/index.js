const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.programs = require("./program.model.js")(sequelize, Sequelize);
db.items = require("./item.model")(sequelize, Sequelize);
db.owners = require("./owner.model")(sequelize, Sequelize);
db.packages = require("./package.model")(sequelize, Sequelize);
db.customers = require("./customer.model")(sequelize, Sequelize);
db.invoice = require("./invoice")(sequelize, Sequelize);
db.invoicedescription = require("./itemdescription.model")(sequelize, Sequelize);
db.program_package = require("./program_package.model")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.receipt = require("./receipt")(sequelize, Sequelize);
db.debit = require("./debitnote")(sequelize, Sequelize);
db.debit_description = require("./debit_detail")(sequelize, Sequelize);
db.invoice.hasMany(db.debit, {as: 'debit'}) 
db.debit.hasMany(db.debit_description, {as: 'debit'}) 
module.exports = db;