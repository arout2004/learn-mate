import type { NextApiRequest, NextApiResponse } from 'next'
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY!,
  key_secret: process.env.RAZORPAY_API_SECRET!,
});

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const requestData = req.body;
      const { amount } = requestData;
      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: 'INR',
        receipt: 'order_123',
        payment_capture: true,
      });

      return res.status(200).json({ success: true, order });
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      return res.status(500).json({ success: false, error: 'Failed to create order' });
    }
  } else {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
