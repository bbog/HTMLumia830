var Lumia = (function () {

	/** Utilities **/
	function getRandomInt (min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var screensaverTimeInterval;
	function init () {

		powerOnScreen();
		
		initScreensaver();
		screensaverTimeInterval = setInterval(function () {
			initScreensaver();
		}, 60000);
	};


	/** Power on **/
	function powerOnScreen() {

		showFirstBootScreen();
	};


	function showFirstBootScreen (firstBootScreen) {

		var firstBootScreen  = document.getElementById('power-on-first-screen');

		TweenMax.to(firstBootScreen, 0.5, {
			opacity: 0,
			delay: 1,
			onComplete: showSecondBootScreen
		});
	};


	function showSecondBootScreen (secondBootScreen) {

		var secondBootScreen = document.getElementById('power-on-second-screen');

		TweenMax.to(secondBootScreen, 0.5, {
			opacity: 1,
			onComplete: hideBootScreen
		});
	};


	function hideBootScreen (bootScreen) {

		var bootScreen = document.getElementById('power-on-screen');

		TweenMax.to(bootScreen, 0.2, {
			opacity: 0,
			delay: 1,
			onComplete: function () {
				bootScreen.style.display = 'none';
			}
		});
	}


	/** Screensaver **/	
	function initScreensaver () {

		initTime();
		initDay();
		initDate();

		randomizeScreensaverPosition();

		bindScreensaverEvents();
	};


	function initTime () {

		var timeContainer = document.getElementById('screensaver-time');
		if (timeContainer) {

			var date = new Date,
				hour = date.getHours(),
				minutes = date.getMinutes();

			if (hour < 10) {
				hour = '0' + hour;
			}

			if (minutes < 10) {
				minutes = '0' + minutes;
			}

			var currentTime = hour + ':' + minutes;
			timeContainer.innerHTML = currentTime;
		}
	};


	function initDay () {

		var dayContainer = document.getElementById('screensaver-day');
		if (dayContainer) {

			var date = new Date,
				days = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
				dayIndex = date.getDay(),
				day  = days[dayIndex];

			dayContainer.innerHTML = day;
		}
	};


	function initDate () {

		var dateContainer = document.getElementById('screensaver-date');
		if (dateContainer) {

			var date = new Date,
				months = 'January February March April May June July August September Octomber November December'.split(' '),
				monthIndex = date.getMonth(),
				month  = months[monthIndex],
				dayOfMonth = date.getDate();

			var currentDate = dayOfMonth + ' ' + month;
			dateContainer.innerHTML = currentDate;
		}
	};


	function randomizeScreensaverPosition () {
		
		var screensaverInfo = document.getElementById('screensaver-info-wrapper');
		if (screensaverInfo) {
			
			var randomLeft = getRandomInt(1, 25),
				randomTop  = getRandomInt(0, 70);

			screensaverInfo.style.left = randomLeft + '%';
			screensaverInfo.style.top  = randomTop + '%';
		}
	};


	function bindScreensaverEvents () {

		var screensaver = document.getElementById('screensaver');

		Swiper({
			target: screensaver,
			direction: 'up',
			callback: function (eventData) {
				TweenMax.to(screensaver, 1.0, {
					y: '-100%',
					ease: Power4.easeOut
				});
			}
		});
	};


	return {
		init: init
	}

})();