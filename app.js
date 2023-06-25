const express = require('express')
const app = express()

const port = 4242
app.set('port', port)

const apiKey = 'sk_test_51N9UNcJ163W9pHqjuzZbiyJlMWcXHCkUscXYOdxOMxiIY46JX2qMVhDEb9BV4dkBfkyEdkMcFsXCVDaSUU7ftJi9002pvXDnir'
const stripe = require('stripe')(apiKey)

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt'
        },
        unit_amount: 2000
      },
      quantity: 1
    }],
    mode: 'payment',
    success_url: 'http://localhost:4242/success',
    cancel_url: 'http://localhost:4242/cancel'
  })

  res.redirect(303, session.url)
})

app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = app
