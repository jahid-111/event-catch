import {
  replaceMongoIdInArray,
  replaceMongoIdInObjet,
} from "@/utils/data-util";

const { eventModel } = require("@/models/event-model");

async function getAllEvent() {
  const allEvent = await eventModel.find().lean();
  return replaceMongoIdInArray(allEvent);
}

async function getEventById(eventId) {
  const event = await eventModel.findById(eventId).lean();
  return replaceMongoIdInObjet(event);
}
export { getAllEvent, getEventById };
