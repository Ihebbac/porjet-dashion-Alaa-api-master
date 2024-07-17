import prisma from "../prisma/client";
import asyncHandler from "../middlewares/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import { errorTypes, resource404Error } from "../utils/errorObject";
import {
  checkRequiredFields,
  orderedQuery,
  selectedQuery,
} from "../utils/helperFunctions";
import { Prisma } from ".prisma/client";

/**
 * Get all categories
 * @route   GET /api/v1/categories
 * @access  Public
 */
export const getcollections = asyncHandler(async (req, res, next) => {
  // Type Declaration
  type OrderType = { [key: string]: string };

  // Request Queries
  const querySelect = req.query.select;
  const queryOrder = req.query.order_by;

  // Filter and Sorting initial values
  let select: Prisma.CategorySelect | undefined = undefined;
  let orderBy: OrderType[] = [];

  // If select is sent along with request
  if (querySelect) {
    select = selectedQuery(querySelect as string);
  }

  // If order_by is sent along with request
  if (queryOrder) {
    orderBy = orderedQuery(queryOrder as string);
  }

  // Find categories with Prisma Client
  const categories = await prisma.collection.findMany({
    select,
    orderBy,
  });

  res
    .status(200)
    .json({ success: true, count: categories.length, data: categories });
});

/**
 * Get specific collection
 * @route   GET /api/v1/categories/:id
 * @access  Public
 */
export const getcollection = asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);
  const querySelect = req.query.select;
  let select: Prisma.CategorySelect | undefined;

  // If select specific fields, response only selected query
  if (querySelect) {
    select = selectedQuery(querySelect as string);
  }

  const collection = await prisma.collection.findUnique({
    where: { id },
    select,
  });

  // Throws an error if collection does not exists
  if (!collection) {
    return next(new ErrorResponse(resource404Error("collection"), 404));
  }

  res.status(200).json({
    success: true,
    data: collection,
  });
});

/**
 * Create a new collection
 * @route   POST /api/v1/categories
 * @access  Private (admin)
 */
export const createcollection = asyncHandler(async (req, res, next) => {
  const queryName: string | undefined = req.body.name;
  const id: number | undefined = parseInt(req.body.id) || undefined;
  const description: string | undefined = req.body.description;
  const thumbnailImage: string | undefined = req.body.thumbnailImage;
  let name: string | undefined;

  // Throws an error if name field is not specified
  const hasError = checkRequiredFields({ name: queryName }, next);
  if (hasError !== false) return hasError;

  // Trim the name and change it to lower-case
  name = (queryName as string).trim().toLowerCase();

  // Create a collection in prisma client
  const collection = await prisma.collection.create({
    data: {
      id: id as number,
      name: name as string,
      description,
      thumbnailImage,
    },
  });

  res.status(201).json({
    success: true,
    location: `${req.protocol}://${req.get("host")}${req.baseUrl}/${
      collection.id
    }`,
    data: collection,
  });
});

/**
 * Delete a collection
 * @route   DELETE /api/v1/categories/:id
 * @access  Private (admin)
 */
export const deletecollection = asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);

  await prisma.collection.delete({
    where: { id },
  });

  res.status(204).json({
    success: true,
    data: [],
  });
});

/**
 * Update collection
 * @route   PUT /api/v1/categories/:id
 * @access  Private
 */
export const updatecollection = asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);
  const name: string | undefined = req.body.name;
  const description: string | undefined = req.body.description;
  const thumbnailImage: string | undefined = req.body.thumbnailImage;

  const collection = await prisma.collection.update({
    where: { id },
    data: {
      name,
      description,
      thumbnailImage,
      updatedAt: new Date().toISOString(),
    },
  });

  res.status(200).json({
    success: true,
    data: collection,
  });
});
