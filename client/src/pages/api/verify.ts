import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === "POST") {
        let success = false;
        try {
            const requestData = await req.body;
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = requestData;
            const body = razorpay_order_id + "|" + razorpay_payment_id;

            const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET!)
                .update(body.toString())
                .digest("hex");

            if (expectedSignature !== razorpay_signature) {
                return res.status(401).json({ success, error: "Invalid signature" });
            }

            success = true;
            return res.status(200).json({ success });
        } catch (error) {
            console.error("Error verifying razorpay payment:", error);
            return res.status(500).json({ success: false, error: "Failed to verify payment" });
        }
    } else {
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}
