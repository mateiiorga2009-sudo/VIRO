import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

function initAdmin() {
  if (getApps().length) {
    return getApps()[0];
  }

  if (!serviceKey) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_KEY no esta definido en .env.local"
    );
  }

  const parsedKey =
    typeof serviceKey === "string" ? JSON.parse(serviceKey) : serviceKey;

  return initializeApp({
    credential: cert(parsedKey),
  });
}

export function getAdminDb() {
  const app = initAdmin();
  return getFirestore(app);
}
