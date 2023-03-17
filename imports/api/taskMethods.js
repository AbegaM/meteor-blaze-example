import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";

import { TasksCollection } from "../db/TasksCollection";

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  "tasks.remove"(taskId) {
    check(taskId, String);
    //do data validation for userId
    check(this.userId, String);

    // if (!this.userId) {
    //   throw new Meteor.Error("Not authorized.");
    // }

    //in production use projection to fetch sepcific fields
    const task = TasksCollection.findOne(
      { _id: taskId, userId: this.userId },
      { fields: ["name"] }
    );

    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    TasksCollection.remove(taskId);
  },

  "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    //pass projection field here
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error("Access denied.");
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
