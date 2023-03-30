import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { Template } from "meteor/templating";

import "./Task.html";

Template.task.onCreated(function () {
  this.isUpdateLoading = new ReactiveVar(false);
});

Template.task.events({
  "click .toggle-checked"(event, template) {
    try {
      const { data } = Template.instance();
      template.isUpdateLoading.set(true);

      Meteor.setTimeout(async function () {
        await Meteor.callAsync("tasks.setIsChecked", data._id, !data.isChecked);
        template.isUpdateLoading.set(false);
      }, 768);
    } catch (error) {
      console.log(error);
    }
  },

  async "click .delete"() {
    try {
      await Meteor.callAsync("tasks.remove", this._id);
    } catch (error) {
      console.log(error);
    }
  },
});

Template.task.helpers({
  isUpdateLoading() {
    const instance = Template.instance();
    return instance.isUpdateLoading.get();
  },
});
