import { onSchedule } from "firebase-functions/v2/scheduler";
import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import axios from "axios";
import * as nodemailer from "nodemailer";
import * as cors from "cors";

admin.initializeApp();
const db = admin.firestore();

// Configure nodemailer transporter
// IMPORTANT: Replace these with your actual email credentials
const transporter = nodemailer.createTransport({
    service: "gmail", // or your email service
    auth: {
        user: "novaframesdev@gmail.com", // Replace with your email
        pass: "hrmcqgdmggamjwrp", // Replace with your app password
    },
});

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

// Initialize CORS middleware
const corsHandler = cors.default({ origin: true });

// HTTP function to send order confirmation email to admin
export const sendOrderEmail = onRequest(async (req, res) => {
    // Handle CORS
    corsHandler(req, res, async () => {
        try {
            // Only allow POST requests
            if (req.method !== "POST") {
                res.status(405).send({ error: "Method not allowed" });
                return;
            }

            const { orderData } = req.body;

            if (!orderData) {
                res.status(400).send({ error: "Order data is required" });
                return;
            }

            // Create email content
            const itemsList = orderData.items
                .map(
                    (item: any) =>
                        `<li>${item.name} - Quantity: ${item.quantity} - Price: ₹${item.price} - Subtotal: ₹${item.price * item.quantity}</li>`
                )
                .join("");

            const emailHTML = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #832729; text-align: center;">New Order Received!</h2>
                <hr style="border: 1px solid #eee;" />
                
                <h3 style="color: #333;">Order Details:</h3>
                <p><strong>Order Date:</strong> ${new Date(orderData.createdAt).toLocaleString()}</p>
                <p><strong>Order Status:</strong> ${orderData.status}</p>
                
                <h3 style="color: #333; margin-top: 20px;">Customer Information:</h3>
                <p><strong>Name:</strong> ${orderData.userName}</p>
                <p><strong>Email:</strong> ${orderData.userEmail}</p>
                <p><strong>Phone:</strong> ${orderData.userPhone}</p>
                
                <h3 style="color: #333; margin-top: 20px;">Delivery Address:</h3>
                <p>
                    ${orderData.deliveryAddress.name ? orderData.deliveryAddress.name + "<br/>" : ""}
                    ${orderData.deliveryAddress.address}<br/>
                    ${orderData.deliveryAddress.city}, ${orderData.deliveryAddress.state} ${orderData.deliveryAddress.zipCode}<br/>
                    ${orderData.deliveryAddress.country}<br/>
                    Phone: ${orderData.deliveryAddress.phone}
                </p>
                
                <h3 style="color: #333; margin-top: 20px;">Order Items:</h3>
                <ul style="list-style-type: none; padding: 0;">
                    ${itemsList}
                </ul>
                
                <hr style="border: 1px solid #eee; margin: 20px 0;" />
                <h3 style="color: #832729; text-align: right;">Total Amount: ₹${orderData.totalAmount}</h3>
                
                <p style="margin-top: 30px; color: #666; font-size: 12px; text-align: center;">
                    This is an automated email notification from your Jewelry Shop.
                </p>
            </div>
        `;

            // Send email to admin
            const mailOptions = {
                from: "novaframesdev@gmail.com",
                to: "novaframesdev@gmail.com",
                subject: `New Order from ${orderData.userName} - ₹${orderData.totalAmount}`,
                html: emailHTML,
            };

            await transporter.sendMail(mailOptions);

            console.log("✅ Order confirmation email sent successfully");
            res.status(200).send({ success: true, message: "Email sent successfully" });
        } catch (error: any) {
            console.error("❌ Failed to send order email:", error.message || error);
            res.status(500).send({ error: `Failed to send email: ${error.message}` });
        }
    });
});
