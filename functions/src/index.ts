const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();
const db = admin.firestore();

exports.updateGoldRateDaily = onSchedule(
  {
    region: "asia-south1",          // 🔥 FIX: Required to avoid Cloud Scheduler errors
    schedule: "every day 15:50",
    timeZone: "Asia/Kolkata",
  },
  async () => {
    try {
      const API_KEY = "OBAL00RQP9OL3XUCTGVI227UCTGVI";

      const response = await fetch(
        `https://api.metals.dev/v1/latest?api_key=${API_KEY}&currency=INR`
      );
      const data = await response.json();

      const goldPerOunce = data?.metals?.gold;
      if (!goldPerOunce) return;

      const gramPrice = goldPerOunce / 31.103476;
      const finalRate = parseFloat(gramPrice.toFixed(2));

      await db.collection("goldRate").doc("todaysRate").set({
        rate24: finalRate,
        updatedAt: new Date(),
      });

      console.log("Gold rate updated:", finalRate);
    } catch (error) {
      console.error("Failed to fetch gold rate:", error);
    }
  }
);
