var Pig = (function() {
    var instance;

    function Pig (params) {
        if (!instance) {
            instance = this;
        } else {
            return instance;
        }

        this.meterIncreaseTime = 1000;
        this.meterDecreaseTime = 5000;

        if (params === undefined) {
            this.energy = 100;
            this.hunger = 100;
            this.mood = 100;
            return;
        }

        this.energy = params.energy;
        this.hunger = params.hunger;
        this.mood = params.mood;
        this.state = null;
        this.prevState = null;
    }

    Pig.prototype.init = function () {
        document.dispatchEvent(new Event('energyChanged'));
        document.dispatchEvent(new Event('hungerChanged'));
        document.dispatchEvent(new Event('moodChanged'));
    }

    Pig.prototype.restart = function () {
        this.state = null;
        this.prevState = this.state;

        this.energy = 100;
        this.hunger = 100;
        this.mood = 100;
        this.init();
    }

    Pig.prototype.updateMetersSince = function (time) {
        var timePassed = Date.now() - time;
        var minutesPassed = Math.round(timePassed / 60000);

        this.increase('energy', 4 * minutesPassed);
        this.decrease('hunger', minutesPassed);
        this.decrease('mood', minutesPassed);
    };

    Pig.prototype.increase = function (meter, numberOfTimes) {
        numberOfTimes = numberOfTimes === undefined ? 1 : numberOfTimes;
        this[meter] = this[meter] + numberOfTimes;
        if (this[meter] > 100) {
            this[meter] = 100;
            this.doNothing();
            document.dispatchEvent(new Event(meter + 'Full'));
        }
        document.dispatchEvent(new Event(meter + 'Changed'));
    };

    Pig.prototype.decrease = function (meter, numberOfTimes) {
        numberOfTimes = numberOfTimes === undefined ? 1 : numberOfTimes;
        this[meter] = this[meter] - numberOfTimes;
        if (this[meter] < 0) {
            this[meter] = 0;
            if (!this.isAlive() && this.state !== 'died') {
                this.die();
            }
        }
        if (this[meter] === 10) {
            document.dispatchEvent(new Event(meter + 'Low'));
        }
        document.dispatchEvent(new Event(meter + 'Changed'));
    };

    Pig.prototype.sleep = function () {
        this.clearIntervals();

        this.energyInterval = setInterval(this.increase.bind(this, 'energy'), this.meterIncreaseTime);
        this.hungerInterval = setInterval(this.decrease.bind(this, 'hunger'), this.meterDecreaseTime);
        this.moodInterval = setInterval(this.decrease.bind(this, 'mood'), this.meterDecreaseTime);

        this.prevState = this.state;
        this.state = 'sleep';
        document.dispatchEvent(new Event('stateChanged'));
    };

    Pig.prototype.eatApple = function () {
        pig.increase('hunger', 5);
    }

    Pig.prototype.eat = function () {
        this.clearIntervals();

        this.energyInterval = setInterval(this.decrease.bind(this, 'energy'), this.meterDecreaseTime);
        this.hungerInterval = setInterval(this.increase.bind(this, 'hunger'), this.meterIncreaseTime);
        this.moodInterval = setInterval(this.decrease.bind(this, 'mood'), this.meterDecreaseTime);

        this.prevState = this.state;
        this.state = 'eat';
        document.dispatchEvent(new Event('stateChanged'));
    };

    Pig.prototype.listenPhrase = function () {
        this.increase('mood', 10);
    };

    //Вроде надо прибавлять настроение за каждую фразу, а не линейно, поэтому тут уменьшается mood
    Pig.prototype.listen = function () {
        this.clearIntervals();

        this.energyInterval = setInterval(this.decrease.bind(this, 'energy'), this.meterDecreaseTime);
        this.hungerInterval = setInterval(this.decrease.bind(this, 'hunger'), this.meterDecreaseTime);
        this.moodInterval = setInterval(this.decrease.bind(this, 'mood'), this.meterDecreaseTime);

        this.prevState = this.state;
        this.state = 'listen';
        document.dispatchEvent(new Event('stateChanged'));
    };

    Pig.prototype.doNothing = function () {
        this.clearIntervals();

        this.energyInterval = setInterval(this.decrease.bind(this, 'energy'), this.meterDecreaseTime);
        this.hungerInterval = setInterval(this.decrease.bind(this, 'hunger'), this.meterDecreaseTime);
        this.moodInterval = setInterval(this.decrease.bind(this, 'mood'), this.meterDecreaseTime);

        this.prevState = this.state;
        this.state = 'doNothing';
        document.dispatchEvent(new Event('stateChanged'));
    };

    Pig.prototype.die = function () {
        this.clearIntervals();

        this.prevState = this.state;
        this.state = 'died';
        document.dispatchEvent(new Event('pigDied'));
    };

    Pig.prototype.clearIntervals = function () {
        clearInterval(this.energyInterval);
        clearInterval(this.hungerInterval);
        clearInterval(this.moodInterval);
    };

    Pig.prototype.isAlive = function () {
        return (this.energy > 0 && this.hunger > 0)
            || (this.energy > 0 && this.mood > 0)
            || (this.hunger > 0 && this.mood > 0);
    };

    Pig.prototype.save = function () {
        if (Modernizr.localstorage) {
            localStorage.pig = JSON.stringify({
                energy: this.energy,
                hunger: this.hunger,
                mood: this.mood
            });
            localStorage.lastVisitTime = Date.now();
        }
    }

    Pig.prototype.load = function () {
        if (Modernizr.localstorage && localStorage.pig) {
            var params = JSON.parse(localStorage.pig);

            this.energy = params.energy;
            this.hunger = params.hunger;
            this.mood = params.mood;

            pig.init();
            if (!this.isAlive()) {
                pig.die();
                return;
            }

            if (localStorage.lastVisitTime) {
                this.updateMetersSince(localStorage.lastVisitTime);
            }

        }
    }

    return Pig;
})();
