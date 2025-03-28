import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2025-02-24.acacia"
});

export async function POST(req) {
	const body = await req.json();
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card", "amazon_pay"],
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: body.name
						},
						unit_amount: body.price * 100
					},
					quantity: 1
				}
			],
			mode: "payment",
			success_url: `${body.origin}/success`,
			cancel_url: `${body.origin}/cancel`
		});
		return NextResponse.json({ id: session.id });

	} catch (error) {
		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : 'Unknown error'
			},
			{
				status: 500
			}
		);
	}
}
