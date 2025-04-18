"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UpcomingEventSchema = new Schema(
  {
    serialNo: { type: String},
    eventRandomId: { type: String},
    meetingChannel: { type: String },
    meetingDate: { type: String },
    meetingTime: { type: String },
    meetingAgenda: { type: String },
    meetingVenue: { type: String  },
    timeZone: { type: String  },
    details: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("UpcomingEvent", UpcomingEventSchema);
