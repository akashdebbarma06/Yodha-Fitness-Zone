// Yodha — Mock Razorpay Client Stub
// In Phase 3, install 'razorpay' and wire live keys
export function getRazorpayClient() {
  const key_id = process.env.RAZORPAY_KEY_ID || "rzp_test_mock_yodha";
  const key_secret = process.env.RAZORPAY_KEY_SECRET || "mock_secret";
  return {
    key_id,
    key_secret,
    orders: {
      create: async (params: any) => ({
        id: `order_${Math.random().toString(36).substring(2, 11)}`,
        amount: params.amount,
        currency: params.currency || "INR",
        status: "created",
      }),
    },
  };
}
