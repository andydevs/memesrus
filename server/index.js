/**
 * Your one stop shop for the freshest memes
 * 
 * Author:  Anshul Kharbanda
 * Created: 9 - 25 - 2020
 */
require('dotenv').config()
const path = require('path')
const fs = require('fs')
const express = require('express')
const flash = require('connect-flash')
const handlebars = require('express-handlebars')
const { MongoClient, ObjectId } = require('mongodb')
const session = require('express-session')
const stripe = require('stripe')(process.env.SECRET_KEY)

// Get port form environment variable
const PORT = process.env.PORT || 8080
const DBURL = process.env.MONGO_URL

// Get domain name based on environment
const DOMAIN = process.env.NODE_ENV === 'production'
    ? 'http://memesrus420.herokuapp.com'
    : 'http://localhost:'+PORT

// Create mongo client
const mongoPromise = MongoClient.connect(DBURL, { useUnifiedTopology: true })

// Get prices
function getPricesFromStripe(memes) {
    return Promise.all(
        memes.map(
            meme => stripe.prices.retrieve(meme.price_id)
                .then(price => price.unit_amount)
                .then(usd => ({ ...meme, price: usd }))
        )
    )
}

function getMemes() {
    return mongoPromise
        .then(mongo => 
            mongo.db('memesrus')
                .collection('memes')
                .find({})
                .toArray()
        )
}

function getMemesByIds(ids) {
    return mongoPromise
        .then(mongo =>
            mongo.db('memesrus')
                .collection('memes')
                .find({ _id: { $in: ids.map(ObjectId) } })
                .toArray()
        )
}

function getMemesByPriceIds(price_ids) {
    return mongoPromise
        .then(mongo => 
            mongo.db('memesrus')
                .collection('memes')
                .find({ price_id: { $in: price_ids }})
                .toArray()
        )
}

function getPriceIdsForIds(ids) {
    return mongoPromise
        .then(mongo => 
            mongo.db('memesrus')
                .collection('memes')
                .find({ _id: { $in: ids.map(ObjectId) }})
                .map(meme => meme.price_id)
                .toArray()
        )
}

// Create and configure app
const app = express()
app.engine('handlebars', handlebars({
    helpers: {
        usd(cent) {
            let dollars = cent / 100;
            return `$${dollars.toFixed(2)}`
        },
        toggle(cond, klass) {
            return cond ? klass : ''
        }
    }
}))
app.set('view engine', 'handlebars')

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'tenderloin',
    resave: false,
    saveUninitialized: true
}))
app.use((req, res, next) => {
    // Initialize cart items
    if (!req.session.cart_items) {
        req.session.cart_items = []
    }

    // Go to next middleware
    next()
})
app.use(flash())

// Page routes
app.get('/', async (req, res) => {
    // Get memes and prices
    let memes = await getMemes()
    memes = await getPricesFromStripe(memes)

    // Render it or something
    res.render('index', { 
        memes,
        cart_size: req.session.cart_items.length,
        errors: req.flash('error'),
        successes: req.flash('success')
    })
})
app.get('/my-cart', async (req, res) => {
    // Get memes in cart
    let memes = await getMemesByIds(req.session.cart_items)
    memes = await getPricesFromStripe(memes)

    // Render that b
    res.render('cart', {
        items: memes,
        cart_size: req.session.cart_items.length,
        errors: req.flash('error'),
        successes: req.flash('success')
    })
})
app.get('/order-confirmation', async (req, res) => {
    // Clear checkout items
    req.session.cart_items = []

    // Get checkout session data
    let session_id = req.query.session_id
    let checkout_data = await stripe.checkout.sessions.listLineItems(session_id)

    // Get images to download
    let price_ids = checkout_data.data.map(item => item.price.id)
    let checkout_memes = await getMemesByPriceIds(price_ids)
    
    // Render page
    res.render('confirmation', {
        session_id,
        checkout_memes,
        cart_size: req.session.cart_items.length,
        layout: 'centered'
    })
})
app.get('/cancel', (req, res) => {
    req.flash('error', 'Payment canceled!')
    res.redirect('/my-cart')
})
 
// Form endpoints
app.post('/add-to-cart', (req, res) => {
    if (req.session.cart_items.indexOf(req.body._id) < 0) {
        req.session.cart_items.push(req.body._id)
        req.flash('success', 'Meme added to cart!')
    }
    else {
        req.flash('error', 'Meme is already in cart!')
    }
    res.redirect('/')
})
app.post('/remove-from-cart', (req, res) => {
    req.session.cart_items = req.session.cart_items.filter(item => item != req.body._id)
    req.flash('success', 'Meme removed from cart!')
    res.redirect('/my-cart')
})
app.post('/create-checkout-session', async (req, res) => {
    // Get price ids from items in session
    let priceIds = await getPriceIdsForIds(req.session.cart_items)
    let line_items = priceIds.map(price => ({
        price, quantity: 1
    }))

    // Create checkout session
    let session = await stripe.checkout.sessions.create({
        line_items,
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: DOMAIN+'/order-confirmation?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: DOMAIN+'/cancel'
    })

    // Return json session
    res.json({ id: session.id })
})
app.post('/download', async (req, res) => {
    // Zip file stream
    let zipstream = fs.createReadStream(
        path.resolve(__dirname, '../memedrop.zip')
    )

    // Send file stream
    zipstream.pipe(res)
})

// Static file routes
app.use(express.static('public'))

// Listen on port
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})