import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { Template } from "meteor/templating";

import "./Task.html";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Template.task.onCreated(function () {
  this.isUpdateLoading = new ReactiveVar(false);
});

Template.task.events({
  async "click .toggle-checked"(event, template) {
    try {
      template.isUpdateLoading.set(true);
      await Meteor.call("tasks.setIsChecked", this._id, !this.isChecked);
      await sleep(3000);
      template.isUpdateLoading.set(false);
    } catch (error) {
      console.log(error);
    }
  },
  "click .delete"() {
    Meteor.call("tasks.remove", this._id);
  },
});

Template.task.helpers({
  isUpdateLoading() {
    return Template.instance().isUpdateLoading.get();
  },
});
