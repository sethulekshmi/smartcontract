/*eslint-env node */
var create = require(__dirname+'/CRUD/bpccreate.js');
exports.create = create.create;

var read = require(__dirname+'/CRUD/read.js');
exports.read = read.read;

var minersFile = require(__dirname+'/regulators/bprregulators.js');
var miners = {};
regulators.read = regulatorsFile.read;
exports.regulators = regulators;

var distributorsFile = require(__dirname+'/manufacturers/bpmmanufacturers.js');
var distributors = {};
distributors.read = distributorsFile.read;
exports.distributors = distributors;


var dealershipsFile = require(__dirname+'/dealerships/dealerships.js');
var dealerships = {};
dealerships.read = dealershipsFile.read;
exports.dealerships = dealerships;

var buyerFile = require(__dirname+'/buyer/buyer.js');
var buyer = {};
buyer.read = buyerFile.read;
exports.buyer = buyer;

var tradersFile = require(__dirname+'/lease_companies/bpllease_company.js');
var traders = {};
traders.read = tradersFile.read;
exports.traders = traders;

var cuttersFile = require(__dirname+'/leasees/bpleaseesleasees.js');
var cutters = {};
cutters.read = cuttersFile.read;
exports.cutters = cutters;

var jewellery_makerFile = require(__dirname+'/scrap_merchants/bpsscrap_merchants.js');
var jewellery_maker = {};
jewellery_maker.read = jewellery_makerFile.read;
exports.jewellery_maker = jewellery_maker;

var customerFile = require(__dirname+'/customer/customer.js');
var customer = {};
customer.read = customerFile.read;
exports.customer = customer;


