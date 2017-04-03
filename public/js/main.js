'use strict'
//namespacing
var kyle = {};
kyle.ui = {};
// contact page form 
kyle.ui.contactForm = function(formElm, resElm) {
	var self = this;
	// jquery vars
	var $formElm = $("#" + formElm);
	var $resElm = $("#" + resElm);

	this.formData = "";
	this.valid = false;
	this.validationMsg = "";

	this.init = function() {
		self.events.resetForm();
		self.events.hideResponse();
		self.bindEvents();
	};
	this.bindEvents = function() {
		$('body').on('submit', $formElm, function(e) {
			e.preventDefault();
			self.formData = self.events.getFormData($formElm);
			self.events.validateFields();
			self.events.submitForm(self.formData);
		});
	};
	this.events = {
		getFormData: function($formElm) {
			var unindexed_array = $formElm.serializeArray();
			var indexed_array = {};
			$.map(unindexed_array, function(n, i) {
				indexed_array[n['name']] = n['value'];
			});
			return JSON.stringify(indexed_array);
		},
		submitForm: function(data) {
			if (self.validationMsg === "") {
				$.ajax({
					type: "POST",
					url: "/contact",
					data: self.formData,
					contentType: "application/json",
					success: function(data) {
						self.events.displayResponse(data);
					},
					error: function(data) {
						self.events.displayResponse(data.responseText, "error");
					}
				}).done(function() {
					self.events.resetForm();
				});
			} else {
				self.events.displayResponse(self.validationMsg, "error");
			}
		},
		resetForm: function() {
			// reset form elms
			$('input[type=text],input[type=email]').val('').removeClass('error');
			$('textarea').val('').removeClass('error');
		},
		displayResponse: function(msg, error) {
			error === "error" ? $resElm.addClass("error") : $resElm.removeClass("error");
			$resElm.slideDown(300).html(msg);
		},
		hideResponse: function() {
			$resElm.slideUp(300).removeClass('error').html('');
		},
		validateFields: function() {
			self.validationMsg = "";
			var name = $formElm.find("#name");
			var email = $formElm.find("#email");
			var subject = $formElm.find("#subject");
			var message = $formElm.find("#message");
			// validate name
			if (name.val().length < 3) {
				name.addClass('error');
				self.validationMsg += "<li>Please Include your name.</li>"
			} else {
				name.removeClass('error');
			}
			// validate email
			if (email.val().length < 1) {
				email.addClass('error');
				self.validationMsg += "<li>Please include a your email address.</li>"
			} else if (!validateEmail(email.val())) {
				email.addClass('error');
				self.validationMsg += "<li>Please use a valid email.</li>"
			} else {
				email.removeClass('error');
			}

			function validateEmail(email) {
				var re = /\S+@\S+\.\S+/;
				return re.test(email);
			}
			// validate subject
			if (subject.val().length < 2) {
				subject.addClass('error');
				self.validationMsg += "<li>Please include a subject line for your message.</li>"
			} else {
				subject.removeClass('error');
			}
			// validate message
			if (message.val().length < 5) {
				message.addClass('error');
				self.validationMsg += "<li>Please include a message for me.</li>"
			} else {
				message.removeClass('error');
			}
		}
	};
	// Public methods
	return {
		init: function() {
			self.init();
		}
	};
};
// display year method
kyle.ui.displayYear = function(elemId) {
	var self = this;
	var date = "";
	// jquery vars
	var $yearElm = $('#' + elemId);
	// init
	this.init = function() {
		// store new date obj
		date = new Date();
		// bind events
		self.bindEvents();
	};
	// bind events to handlers
	this.bindEvents = function() {
		$yearElm.html(self.events.getYear(date));
	};
	// private event methods
	this.events = {
		getYear: function(dateObj) {
			// get the year from the passed in date object
			return dateObj.getFullYear();
		}
	};
	// Public methods
	return {
		init: function() {
			self.init();
		}
	};
}
