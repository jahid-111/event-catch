import { replaceMongoIdInArray } from "@/utils/data-util";

const { eventModel } = require("@/models/event-model");

async function getAllEvent() {
  const allEvent = await eventModel.find().lean();
  return replaceMongoIdInArray(allEvent);
}

export { getAllEvent };
