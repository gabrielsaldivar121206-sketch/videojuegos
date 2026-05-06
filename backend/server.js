import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ── Middleware ──────────────────────────────────────────────────
const allowedOrigins = [
  /^https:\/\/.*\.vercel\.app$/,   // Any Vercel subdomain
  /^http:\/\/localhost:\d+$/,       // Local dev
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    allowed ? callback(null, true) : callback(new Error(`CORS bloqueado: ${origin}`));
  },
  methods: ['GET', 'POST']
}));
app.use(express.json());

// ── Health check ──────────────────────────────────────────────
app.get('/api/status', (req, res) => {
  res.json({ status: 'Nexus Gaming Backend is running!' });
});

// ── CREATE PAYMENT INTENT ─────────────────────────────────────
// The frontend sends the cart items, backend creates a secure Stripe session
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No hay artículos en el carrito.' });
    }

    // Calculate total on the SERVER (never trust the client for prices)
    const totalCents = items.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const discount = parseInt(item.discount) || 0;
      const finalPrice = discount > 0 ? price * (1 - discount / 100) : price;
      return total + Math.round(finalPrice * 100); // Stripe uses cents
    }, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(items.map(i => ({ id: i.id, title: i.title }))),
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Error al crear el pago.' });
  }
});

// ── STRIPE WEBHOOK (fires when payment is confirmed) ──────────
// This is where you deliver the game key after successful payment
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log('✅ Pago confirmado:', paymentIntent.id);
    // TODO: Here you would:
    // 1. Get the game IDs from paymentIntent.metadata.items
    // 2. Mark those games as purchased in Firestore (update the user's library)
    // 3. Send a confirmation email with the game key
  }

  res.json({ received: true });
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Nexus Gaming Backend corriendo en http://localhost:${PORT}`);
});
