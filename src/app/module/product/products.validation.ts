import { z } from 'zod';

// Defining the VariantValidationSchema type
const variantValidationSchema = z.object({
  type: z.string().min(1).max(100),
  value: z.string().min(1).max(100),
});

// Defining the InventoryValidationSchema type
const inventoryValidationSchema = z.object({
  quantity: z.number().nonnegative(),
  inStock: z.boolean({
    required_error: 'inStock is required',
  }),
});

// Defining the ProductValidationSchema type
const ProductValidationSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(10).max(150),
  price: z.number().nonnegative(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

export default ProductValidationSchema;
