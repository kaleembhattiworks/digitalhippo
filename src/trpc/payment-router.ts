import { z } from 'zod';
import { privateProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { getPayloadClient } from '../get-payload';
import dotenv from 'dotenv';
import path from 'path';
import { Product } from '../payload-types';
import { Resend } from 'resend';
import { ReceiptEmailHtml } from '../components/emails/ReceiptEmail';

dotenv.config({
	path: path.resolve(__dirname, '../.env'),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export const paymentRouter = router({
	createSession: privateProcedure
		.input(z.object({ productIds: z.array(z.string()) }))
		.mutation(async ({ input, ctx }) => {
			const { user } = ctx;
			let { productIds } = input;

			if (productIds.length === 0) {
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}

			const payload = await getPayloadClient();

			const { docs: products } = await payload.find({
				collection: 'products',
				where: {
					id: {
						in: productIds,
					},
				},
			});

			const order = await payload.create({
				collection: 'orders',
				data: {
					_isPaid: false,
					products: products.map((prod) => prod.id),
					user: user.id,
				},
			});

			try {
				return { url: `/checkout/${order.id}` };
			} catch (err) {
				return { url: null };
			}
		}),
	pollOrderStatus: privateProcedure
		.input(z.object({ orderId: z.string() }))
		.query(async ({ input }) => {
			const { orderId } = input;

			const payload = await getPayloadClient();

			const { docs: orders } = await payload.find({
				collection: 'orders',
				where: {
					id: {
						equals: orderId,
					},
				},
			});

			if (!orders.length) {
				throw new TRPCError({ code: 'NOT_FOUND' });
			}

			const [order] = orders;

			return { isPaid: order._isPaid };
		}),

	resolvePayment: privateProcedure
		.input(z.object({ orderId: z.string(), userId: z.string() }))
		.query(async ({ input }) => {
			const { orderId, userId } = input;
			const payload = await getPayloadClient();

			// User check

			const { docs: users } = await payload.find({
				collection: 'users',
				where: {
					id: {
						equals: userId,
					},
				},
			});

			const [user] = users;

			if (!user) throw new TRPCError({ code: 'NOT_FOUND' });

			// Order check and change _isPaid

			const { docs: orders } = await payload.update({
				collection: 'orders',
				data: {
					_isPaid: true,
				},
				where: {
					id: {
						equals: orderId,
					},
				},
			});

			const [order] = orders;

			if (!order) throw new TRPCError({ code: 'NOT_FOUND' });

			// send receipt
			try {
				const data = await resend.emails.send({
					from: process.env.RESEND_DOMAIN!,
					to: [user.email],
					subject: 'Thanks for your order! This is your receipt.',
					html: ReceiptEmailHtml({
						date: new Date(),
						email: user.email,
						orderId: order.id,
						products: order.products as Product[],
					}),
				});
			} catch (error) {}

			return;
		}),
});
