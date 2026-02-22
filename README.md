# VIRO

Plataforma de IA para creadores hispanos: titulos ultra-CTR, prompts para miniaturas, intros listas y calendario semanal. Incluye plan gratis con 3 generaciones/dia, plan Pro con Stripe y dashboard historico.

## Requisitos
- Node 18+ recomendado
- Cuenta OpenAI, Firebase y Stripe

## Instalacion
```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Abre `http://localhost:3000`.

## Variables de entorno
Configura en `.env.local`:
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT_KEY` (JSON como string con saltos `\n`)
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID`
- `STRIPE_WEBHOOK_SECRET`

## Firebase
1. Activa Email/Password en Auth.
2. Crea Firestore en modo produccion.
3. Copia el JSON de Service Account y pegalo en `FIREBASE_SERVICE_ACCOUNT_KEY`.

## Stripe
1. Crea un producto Pro (9,99€/mes) y copia el `Price ID`.
2. Crea un webhook apuntando a `/api/stripe/webhook`.
3. Copia el secret del webhook en `STRIPE_WEBHOOK_SECRET`.

## Deploy en Vercel
1. Sube el repo a GitHub.
2. Importa el repo en Vercel.
3. Configura las variables de entorno.
4. Deploy.

## Estructura clave
- `app/page.js`: landing
- `app/titulos/page.js`: generador de titulos
- `app/miniaturas/page.js`: prompts de miniaturas
- `app/intros/page.js`: intros 12s
- `app/calendario/page.js`: calendario semanal
- `app/dashboard/page.js`: historial
- `app/api/*/route.js`: endpoints OpenAI y Stripe
- `lib/openai.js`: cliente OpenAI
- `lib/firebase.js`: Firebase client
- `lib/firebaseAdmin.js`: Firebase admin
