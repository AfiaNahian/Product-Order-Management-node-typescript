import { z } from "zod";

const OrderValidationSchema = z.object({
    email: z.string().email({ message: 'valid email required' }),
    productId: z.string({
        required_error: 'Product id must be given',
        invalid_type_error: 'Product id  must be a sting'
    }),
    price: z.number().nonnegative({ message: "Price cannot be negative" }),
    quantity: z.number().min(1, { message: "At least order one item" }),
});

export default OrderValidationSchema;