import { userModel } from "@/models/user-model";
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
async function createUser(user) {
  return await userModel.create(user);
}

async function findUserByCredential(credential) {
  const user = await userModel.findOne(credential).lean();
  return user;
}

export { getAllEvent, getEventById, createUser, findUserByCredential };
