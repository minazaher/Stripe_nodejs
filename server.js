const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")
('sk_test_51NR7UYDNDAkufzaA5etuDVAUCXZQNUj9VVfW9jatoi7kJSvQRxNkMyhBTT4dU01QrhniaeBakmEXuTQs0i5tX4Av00KtxRtvgC');

app.use(express.static("public"));
app.use(express.json());


app.post('/refund', async (req, res) => {
    const chargeId = req.body.chargeId;

    try {
        const refund = await stripe.refunds.create({
            charge: chargeId,
        });
        res.send({ success: true });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});



app.post("/create-payment-intent", async (req, res) => {
    const { items, totalPrice } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice,
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));