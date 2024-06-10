import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const supporterSchema = new Schema(
  {
    // The one who supports
    supporterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // Initiative that is being supported
    supportedInitiative: {
      type: Schema.Types.ObjectId,
      ref: "Initiative",
    },
    // Amount of support
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

supporterSchema.plugin(mongooseAggregatePaginate);

export const Supporter = mongoose.model("Supporter", supporterSchema);