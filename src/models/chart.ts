import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the chart data
interface ChartData {
  Options: {
    ChartType: string;
    Dimensions: string[];
    Measures: string[];
    Filters: string[];
  };
  Data: {
    "X-keys": string[];
    "Y-keys": number[];
  }[];
  Styles?: Record<string, any>;
}

// Define the schema for the chart data
const ChartSchema = new Schema<ChartData>({
  Options: {
    type: {
      ChartType: { type: String, required: true },
      Dimensions: [{ type: String, required: true }],
      Measures: [{ type: String, required: true }],
      Filters: [{ type: String, required: true }],
    },
    required: true,
  },
  Data: {
    type: [
      {
        "X-keys": [{ type: String, required: true }],
        "Y-keys": [{ type: Number, required: true }],
      },
    ],
    required: true,
  },
  Styles: {
    type: Schema.Types.Mixed,
    required: false, // Styles are optional
  },
});

// Define the model for the chart data
const ChartModel =
  mongoose.models.Chart || mongoose.model("Chart", ChartSchema);

export default ChartModel;
