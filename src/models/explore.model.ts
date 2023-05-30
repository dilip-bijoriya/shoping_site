import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        start_date: {
            type: Date,
            required: true,
            trim: true,
        },
        end_date: {
            type: Date,
            required: true,
            trim: true,
        },
        content: [
            {
                type: {
                    type: String,
                    required: true,
                    enum: ["slider", "banner", "heading", "grid1", "grid2", "scroll"],
                },
                visiblity: {
                    display: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    onClick: {
                        type: String,
                        required: true,
                        trim: true
                    }
                }
            }
        ]
    },
    {
        timestamps: true,
    }
);

const exploreModel = model("Explore", schema);
export default exploreModel;
