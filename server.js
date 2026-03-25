// Importeer Express
import express from 'express'

// Importeer Liquid
import { Liquid } from 'liquidjs'

// Maak app
const app = express()

// Form data verwerken
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // belangrijk voor JSON POST via fetch

// Static files
app.use(express.static('public'))

// Liquid instellen
const engine = new Liquid()
app.engine('liquid', engine.express())
app.set('views', './views')

// =========================
// GET ROUTE (producten)
// =========================
app.get('/', async function (req, res) {
  const userId = 62; // jouw user ID

  try {
    // Haal alle producten
    const productResponse = await fetch(
      'https://fdnd-agency.directus.app/items/milledoni_products/?fields=id,name,image'
    )
    const products = (await productResponse.json()).data

    // Haal wishlist van gebruiker
    const userResponse = await fetch(
      `https://fdnd-agency.directus.app/items/milledoni_users/${userId}/?fields=liked_products.milledoni_products_id.id`
    )
    const likedProducts = (await userResponse.json()).data.liked_products.map(
      item => item.milledoni_products_id.id
    )

    res.render('index.liquid', { products, likedProducts })
  } catch (err) {
    console.error(err)
    res.status(500).send("Er is iets misgegaan bij het laden van producten")
  }
})

// =========================
// POST ROUTE (like)
// =========================
app.post('/like', async function (req, res) {
  const userId = 62 // jouw user ID
  const productId = req.body.product_id || req.body.id

  try {
    // Check of product al in wishlist staat
    const checkResponse = await fetch(
      `https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products_1?filter[milledoni_users_id][_eq]=${userId}&filter[milledoni_products_id][_eq]=${productId}`
    )
    const checkData = await checkResponse.json()

    if (checkData.data.length > 0) {
      return res.json({ success: false, message: "Product staat al in wishlist" })
    }

    // Voeg toe aan wishlist
    const fetchResponse = await fetch(
      "https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products_1",
      {
        method: "POST",
        body: JSON.stringify({
          milledoni_users_id: userId,
          milledoni_products_id: productId,
        }),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    )
    const fetchResponseJSON = await fetchResponse.json()

    res.json({ success: true, message: "Product toegevoegd aan wishlist", data: fetchResponseJSON })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Er is iets misgegaan bij toevoegen aan wishlist" })
  }
})

app.get('/wishlist', async function (req, res) {
  const userId = 62; // jouw user ID

  try {
    // Haal de wishlist van de gebruiker op
    const userResponse = await fetch(
      `https://fdnd-agency.directus.app/items/milledoni_users/${userId}/?fields=liked_products.milledoni_products_id.*`
    )
    const likedProducts = (await userResponse.json()).data.liked_products.map(
      item => item.milledoni_products_id
    )

    // Render list.liquid met de wishlist
    res.render('wishlist.liquid', { likedProducts })
  } catch (err) {
    console.error(err)
    res.status(500).send("Er is iets misgegaan bij het ophalen van je wishlist")
  }
})

// =========================
// Server starten
// =========================
app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Server draait op http://localhost:${app.get('port')}`)
})