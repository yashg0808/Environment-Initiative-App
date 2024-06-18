  import mongoose, { Schema } from "mongoose";
  import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

  const initiativeSchema = new Schema({
      title: {
        type: String,
        required: true,
        trim: true,
      },
      amountReceived: {
        type: Number,
        default: 0,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      location: {
        type: String,
        required: true,
      },
      goals: {
        type: [String],
        required: true,
      },
      tags: {
        type: [String],
        default: [],
      },
      status: {
        type: String,
        enum: ['planned', 'in-progress', 'completed'],
        default: 'planned',
      },
      images: {
        type: [
          {
            url: String,
            localPath: String,
          },
        ],
        default: [],
      },
      videos: [{
        url: String,
        description: String,
      }],
      supporters: [{
      type: Schema.Types.ObjectId,
      ref: 'Supporter',
    }],
      impactMetrics: {
        carbonReduction: {
          type: Number, // in tons
          default: 0,
        },
        wasteReduction: {
          type: Number, // in tons
          default: 0,
        },
        treesPlanted: {
          type: Number,
          default: 0,
        },
      },
      externalLinks: [{
        type: String,
      }],
    });

  initiativeSchema.plugin(mongooseAggregatePaginate);

  export const Initiative = mongoose.model("Initiative", initiativeSchema);