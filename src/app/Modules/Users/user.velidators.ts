import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'firstName is required' })
    .max(20, { message: 'First Name should not be more than 20 characters' }),
  lastName: z
    .string()
    .min(1, { message: 'lastName is required' })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: '{value} is not valid',
    }),
});

const addressValidationSchema = z.object({
  street: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  country: z.string().min(1).max(255),
});

// const orderValidationSchema = z.object({
//   productName: z.string().min(1).max(255),
//   price: z.number().min(0),
//   quantity: z.number().min(1),
// });

const passwordValidationSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{};':"\\|,.<>/?]).*$/,
    {
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    },
  );

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: passwordValidationSchema,
  fullName: userNameValidationSchema,
  age: z.number(),
  email: z.string().email({ message: 'Invalid email address format' }),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).refine((data) => data.length > 0, {
    message: 'At least one hobby is required',
  }),
  address: addressValidationSchema,
  //   orders: z.array(orderValidationSchema),
});

export default userValidationSchema;
