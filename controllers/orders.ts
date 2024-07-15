import prisma from "../prisma/client";
import asyncHandler from "../middlewares/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import {
  checkDeliveryType,
  checkPaymentType,
  checkRequiredFields,
} from "../utils/helperFunctions";
import {
  DeliveryType,
  PaymentType,
  OrderDetail,
  Product,
} from ".prisma/client";
import {
  defaultError,
  deliveryTypeError,
  invalidArgError,
  paymentTypeError,
  resource404Error,
} from "../utils/errorObject";
import sendMail from "../utils/sendEmail";
import emailTemplate from "../utils/emailTemplate";
import { Decimal } from "@prisma/client/runtime";
import { proOptions } from "./../db/data";
import { ProOptions } from "@prisma/client";

/**
 * Get all orders
 * @route   GET /api/v1/orders
 * @access  Private (superadmin)
 */
export const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await prisma.order.findMany({
    select: {
      customer: true,
      paymentType: true,
      deliveryType: true,
      totalPrice: true,
      deliveryDate: true,
      shippingAddress: true,
      orderDate: true,
      orders: {
        select: {
          proOptions: {
            select: {
              id: true,
              color: true,
              price: true,
              size: true,
              stock: true,
              discount: true,
              images: true,
              productId: true,
              product: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          quantity: true,
          orderNumber: true,
        },
      },
    },
  });

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

/**
 * Get specific order
 * @route   GET /api/v1/orders
 * @access  Private (superadmin)
 */
export const getOrder = asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);

  const order = await prisma.order.findMany({
    where: { orderNumber: id },

    select: {
      customer: true,
      paymentType: true,
      deliveryType: true,
      totalPrice: true,
      deliveryDate: true,
      shippingAddress: true,
      orderDate: true,
      orders: {
        select: {
          proOptions: {
            select: {
              id: true,
              color: true,
              price: true,
              size: true,
              stock: true,
              discount: true,
              images: true,
              productId: true,
              product: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          quantity: true,
          orderNumber: true,
        },
      },
    },
  });

  if (order.length === 0) {
    return next(new ErrorResponse(resource404Error("order"), 400));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

/**
 * Get specific order BY customer Id
 * @route   GET /api/v1/orders/customer/id
 * @access  Private (superadmin)
 */
export const getOrderbycustomer = asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);

  const order = await prisma.order.findMany({
    where: { customerId: id },

    select: {
      customer: true,
      paymentType: true,
      deliveryType: true,
      totalPrice: true,
      deliveryDate: true,
      shippingAddress: true,
      orderDate: true,
      orders: {
        select: {
          proOptions: {
            select: {
              id: true,
              color: true,
              price: true,
              size: true,
              stock: true,
              discount: true,
              images: true,
              productId: true,
              product: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          quantity: true,
          orderNumber: true,
        },
      },
    },
  });

  if (order.length === 0) {
    return next(new ErrorResponse(resource404Error("order"), 400));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

/**
 * Get all orders details
 * @route   PATCH /api/v1/orders/orderDetails/all
 * @access  Private (superadmin)
 */
export const getOrderDetails = asyncHandler(async (req, res, next) => {
  try {
    const orderDetails = await prisma.orderDetail.findMany();

    res.status(200).json({
      success: true,
      count: orderDetails.length,
      data: orderDetails,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      count: 0,
      data: [],
    });
  }
});

/**
 * Create new order
 * @route   POST /api/v1/orders
 * @access  Public
 */
export const createOrder = asyncHandler(async (req, res, next) => {
  type Products = {
    id: number;
    quantity: number;
    option: number;
  }[];

  const customerId: string | undefined = req.body.customerId;
  const shippingAddress: string | undefined = req.body.shippingAddress;
  const totalPrice: string | undefined = req.body.totalPrice;
  let deliveryDate: string | Date | undefined = req.body.deliveryDate;
  const paymentType: PaymentType | undefined = req.body.paymentType; // optional
  const deliveryType: DeliveryType | undefined = req.body.deliveryType; // optional
  const products: Products | undefined = req.body.products; // [ { id: 1002, quantity: 1 }, { id: 1020, quantity: 3 }]
  const sendEmail: boolean | undefined = req.body.sendEmail; // optional

  const requiredFields = {
    customerId,
    shippingAddress,
    totalPrice,
    deliveryDate: deliveryDate as string,
  };

  const hasError = checkRequiredFields(requiredFields, next);
  if (hasError !== false) return hasError;

  if (!products || products.length < 1) {
    return next(
      new ErrorResponse(
        invalidArgError([
          {
            code: "missingProducts",
            message: "products cannot be empty",
          },
        ]),
        400
      )
    );
  }

  // Check payment type is either "CASH_ON_DELIVERY" or "BANK_TRANSFER"
  if (paymentType) {
    if (!checkPaymentType(paymentType))
      return next(new ErrorResponse(paymentTypeError, 400));
  }

  // Check payment type is either "STORE_PICKUP", "YANGON", "OTHERS"
  if (deliveryType) {
    if (!checkDeliveryType(deliveryType))
      return next(new ErrorResponse(deliveryTypeError, 400));
  }

  deliveryDate = new Date(deliveryDate as string);

  // Create an order
  const order = await prisma.order.create({
    data: {
      customerId: parseInt(customerId!),
      shippingAddress: shippingAddress as string,
      deliveryDate: deliveryDate,
      totalPrice: parseFloat(totalPrice as string),
      paymentType,
      deliveryType,
    },
    include: {
      customer: true,
    },
  });

  type OrderDetailData = {
    orderNumber: number;
    proOptionsId: number;
    quantity: number | undefined;
  }[];

  const orderDetailData: OrderDetailData = products.map(({ option, quantity }) => ({
    orderNumber: order.orderNumber,
    proOptionsId: option,
    quantity: quantity,
  }));

  const orderDetail = await prisma.orderDetail.createMany({
    data: orderDetailData,
    skipDuplicates: true,
  });

  let createdOrderDetail: (any & {
    proOptions: ProOptions;
  })[] = [];
  if (orderDetail) {
    createdOrderDetail = await prisma.orderDetail.findMany({
      where: {
        orderNumber: order.orderNumber,
      },

      select: {
        quantity: true,
        orderNumber: true,
        proOptions: {
          select: {
            id: true,
            color: true,
            price: true,
            size: true,
            stock: true,
            discount: true,
            images: true,
            productId: true,
            product: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  // if order and orderDetail succeed
  // and sendEmail option is true
  // if (order && orderDetail && sendEmail) {
  //   try {
  //     // get purchased items in formatted array
  //     const items = createdOrderDetail.map((orderItem) => ({
  //       name: orderItem.proOptions.color,
  //       qty: orderItem.quantity,
  //     }));

  //     // invoke emailTemplate function and
  //     // store returned html in message variable
  //     const message = emailTemplate(
  //       order.orderNumber,
  //       order.totalPrice,
  //       order.shippingAddress,
  //       "" + deliveryDate,
  //       items
  //     );

  //     // send email to user
  //     await sendMail({
  //       email: order.customer.email,
  //       subject: "Haru Fashion Order Received",
  //       message,
  //     });
  //     res.status(201).json({
  //       success: true,
  //       data: order,
  //       orderDetail: createdOrderDetail,
  //     });
  //   } catch (err) {
  //     // Log error
  //     console.error(err);

  //     return next(new ErrorResponse(defaultError, 500));
  //   }
  // }

  res.status(201).json({
    success: true,
    data: order,
    orderDetail: createdOrderDetail,
  });
});

/**
 * Delete order by id
 * @route   DELETE /api/v1/orders/:id
 * @access  Private (admin)
 */
export const deleteOrder = asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);

  await prisma.order.delete({
    where: { orderNumber: id },
  });

  res.status(204).json({
    success: true,
    data: [],
  });
});
