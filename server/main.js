import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import { TasksCollection } from "/imports/db/TasksCollection";
import "/imports/api/taskMethods";
import "/imports/api/taskPublications";

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

Meteor.startup(() => {
  //create a user if not created
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({ username: SEED_USERNAME, password: SEED_PASSWORD });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    ["First Task"].forEach((task) => insertTask(task, user));
  }
});
