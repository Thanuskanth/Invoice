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
db.invoice_description = require("./itemdescription.model")(sequelize, Sequelize);
db.program_package = require("./program_package.model")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.receipt = require("./receipt")(sequelize, Sequelize);
db.debit = require("./debitnote")(sequelize, Sequelize);
db.debit_description = require("./debit_detail")(sequelize, Sequelize);
db.service = require("./service")(sequelize, Sequelize);


db.invoice.hasMany(db.invoice_description, { as: 'invoice_description' })
db.invoice_description.belongsTo(db.invoice, {
  foreignKey: "invoiceId",
  as: "invoice",
})

db.invoice.hasMany(db.debit, { as: 'debit' })
db.debit.belongsTo(db.invoice, {
  foreignKey: "invoiceId",
  as: "invoice",
})

db.debit.hasMany(db.debit_description, { as: 'debit_description' })
db.debit_description.belongsTo(db.debit, {
  foreignKey: "debitnoteId",
  as: "debit_description",
})

db.owners.hasMany(db.invoice, { as: 'owners' })
db.invoice.belongsTo(db.owners, {
  foreignKey: "ownerId",
  as: "owners",
})


db.customers.hasMany(db.invoice, { as: 'customers' })
db.invoice.belongsTo(db.customers, {
  foreignKey: "customerId",
  as: "customers",
})


db.owners.hasMany(db.program_package, { as: 'program_pac' })
db.program_package.belongsTo(db.owners, {
  foreignKey: "ownerId",
  as: "owners",
})


db.packages.hasMany(db.invoice, { as: 'packages' })
db.invoice.belongsTo(db.packages, {
  foreignKey: "packageId",
  as: "packages",
})

db.programs.hasMany(db.invoice, { as: 'programs' })
db.invoice.belongsTo(db.programs, {
  foreignKey: "programId",
  as: "programs",
})

db.programs.hasMany(db.program_package, { as: 'program_pac' })
db.program_package.belongsTo(db.programs, {
  foreignKey: "programId",
  as: "programs",
})

db.packages.hasMany(db.program_package, { as: 'program_pac' })
db.program_package.belongsTo(db.packages, {
  foreignKey: "packageId",
  as: "packages",
})
module.exports = db;