import express from 'express';

export const paymentWebHookHandler = async (req: express.Request, res: express.Response) => {
	// Validate that this request comes from the payment processer
	// If it is
	// Update the _isPaid value of this order
	// Send recieve email
	//
	//
	// In this case the _isPaid will automatically get updated as soon as the request hits as there is no payment processer involved
};
