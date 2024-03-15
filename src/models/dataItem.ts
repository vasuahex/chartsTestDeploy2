

import mongoose, { Schema } from "mongoose";
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const contentSchema = new Schema({
  sourceName: {
    type: String,
    required: false // Assuming this is a required field based on your structure
  },
  fileType: {
    type: String,
    enum: ['csv', 'url'], // Adjusted to match the specified types
    required: false
  },
  status: {
    type: String,
    enum: ['inactive', 'active', 'currentlyInUse', 'archived'], // Adding Status with specified enum
    required: false
  },
  description: {
    type: String,
    // Optional, based on your needs
  },
  fileName: {
    type: String,
    required: false
  },
  data: { // Assuming this field is to reference other documents or data
    type: Schema.Types.Mixed,
    required: false
  },
  sourceType: {
    type: String,
    required: false
  }
}, { timestamps: true }); // This enables automatic handling of createdAt and updatedAt fields

const dataItemSchema = new Schema({
  content: [contentSchema],
  user_id: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Also applying timestamps here for the dataItem document

const DataItem = mongoose.models.DataItem || mongoose.model("DataItem", dataItemSchema);
export default DataItem;
