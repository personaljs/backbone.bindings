(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'backbone', 'underscore'], factory);
	} else if (typeof module !== 'undefined' && module.exports) {
		var $ = require('jquery');
		var Backbone = require('backbone');
		var _ = require('underscore');
		module.exports = factory($, Backbone, _);
	} else {
		factory(root.$, root.Backbone, root._);
	}
})(this, function($, Backbone, _) {
	var getters = {
		value : function (model, attr, el) {
			var value;
			switch(el[0].nodeName) {
				case 'DIV':
					value = $el.text();
					break;
				case 'TEXTAREA':
				case 'INPUT':
					switch (el[0].type) {
						case 'radio' :
							value = el.checked().val();
							break;
						case 'checkbox' :
							value = el.checked();
							break;
						default :
							value = el.val();
							break;
					}
					break;
			}
			model.set(attr, value);
		},
		text : function (model, attr, el) {
			model.set(attr, el.text());
		},
		html : function (model, attr, el) {
			model.set(attr, el.html());
		}
	};

	var setters = {
		value : function (el, model, val) {
			el.val(val);
		},
		text : function (el, model, val) {
			el.text(val);
		},
		html : function (el, model, val) {
			el.html(val);
		}
	};

	Backbone.Bindings = {
		getters : getters,
		setters : setters
	};

	Backbone.View.prototype.checkBindings = function() {
		var bindEvents = this.bindings || {};
		_.each(bindEvents, this.bindFromStrings, this);
	};
	Backbone.View.prototype.bindFromStrings = function (types, string) {
		types = types.split('&');
		var bindView = string.match(/(<:|<>)/),
			bindModel = string.match(/(:>|<>)/),
			entity = string.match(/(\w+).(\w+).{2}(.+)/);

		var el = entity[3], target = entity[1], attr = entity[2];

		_.each(types, function (type) {
			if(bindView) this.$(el).on('input', _.bind( Backbone.Bindings.getters[type], this, this[target], attr, this.$(el)));
			if(bindModel) this.listenTo(this[target], 'change:' + attr, _.bind( Backbone.Bindings.setters[type], this, this.$(el)));
		}, this);
	};
});
