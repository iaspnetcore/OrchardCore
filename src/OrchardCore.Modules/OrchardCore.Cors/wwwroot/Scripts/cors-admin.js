/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

var optionsList = Vue.component('options-list', {
  props: ['options', 'optionType', 'title', 'subTitle'],
  template: '#options-list',
  data: function data() {
    return {
      'newOption': ''
    };
  },
  methods: {
    addOption: function addOption(value) {
      if (value !== null && value !== '') {
        var noDuplicates = $.inArray(value.toLowerCase(), this.options.map(function (o) {
          return o.toLowerCase();
        })) < 0;
        if (noDuplicates) {
          this.options.push(value);
        }
      }
    },
    deleteOption: function deleteOption(value) {
      this.options.splice($.inArray(value, this.options), 1);
    }
  }
});
var policyDetails = Vue.component('policy-details', {
  components: {
    optionsList: optionsList
  },
  props: ['policy'],
  template: '#policy-details'
});
var corsApp = new Vue({
  el: '#corsAdmin',
  components: {
    policyDetails: policyDetails,
    optionsList: optionsList
  },
  data: {
    selectedPolicy: null,
    policies: null,
    defaultPolicyName: null
  },
  updated: function updated() {
    this.searchBox();
  },
  methods: {
    newPolicy: function newPolicy() {
      this.selectedPolicy = {
        name: 'New policy',
        allowedOrigins: [],
        allowAnyOrigin: true,
        allowedMethods: [],
        allowAnyMethod: true,
        allowedHeaders: [],
        allowAnyHeader: true,
        allowCredentials: true,
        isDefaultPolicy: false,
        exposedHeaders: []
      };
    },
    editPolicy: function editPolicy(policy) {
      this.selectedPolicy = Object.assign({}, policy);
      this.selectedPolicy.originalName = this.selectedPolicy.name;
    },
    deletePolicy: function deletePolicy(policy, event) {
      this.selectedPolicy = null;
      var policyToRemove = this.policies.filter(function (item) {
        return item.name === policy.name;
      });
      if (policyToRemove.length > 0) this.policies.splice($.inArray(policyToRemove[0], this.policies), 1);
      event.stopPropagation();
      this.save();
    },
    updatePolicy: function updatePolicy(policy, event) {
      if (policy.isDefaultPolicy) {
        this.policies.forEach(function (p) {
          return p.isDefaultPolicy = false;
        });
      }
      if (policy.originalName) {
        var policyIndex = this.policies.findIndex(function (oldPolicy) {
          return oldPolicy.name === policy.originalName;
        });
        this.policies[policyIndex] = policy;
      } else {
        this.policies.push(policy);
      }
      this.save();
      this.back();
    },
    save: function save() {
      document.getElementById('corsSettings').value = JSON.stringify(this.policies);
      document.getElementById('corsForm').submit();
    },
    back: function back() {
      this.selectedPolicy = null;
    },
    searchBox: function searchBox() {
      var searchBox = $('#search-box');

      // On Enter, edit the item if there is a single one
      searchBox.keypress(function (event) {
        if (event.which == 13) {
          // Edit the item if there is a single filtered element
          var visible = $('#corsAdmin > ul > li:visible');
          if (visible.length == 1) {
            window.location = visible.find('.edit').attr('href');
          }
          return false;
        }
      });

      // On each keypress filter the list
      searchBox.keyup(function (e) {
        var search = $(this).val().toLowerCase();
        var elementsToFilter = $("[data-filter-value]");

        // On ESC, clear the search box and display all
        if (e.keyCode == 27 || search == '') {
          searchBox.val('');
          elementsToFilter.toggle(true);
          $('#list-alert').addClass("d-none");
        } else {
          var intVisible = 0;
          elementsToFilter.each(function () {
            var text = $(this).data('filter-value').toLowerCase();
            var found = text.indexOf(search) > -1;
            $(this).toggle(found);
            if (found) {
              intVisible++;
            }
          });

          // We display an alert if a search is not found
          if (intVisible == 0) {
            $('#list-alert').removeClass("d-none");
          } else {
            $('#list-alert').addClass("d-none");
          }
        }
      });
    }
  }
});