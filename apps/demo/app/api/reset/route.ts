import { pendingDonations, sealedBatches, certificates } from "../store";

export async function POST(req: Request) {
  const { secret } = await req.json();

  if (secret !== process.env.RESET_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  pendingDonations.set("current", []);
  sealedBatches.clear();
  certificates.clear();

  return Response.json({
    success: true,
    message: "Store cleared",
    timestamp: new Date().toISOString(),
  });
}
