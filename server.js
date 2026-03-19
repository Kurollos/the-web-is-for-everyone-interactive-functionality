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
  console.log('Body ontvangen:', request.body)

  const userId = request.body.user_id
  const productId = request.body.product_id

  // Validatie
  if (!userId || !productId) {
    return response.status(400).json({
      success: false,
      error: 'user_id en product_id zijn verplicht'
    })
  }

  try {
    const fetchResponse = await fetch(
      'https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products_1',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
          // voeg eventueel je token toe als auth nodig is
          // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        },
        body: JSON.stringify({
          milledoni_users_id: userId,     // correct veld
          milledoni_products_id: productId // correct veld
        })
      }
    )

    const fetchResponseJSON = await fetchResponse.json()
    console.log('Directus response:', fetchResponseJSON)

    // Response terug naar frontend
    response.json({
      success: true,
      data: fetchResponseJSON
    })

  } catch (error) {
    console.error('Fout bij POST naar Directus:', error)

    response.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// =========================
// Server starten
// =========================
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Server draait op http://localhost:${app.get('port')}`)
})