class CookieClickerWorker {
	#CLICKER_NAMES = {
		AUTO_CLICKER: 'autoClicker',
		GOLD_COOKIE_CLICKER: 'goldCookieClicker'
	};
	
	#cheated = false;
	#worker;

	constructor() {
		let workerScript;
		try {
			var blob = new Blob (["\
			var intervals = {};\
			onmessage = function (event) {\
				var data = event.data,\
					action = data.action,\
					name = data.name,\
					time = data.time;\
				switch (action) {\
					case 'setInterval':\
						intervals[name] = setInterval(function () {\
							postMessage({name: name});\
						}, time);\
						break;\
					case 'clearInterval':\
						if (intervals.hasOwnProperty (name)) {\
							clearInterval(intervals[name]);\
							delete intervals[name];\
						}\
						break;\
				}\
			}\
			"]);
			workerScript = window.URL.createObjectURL(blob);
		} catch (error) {
			console.log('Blob is not supported, use external script instead' + error);
		}
		try {
			this.#worker = new Worker (workerScript);
			this.#worker.onmessage = this.#handleMessage.bind(this);
			this.#worker.onerror = function (event) {
				console.log('Unknow error:');
				console.log(event);
			};
		} catch (error) {
			console.log ('Initialisation of web worker failed');
			console.error (error);
		}
		
		this.settings = {
			wrathCookieClick: false,
			spawnGoldCookie: false,
			cookieClicksAmount: 10, /* value between 1 - 5000 is reasonable, depends on your pc */
		}
		this.createAutoClicker();
		this.createGoldCookieClicker();
	}
  
	createAutoClicker() {
		this.#postMessage({action: 'setInterval', name: this.#CLICKER_NAMES.AUTO_CLICKER, time: 1 })
	}

	createGoldCookieClicker() {
		this.#postMessage({action: 'setInterval', name: this.#CLICKER_NAMES.GOLD_COOKIE_CLICKER, time: 1000 })
	}

	stopAutoClicker() {
		this.#postMessage({action: 'clearInterval', name: this.#CLICKER_NAMES.AUTO_CLICKER})
	}

	stopGoldCookieClicker() {
		this.#postMessage({action: 'clearInterval', name: this.#CLICKER_NAMES.GOLD_COOKIE_CLICKER})
	}

	terminateWorker() {
		this.#worker.terminate();
		console.log("Worker terminated.");
	}

	#handleMessage(event) {
		var data = event.data,
			name = data.name;
		switch(name) {
			case this.#CLICKER_NAMES.AUTO_CLICKER:
				this.#autoClicker(name);
			case this.#CLICKER_NAMES.GOLD_COOKIE_CLICKER:
				this.#goldCookieClicker(name);
		}
	}
  
	#postMessage(data) {
	  this.#worker.postMessage(data);
	  console.log("Message sent to worker:", data);
	}
	
	#autoClicker(name) {
		try {
			if(!this.#cheated) {
				this.#cheated = true;
				for(var i = 0; i < this.settings.cookieClicksAmount; i++) {
					Game.ClickCookie();
					Game.lastClick = 0;
				}
				this.#cheated = false;
			}
		} catch (err) {
			console.error('Stopping auto clicker');
			this.#postMessage({action: 'clearInterval', name: name});
		}
	}

	#goldCookieClicker(name) {
		try {
			var parentElement = document.getElementById("shimmers");
			for (var i = 0; i < parentElement.children.length; i++) {
				var childElement = parentElement.children[i];
				if (childElement.getAttribute('alt') === "Golden cookie") {
					childElement.click();
			  	} else if (childElement.getAttribute('alt') === "Wrath cookie") {
					if (this.settings.wrathCookieClick) {
						childElement.click();
					}
				}
			}
			if (this.settings.spawnGoldCookie && parentElement.children.length === 0) {
				Game.shimmerTypes.golden.minTime = 5;
				Game.shimmerTypes.golden.maxTime = 20;
			}
		} catch (err) {
			console.error('Stopping goldenCookie clicker' + err);
			this.#postMessage({action: 'clearInterval', name: name});
		}
	}
}

const clicker = new CookieClickerWorker();

