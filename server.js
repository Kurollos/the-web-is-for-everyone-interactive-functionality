// Importeer Express
import express from 'express'

// Importeer Liquid
import { Liquid } from 'liquidjs'

// Maak app
const app = express()

// Form data verwerken
app.use(express.urlencoded({ extended: true }))

// Static files
app.use(express.static('public'))

// Liquid instellen
const engine = new Liquid()
app.engine('liquid', engine.express())
app.set('views', './views')

// =========================
// GET ROUTE (producten)
// =========================
app.get('/', async function (request, response) {

  const params = {
    fields: 'id,name,image'
  }

  const productResponse = await fetch(
    'https://fdnd-agency.directus.app/items/milledoni_products/?' + new URLSearchParams(params)
  )

  const productResponseJSON = await productResponse.json()

  console.log(productResponseJSON.data)

  response.render('index.liquid', {
    products: productResponseJSON.data
  })
})

// =========================
// POST ROUTE (like)
// =========================
app.post('/like', async function (request, response) {

  console.log(request.body)

  const userId = request.body.user_id
  const productId = request.body.product_id

  try {
    const fetchResponse = await fetch(
      'https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products_1',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          milledoni_users_id: userId,
          milledoni_products_id: productId
        })
      }
    )

    const fetchResponseJSON = await fetchResponse.json()
    console.log(fetchResponseJSON)

  } catch (error) {
    console.error('Fout bij POST:', error)
  }

  // Redirect terug naar homepage
  response.redirect(303, '/')
})

// =========================
// Server starten
// =========================
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Server draait op http://localhost:${app.get('port')}`)
})