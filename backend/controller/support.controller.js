import mongoose from "mongoose";
import { Initiative } from "../models/initiative.model.js";
import { Supporter } from "../models/supporter.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getMongoosePaginationOptions } from "../utils/helper.js";

const supportInitiative = asyncHandler(async (req, res) => {
  const { initiativeId } = req.params;
  const { amount } = req.body;

  // Check if the initiative exists
  const initiative = await Initiative.findById(initiativeId);

  if (!initiative) {
    throw new ApiError(404, "Initiative does not exist");
  }

  // Add support to the initiative
  const supporter = await Supporter.create({
    supporterId: req.user._id,
    supportedInitiative: initiativeId,
    amount,
  });

  // Update the amount received by the initiative
  initiative.amountReceived += amount;
  await initiative.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      { supporting: true, supporter },
      "Support added successfully"
    )
  );
});

const getSupportersListByInitiativeId = asyncHandler(async (req, res) => {
  const { initiativeId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  // Check if the initiative exists
  const initiative = await Initiative.findById(initiativeId);

  if (!initiative) {
    throw new ApiError(404, "Initiative does not exist");
  }

  const supportersAggregate = Supporter.aggregate([
    {
      $match: {
        supportedInitiative: new mongoose.Types.ObjectId(initiativeId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "supporterId",
        foreignField: "_id",
        as: "supporter",
        pipeline: [
          {
            $lookup: {
              from: "profiles",
              localField: "_id",
              foreignField: "owner",
              as: "profile",
            },
          },
          {
            $addFields: { profile: { $first: "$profile" } },
          },
          {
            $project: {
              username: 1,
              email: 1,
              avatar: 1,
              profile: 1,
              amount: 1
            },
          },
        ],
      },
    },
    {
      $addFields: {
        supporter: { $first: "$supporter" },
      },
    },
    {
      $project: {
        _id: 0,
        supporter: 1,
        amount: 1
      },
    },
  ]);

  const supportersList = await Supporter.aggregatePaginate(
    supportersAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalSupporters",
        docs: "supporters",
      },
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { initiative, ...supportersList },
        "Supporters list fetched successfully"
      )
    );
});

export {
  supportInitiative,
  getSupportersListByInitiativeId,
};
