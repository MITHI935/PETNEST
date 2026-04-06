const { z } = require('zod');

/**
 * Pet Schema
 */
const petSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  breed: z.string().min(2, 'Breed must be at least 2 characters'),
  age: z.string().optional(),
  description: z.string().max(500, 'Description is too long').optional(),
  image_url: z.string().url('Invalid image URL').optional().or(z.literal('')),
  location: z.string().optional(),
  category: z.enum(['rescue', 'listing']).default('rescue'),
});

/**
 * Food/Product Schema
 */
const foodSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  brand: z.string().min(2, 'Brand is required'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(2, 'Category is required'),
  image_url: z.string().url('Invalid image URL').optional().or(z.literal('')),
  description: z.string().optional(),
  stock: z.number().int().nonnegative().default(0),
});

/**
 * Vet Schema
 */
const vetSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  specialization: z.string().min(2, 'Specialization is required'),
  clinic_name: z.string().min(2, 'Clinic name is required'),
  address: z.string().min(5, 'Address is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  rating: z.number().min(0).max(5).optional(),
  image_url: z.string().url('Invalid image URL').optional().or(z.literal('')),
});

/**
 * Order Schema
 */
const orderSchema = z.object({
  items: z.array(z.object({
    product_id: z.string().uuid('Invalid product ID'),
    quantity: z.number().int().positive(),
    price: z.number().positive()
  })).min(1, 'Order must have at least one item'),
  total_amount: z.number().positive(),
  shipping_address: z.string().min(10, 'Full shipping address is required'),
  payment_method: z.string().default('COD'),
});

/**
 * Generic validation runner
 */
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const error = new Error('Validation Error');
      error.statusCode = 400;
      error.errors = err.flatten().fieldErrors;
      return next(error);
    }
    next(err);
  }
};

module.exports = {
  petSchema,
  foodSchema,
  vetSchema,
  orderSchema,
  validatePet: validate(petSchema),
  validateFood: validate(foodSchema),
  validateVet: validate(vetSchema),
  validateOrder: validate(orderSchema),
};
