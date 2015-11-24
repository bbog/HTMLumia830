(function () {

	var reference = 'Swiper'

	var Swiper = function (options) {

		var DRAG_MINIMUM_DURATION = 400;

		var target    = (typeof options.target !== 'undefined') ? options.target : document.body,
			direction = options.direction,
			callback  = (typeof options.callback === 'function') ? options.callback : function () {};


		var hasTouch = ('ontouchstart' in window);

		var startEvent  = hasTouch ? 'touchstart' : 'mousedown',
			moveEvent   = hasTouch ? 'touchmove' : 'mousemove',
			endEvent    = hasTouch ? 'touchend' : 'mouseup';
			cancelEvent = hasTouch ? 'touchcancel' : 'mouseup',
			outEvent    = 'mouseout';

		var dragStarted = false,
			isDragged   = true,
			swipeData = {}


		var isMultiTouch = function (ev) {
		
			if (!ev.touches) {
				return false;
			}
		
			return ev.touches.length > 1;
		};



		var handleEvent = function (ev) {

			if (ev.type === startEvent) {
				onStartEvent(ev);
				addSwipeListeners();
			} else if (ev.type === moveEvent) {
				onMoveEvent(ev);
			} else if (ev.type === endEvent || ev.type === cancelEvent || ev.type === outEvent) {
				onEndEvent(ev);
				removeSwipeListeners();
			}
		};


		var addSwipeListeners = function () {
			
			target.addEventListener(moveEvent, handleEvent, false);
			target.addEventListener(endEvent, handleEvent, false);
			target.addEventListener(cancelEvent, handleEvent, false);
			target.addEventListener(outEvent, handleEvent, false);
		};


		var removeSwipeListeners = function () {

			target.removeEventListener(moveEvent, handleEvent, false);
			target.removeEventListener(endEvent, handleEvent, false);
			target.removeEventListener(cancelEvent, handleEvent, false);
			target.removeEventListener(outEvent, handleEvent, false);
		};


		
		var onStartEvent = function (ev) {

			if (!isMultiTouch(ev)) {

				dragStarted = true;

				swipeData.currentEvent = (ev.changedTouches) ? ev.changedTouches[0] : ev;

				swipeData.initialX = swipeData.currentEvent.pageX;
				swipeData.initialY = swipeData.currentEvent.pageY;
				
				swipeData.previousX = swipeData.currentEvent.pageX;
				swipeData.previousY = swipeData.currentEvent.pageY;

				swipeData.totalDistanceX = 0;
				swipeData.totalDistanceY = 0;

				swipeData.dragStartedTime = (new Date()).getTime();
			}


			ev.preventDefault();
			ev.stopPropagation();
		};


		var onMoveEvent = function (ev) {

			if (dragStarted) {

				isDragged = true;

				swipeData.currentEvent = (ev.changedTouches) ? ev.changedTouches[0] : ev;

				swipeData.currentX = swipeData.currentEvent.pageX;
				swipeData.currentY = swipeData.currentEvent.pageY;

				swipeData.previousX = swipeData.currentEvent.pageX;
				swipeData.previousY = swipeData.currentEvent.pageY;

				totalDistanceX = swipeData.currentX - swipeData.initialX;
				totalDistanceY = swipeData.currentY - swipeData.initialY;
			}
		};


		var onEndEvent = function (ev) {

			if (!dragStarted)
				return;

			swipeData.dragDuration = (new Date()).getTime() - swipeData.dragStartedTime;

			dragStarted = false;		

			if (isDragged && swipeData.dragDuration < DRAG_MINIMUM_DURATION) {

				var movedMoreHorizontally = Math.abs(totalDistanceX) > Math.abs(totalDistanceY),
					movedMoreVertically   = Math.abs(totalDistanceY) > Math.abs(totalDistanceX),
					movedTowardsTop    = totalDistanceY < 0,
					movedTowardsBottom = totalDistanceY > 0,
					movedTowardsLeft   = totalDistanceX < 0,
					movedTowardsRight  = totalDistanceX > 0;


				switch (direction) {

					case 'up':
						if (movedMoreVertically && movedTowardsTop) {
							swipeData.direction = 'up';
							callback(swipeData);
						}
						break;

					case 'down':
						if (movedMoreVertically && movedTowardsBottom) {
							swipeData.direction = 'down';
							callback(swipeData);
						}
						break;

					case 'left':
						if (movedMoreHorizontally && movedTowardsLeft) {
							swipeData.direction = 'left';
							callback(swipeData);
						}
						break;

					case 'right':
						if (movedMoreHorizontally && movedTowardsRight) {
							swipeData.direction = 'right';
							callback(swipeData);
						}
						break;

					default:
						callback(swipeData);
						break;
				}
			}
		};


		

		// begin!
		target.addEventListener(startEvent, handleEvent, false);
	};


	window[reference] = window[reference] || Swiper;
})();