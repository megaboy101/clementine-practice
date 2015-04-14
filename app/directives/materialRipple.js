(function (window, angular, undefined) {
	'use strict';

	var matRipple = angular.module('materialRipple', []);

	matRipple.directive('materialRipple', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var x, y, size, offsets;

				element.on('click', function (event) {
					var ripple = this.querySelector('.material-ripple');
					var eventType = event.type;

					if (ripple === null) {
						
						ripple = document.createElement('span');
						ripple.classList.add('material-ripple');

						this.insertBefore(ripple, this.firstChild);

						console.dir('offsetHeight: ' + element[0].offsetHeight);
						console.dir('offsetWidth: ' + element[0].offsetWidth);

						if (!ripple.offsetHeight && !ripple.offsetWidth) {
							size = Math.max(element[0].offsetWidth, element[0].offsetHeight);
							ripple.style.width = size + 'px';
							ripple.style.height = size + 'px';
						}
						console.log('size: ' + size);
					}

					ripple.classList.remove('animate');

					if (eventType === 'click') {
						x = event.pageX;
						y = event.pageY;
					}
					console.log('x: ' + x);
					console.log('y: ' + y);

					function getPosition (element) {
						var docElement = document.documentElement;
						var elemSize = element.getBoundingClientRect();
						var top = elemSize.top + window.pageYOffset - docElement.clientTop;
						var left = elemSize.left + window.pageXOffset - docElement.clientLeft;

						console.dir('elemTop: ' + elemSize.top);
						console.dir('top: ' + top);
						console.dir('left: ' + left);

						return { top: top, left: left };

					}

					offsets = getPosition (element[0]);
					console.dir('offsets: ' + offsets);
					ripple.style.left = (x - offsets.left - size / 2) + 'px';
					ripple.style.top = (y  - offsets.top - size / 2) + 'px';

					ripple.classList.add('animate');
				});
			}
		};
	});
})(window, window.angular);