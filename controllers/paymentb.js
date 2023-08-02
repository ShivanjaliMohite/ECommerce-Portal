var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "y8ykyqtd47xb49mk",
  publicKey: "3ft6xnk79gfcrfnm",
  privateKey: "901a1bead089cc37667f8c19761d629a"
});



exports.getToken = (req, res) => {
    console.log("hiiii")
     gateway.clientToken.generate({}, function(err, response) {
    if (err) {
      console.log("hello")
      console.log(err)
      res.status(500).json(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true
      }
    },
    function(err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};
