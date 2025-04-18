"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MeetingRequestSchema = new Schema(
  {
    meetingCountry: { type: String },
    participant: { type: String },
    meetingChannel: { type: String },
    meetingDate: { type: String },
    meetingTime: { type: String },
    meetingFullName: { type: String },
    meetingEmail: { type: String },
    meetingPhone: { type: String },
    meetingAgenda: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("MeetingRequest", MeetingRequestSchema);
