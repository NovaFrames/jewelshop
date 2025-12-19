import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();
const db = admin.firestore();

export const dailyGoldRateTamilNadu = onSchedule(
    {
        schedule: "13 15 * * *", // 15:13 IST (20 mins from 14:53)
        timeZone: "Asia/Kolkata",
    },
    async () => {
        try {
            const apiKey = "c1c1354ca0210e75bab2b9e049a3dade";

            if (!apiKey) {
                throw new Error("Metal API key missing");
            }

            console.log("Fetching gold rates from MetalPriceAPI...");
            const response = await axios.get(
                "https://api.metalpriceapi.com/v1/latest",
                {
                    params: {
                        api_key: apiKey,
                        base: "INR",
                        currencies: "XAU",
                    },
                }
            );

            if (!response.data || !response.data.rates || !response.data.rates.XAU) {
                throw new Error("Invalid API response structure");
            }

            const xauRate = response.data.rates.XAU;
            console.log(`API XAU Rate (XAU per INR): ${xauRate}`);

            // The API returns XAU per 1 unit of base (INR)
            // So 1 INR = xauRate XAU
            // Therefore, 1 XAU = 1 / xauRate INR
            const inrPerOunce = 1 / xauRate;
            console.log(`Calculated INR per Ounce: ${inrPerOunce}`);

            // 1 troy ounce = 31.1035 grams
            const gold24k = inrPerOunce / 31.1035;
            const gold22k = gold24k * 0.916;
            const gold18k = gold24k * 0.75;
            const gold14k = gold24k * 0.585;

            const rateData = {
                gold24k: Number(gold24k.toFixed(2)),
                gold22k: Number(gold22k.toFixed(2)),
                gold18k: Number(gold18k.toFixed(2)),
                gold14k: Number(gold14k.toFixed(2)),
                unit: "INR per gram",
                source: "MetalPriceAPI",
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            };

            await db.collection("goldRates").doc("tamilnadu").set(rateData);

            console.log("✅ Tamil Nadu gold rate updated successfully:", rateData);
        } catch (error: any) {
            console.error("❌ Gold rate update failed:", error.message || error);
        }
    }
);
