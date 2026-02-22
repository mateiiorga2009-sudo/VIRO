import { getAdminDb } from "@/lib/firebaseAdmin";

const FREE_DAILY_LIMIT = 3;

function todayKey() {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

export async function checkAndIncrementUsage({ uid, feature }) {
  if (!uid) {
    return { allowed: false, reason: "usuario_no_autenticado" };
  }

  const db = getAdminDb();
  const userRef = db.collection("users").doc(uid);
  const userSnap = await userRef.get();

  if (userSnap.exists && userSnap.data()?.plan === "pro") {
    return { allowed: true, remaining: null, plan: "pro" };
  }

  const dateKey = todayKey();
  const usageRef = userRef.collection("usage").doc(dateKey);

  const result = await db.runTransaction(async (tx) => {
    const usageSnap = await tx.get(usageRef);
    const usageData = usageSnap.exists ? usageSnap.data() : {};
    const current = usageData?.[feature] ?? 0;

    if (current >= FREE_DAILY_LIMIT) {
      return { allowed: false, remaining: 0, plan: "free" };
    }

    tx.set(
      usageRef,
      {
        [feature]: current + 1,
        updatedAt: new Date(),
      },
      { merge: true }
    );

    return {
      allowed: true,
      remaining: FREE_DAILY_LIMIT - (current + 1),
      plan: "free",
    };
  });

  return result;
}
