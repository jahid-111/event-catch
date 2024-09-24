import { userModel } from "@/models/user-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObjet,
} from "@/utils/data-util";
import mongoose from "mongoose";

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
  if (user) {
    return replaceMongoIdInObjet(user);
  }
  return null;
}

async function updateInterest(eventId, authId) {
  const event = await eventModel.findById(eventId);

  if (event) {
    const foundUser = event.interested_ids.find(
      (id) => id.toString() === authId
    );

    if (foundUser) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }
    event.save();
  }
}

export {
  getAllEvent,
  getEventById,
  createUser,
  findUserByCredential,
  updateInterest,
};
