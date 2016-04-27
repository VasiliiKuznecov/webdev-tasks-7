var pig;

document.addEventListener('energyChanged', function () {
    document.querySelector('.pigagotchi__energy-value').innerHTML = pig.energy;
});

document.addEventListener('hungerChanged', function () {
    document.querySelector('.pigagotchi__hunger-value').innerHTML = pig.hunger;
});

document.addEventListener('moodChanged', function () {
    document.querySelector('.pigagotchi__mood-value').innerHTML = pig.mood;
});

document.addEventListener('stateChanged', function () {
    if (pig.prevState === 'listen') {
        recognizer.stop();
        document.querySelector('.pigagotchi__speech').classList.add('pigagotchi__speech_hidden');
    }
    if (pig.state === 'sleep') {
        Snap(document.querySelector('.pig-svg__left-eye')).animate({ry: 2}, 1000);
        Snap(document.querySelector('.pig-svg__right-eye')).animate({ry: 2}, 1000);
    }
    if (pig.prevState === 'sleep') {
        Snap(document.querySelector('.pig-svg__left-eye')).animate({ry: 7}, 1000);
        Snap(document.querySelector('.pig-svg__right-eye')).animate({ry: 7}, 1000);
    }
});

pig = new Pig();

pig.load();
pig.init();
pig.doNothing();

window.addEventListener('unload', function () {
    pig.save();
});

document.querySelector('.pigagotchi__restart-button').addEventListener('click', function () {
    pig.restart();
});

document.querySelector('.pigagotchi__feed-button').addEventListener('click', function () {
    if (pig.state === 'eat') {
        pig.doNothing();
    } else {
        pig.eat();
    }
});

document.addEventListener('pigDied', function () {
    alert('Хрюша умерла, да здраствует Хрюша!');
    pig.restart();
});

//у самого нет светодатчика, так что не тестил
if (Modernizr.ambientlight || 'ondevicelight' in window) {
    window.addEventListener('devicelevel', function(e) {
        if (e.value < 5) {
            pig.sleep();
        } else {
            if (pig.state === 'sleep') {
                pig.doNothing();
            }
        }
    });
}

//почему-то Modernizr.batteryapi говорит, что нет такого, хотя все работает
if (Modernizr.batteryapi || navigator.getBattery) {
    navigator.getBattery().then(function (battery) {
        battery.addEventListener('chargingchange', function (event) {
            if (this.charging) {
                if (pig.state !== 'sleep') {
                    pig.eat();
                }
            } else {
                if (pig.state === 'eat') {
                    pig.doNothing();
                }
            }
        });
    });
}

if (Modernizr.pagevisibility) {
    var hidden = null;
    var visibilityChange = null;

    if ('hidden' in document) {
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
    } else if ('mozHidden' in document) {
        hidden = 'mozHidden';
        visibilityChange = 'mozvisibilitychange';
    } else if ('webkitHidden' in document) {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
    }

    document.addEventListener(visibilityChange, function () {
        if (document[hidden]) {
            pig.sleep();
        } else {
            if (pig.state === 'sleep') {
                pig.doNothing();
            }
        }
    });
}

var SpeechRecognition;
var recognizer;

if (Modernizr.speechrecognition) {
    SpeechRecogntion = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognizer = new SpeechRecogntion();

    recognizer.lang = 'ru-RU';
    recognizer.continuous = true;
    recognizer.interimResults = true;

    recognizer.onresult = function (e) {
        document.querySelector('.pigagotchi__speech').innerHTML = e.results[e.resultIndex][0].transcript.trim();
        console.log(e.results);
    };
}

document.querySelector('.pigagotchi__svg').addEventListener('click', function () {
    if (pig.state === 'listen') {
        pig.doNothing();
    } else {
        if (pig.state !== 'sleep' && pig.state !== 'eat') {
            pig.listen();
            recognizer.start();
            document.querySelector('.pigagotchi__speech').classList.remove('pigagotchi__speech_hidden');
        }
    }
});

setTimeout(makeNoise, Math.random() * 10000)

function makeNoise() {
    if (Modernizr.webaudio) {
        var soundNumber = Math.floor(Math.random() * 5) + 1;
        new Howl({
            urls: ['/sounds/pig' + soundNumber + '.mp3'],
            volume: document.querySelector('.pigagotchi__volume-input').value * 0.25
        }).play();
    }
    setTimeout(makeNoise, Math.random() * 10000);
}

