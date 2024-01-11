const MarketplaceMigration = artifacts.require("MethodMarketplace");

module.exports = function (deployer) {
    deployer.deploy(MarketplaceMigration);
};