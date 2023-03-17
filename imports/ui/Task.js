import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

import "./Task.html";

Template.task.events({
  "click .toggle-checked"(event) {
    Meteor.call("tasks.setIsChecked", this._id, !this.isChecked);
    this.isLoading = false;
  },
  "click .delete"() {
    Meteor.call("tasks.remove", this._id);
  },
});
