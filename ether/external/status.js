module.exports = function(callback) {
  console.log(
    web3.eth.accounts.map(function(address) {
      return web3.eth.getBalance(address).toNumber();
    }));
};
