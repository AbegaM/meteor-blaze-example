import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { Template } from "meteor/templating";

import "./Task.html";

Template.task.onCreated(function () {
  this.isUpdateLoading = new ReactiveVar(false);
});

Template.task.events({
  async "click .toggle-checked"(event) {
    try {
      Template.instance().isUpdateLoading.set(true);
      await Meteor.call("tasks.setIsChecked", this._id, !this.isChecked);
      Template.instance().isUpdateLoading.set(false);
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
