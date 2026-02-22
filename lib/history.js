import { getAdminDb } from "@/lib/firebaseAdmin";

export async function saveHistory({ uid, type, input, output }) {
  if (!uid) return;
  const db = getAdminDb();
  await db
    .collection("users")
    .doc(uid)
    .collection("history")
    .add({
      type,
      input,
      output,
      createdAt: new Date(),
    });
}
