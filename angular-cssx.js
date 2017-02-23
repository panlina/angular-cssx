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
	})