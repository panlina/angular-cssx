angular.module("angular-cssx", [])
	.directive('cssx', function (cssxConfig) {
		return {
			compile: function (element, attr) {
				var text = document.getElementById(attr.cssx).innerHTML;
				var elementrule = cssx(cssx.parse(text))(element);
				for (var id in elementrule) {
					var element = elementrule[id].element;
					var style = elementrule[id].style;
					for (var name in style) {
						var applier = cssxConfig.applier[name];
						applier.call(angular.element(element), style[name]);
					}
				}
			}
		};
	})
	.provider('cssxConfig', function () {
		return {
			applier: {},
			$get: function () { return this; }
		};
	})
	.config(function (cssxConfigProvider) {
		cssxConfigProvider.applier.before = function (value) { this.before(value); };
		cssxConfigProvider.applier.after = function (value) { this.after(value); };
		cssxConfigProvider.applier.class = function (value) { this.addClass(value); };
		cssxConfigProvider.applier.attr = function (value) { this.attr(value); };
		cssxConfigProvider.applier.text = function (value) { this.text(value); };
		cssxConfigProvider.applier.wrap = function (value) { this.wrap(value); };
		cssxConfigProvider.applier.replace = function (value) { this.replaceWith(value); };
		cssxConfigProvider.applier.remove = function () { this.remove(); };
	})