var pig;

document.addEventListener('energyChanged', function () {
    document.querySelector('.pigagotchi__energy-value').innerHTML = pig.energy;
});

document.addEventListener('hungerChanged', function () {
    document.querySelector('.pigagotchi__hunger-value').innerHTML = pig.hunger;
    Snap(document.querySelector('.pig-svg__body')).animate({ry: 118 - 25 + pig.hunger / 2}, 1000);
});

document.addEventListener('moodChanged', function () {
    document.querySelector('.pigagotchi__mood-value').innerHTML = pig.mood;
});

document.addEventListener('stateChanged', function () {
    if (pig.prevState === 'listen') {
        recognizer.stop();
        setTimeout(function () {
            document.querySelector('.pigagotchi__speech').classList.add('pigagotchi__speech_hidden');
        }, 3000);
    }

    if (pig.state === 'sleep') {
        closeEyes(1000);
    }

    if (pig.prevState === 'sleep') {
        openEyes(1000);
    }

    if (pig.state === 'eat') {
        eatApple();
    }

    if (pig.state === 'listen') {
        jump();
    }
});

var Notification;

document.addEventListener('pigDied', function () {
    if (Modernizr.notification) {
        Notification = window.Notification || window.webkitNotification;

        new Notification('Хрюша умерла.', {
            body: 'Очень грустно =(',
            icon: 'images/pig-dead.png'
        });
    }

    showDeadEyes();
    colorPig('#ddd', 1000);
});

document.addEventListener('appleAte', function () {
    if (pig.state === 'eat') {
        eatApple();
    } else {
        document.querySelector('.pigagotchi__feed-button').disabled = false;
        document.querySelector('.pigagotchi__feed-button').classList.remove('pigagotchi__feed-button_disabled');
    }
});

document.addEventListener('jumped', function () {
    if (pig.state === 'listen') {
        jump();
    }
});

function showDeadEyes() {
    Snap(document.querySelector('.pig-svg__left-eye')).animate({opacity: 0}, 100);
    Snap(document.querySelector('.pig-svg__right-eye')).animate({opacity: 0}, 100);
    Snap(document.querySelector('.pig-svg__left-dead-eye')).animate({opacity: 100}, 100);
    Snap(document.querySelector('.pig-svg__right-dead-eye')).animate({opacity: 100}, 100);
}

function showAliveEyes() {
    Snap(document.querySelector('.pig-svg__left-eye')).animate({opacity: 100}, 500);
    Snap(document.querySelector('.pig-svg__right-eye')).animate({opacity: 100}, 500);
    Snap(document.querySelector('.pig-svg__left-dead-eye')).animate({opacity: 0}, 500);
    Snap(document.querySelector('.pig-svg__right-dead-eye')).animate({opacity: 0}, 500);
}

function colorPig(color, time) {
    Snap(document.querySelector('.pig-svg__body')).animate({fill: color}, time);
    Snap(document.querySelector('.pig-svg__back-left-leg')).animate({fill: color}, time);
    Snap(document.querySelector('.pig-svg__back-right-leg')).animate({fill: color}, time);
    Snap(document.querySelector('.pig-svg__front-left-leg')).animate({fill: color}, time);
    Snap(document.querySelector('.pig-svg__front-right-leg')).animate({fill: color}, time);
    Snap(document.querySelector('.pig-svg__face')).animate({fill: color}, time);
    Snap(document.querySelector('.pig-svg__nose')).animate({fill: color}, time);
    Snap(document.querySelector('.pig-svg__left-ear')).animate({fill: color}, time);
    Snap(document.querySelector('.pig-svg__right-ear')).animate({fill: color}, time);
}

function closeEyes(time, callback) {
    Snap(document.querySelector('.pig-svg__left-eye')).animate({ry: 2}, time);
    Snap(document.querySelector('.pig-svg__right-eye')).animate({ry: 2}, time, mina.linear(), callback);
}

function openEyes(time) {
    Snap(document.querySelector('.pig-svg__left-eye')).animate({ry: 7}, time);
    Snap(document.querySelector('.pig-svg__right-eye')).animate({ry: 7}, time);
}

function eatApple() {
    Snap(document.querySelector('.pig-svg__apple')).animate({
        opacity: 100,
        transform: 'translate(120,-110)'
    }, 500, mina.linear(), function () {
        Snap(document.querySelector('.pig-svg__apple')).animate({
            opacity: 0,
            transform: 'translate(140,-130)'
        }, 1500);

        moveNose(16, 2, function () {
            Snap(document.querySelector('.pig-svg__apple')).transform('t0,0');
            document.dispatchEvent(new Event('appleAte'));
        });

        if (Modernizr.webaudio) {
            new Howl({
                urls: ['/sounds/apple.mp3'],
                volume: document.querySelector('.pigagotchi__volume-input').value * 0.25
            }).play();
        }
    });
}

function moveNose(times, shift, callback) {
    if (times === 0) {
        callback();

        return;
    }

    Snap(document.querySelector('.pig-svg__nose-group')).animate({
        transform: 'translate(0,' + shift + ')'
    }, 100, mina.linear(), function () {
        moveNose(times - 1, -shift, callback);
    });
}

function jump() {
    Snap(document.querySelector('.pig-svg__front-left-leg')).animate({transform: 'rotate(20,261.5,337.5)'}, 300);
    Snap(document.querySelector('.pig-svg__front-right-leg')).animate({transform: 'rotate(20,189.5,331.5)'}, 300);
    Snap(document.querySelector('.pig-svg__back-left-leg')).animate({transform: 'rotate(-20,577.5,336.5)'}, 300);
    Snap(document.querySelector('.pig-svg__back-right-leg')).animate({transform: 'rotate(-20,520.5,337.5)'}, 300,
        mina.linear(), function() {
            Snap(document.querySelector('.pig-svg__front-left-leg')).animate({transform: 'rotate(0,261.5,337.5)'}, 300);
            Snap(document.querySelector('.pig-svg__front-right-leg')).animate({transform: 'rotate(0,189.5,331.5)'}, 300);
            Snap(document.querySelector('.pig-svg__back-left-leg')).animate({transform: 'rotate(0,577.5,336.5)'}, 300);
            Snap(document.querySelector('.pig-svg__back-right-leg')).animate({transform: 'rotate(0,520.5,337.5)'}, 300,
                mina.linear(), function() {
                    document.dispatchEvent(new Event('jumped'));
                });
        });
}

pig = new Pig();

pig.load();
pig.init();
if (pig.isAlive()) {
    pig.doNothing();
}

if (Modernizr.localstorage && localStorage.volume !== undefined) {
    document.querySelector('.pigagotchi__volume-input').value = localStorage.volume;
}

window.addEventListener('unload', function () {
    pig.save();
    if (Modernizr.localstorage) {
        localStorage.volume = document.querySelector('.pigagotchi__volume-input').value;
    }
});

document.querySelector('.pigagotchi__restart-button').addEventListener('click', function () {
    if (pig.state === 'died') {
        showAliveEyes();
        colorPig('#ffdbff', 500);
    }
    pig.restart();
    pig.doNothing();
});

document.querySelector('.pigagotchi__feed-button').addEventListener('click', function () {
    if (pig.state === 'died' || pig.hunger === 100) {
        return;
    }

    if (pig.state !== 'sleep') {
        pig.doNothing();
        pig.eatApple();

        document.querySelector('.pigagotchi__feed-button').disabled = true;
        document.querySelector('.pigagotchi__feed-button').classList.add('pigagotchi__feed-button_disabled');
        eatApple();
    }
});

//у самого нет светодатчика, так что не тестил
if (Modernizr.ambientlight || 'ondevicelight' in window) {
    window.addEventListener('devicelevel', function(e) {
        if (pig.state === 'died') {
            return;
        }

        console.log(e.value);
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
//    document.querySelector('.pigagotchi__feed-button').classList.add('pigagotchi__feed-button_hidden');

    navigator.getBattery().then(function (battery) {
        if (pig.state === 'died') {
            return;
        }

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
        if (pig.state === 'died') {
            return;
        }

        if (document[hidden]) {
            pig.sleep();
        } else {
            if (pig.state === 'sleep') {
                pig.doNothing();
            }
        }
    });
}

if (Modernizr.notification) {
    Notification = window.Notification || window.webkitNotification;

    Notification.requestPermission(function () {
        document.addEventListener('energyLow', function () {
            if (document[hidden]) {
                new Notification('Спать хочется', {
                    body: 'Пора уложить хрюшу спать',
                    icon: 'images/pig.png'
                });
            }
        });

        document.addEventListener('energyFull', function () {
            if (document[hidden]) {
                new Notification('Выспалась!', {
                    body: 'Хрюша полностью выспалась',
                    icon: 'images/pig.png'
                });
            }
        });

        document.addEventListener('hungerLow', function () {
            if (document[hidden]) {
                new Notification('Кушать хочется', {
                    body: 'Пора покормить хрюшу',
                    icon: 'images/pig.png'
                });
            }
        });

        document.addEventListener('moodLow', function () {
            if (document[hidden]) {
                new Notification('Скучно и одиноко', {
                    body: 'Пора поговорить с хрюшей',
                    icon: 'images/pig.png'
                });
            }
        });
    });
}

var SpeechRecognition;
var recognizer;
var lastResultIndex;

if (Modernizr.speechrecognition) {
    SpeechRecogntion = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognizer = new SpeechRecogntion();

    recognizer.lang = 'ru-RU';
    recognizer.continuous = true;
    recognizer.interimResults = true;

    recognizer.addEventListener('result', function (e) {
        if (lastResultIndex !== e.resultIndex) {
            pig.listenPhrase();
            lastResultIndex = e.resultIndex;
        }
        document.querySelector('.pigagotchi__speech').innerHTML = e.results[e.resultIndex][0].transcript.trim();
    });

    recognizer.addEventListener('start', function () {
        document.querySelector('.pigagotchi__speech').innerHTML = '';
    });

    document.querySelector('.pigagotchi__svg').addEventListener('click', function () {
        if (pig.state === 'died') {
            return;
        }

        if (pig.state === 'listen') {
            pig.doNothing();
        } else {
            if (pig.state !== 'sleep' && pig.state !== 'eat') {
                pig.listen();
                lastResultIndex = null;
                recognizer.start();
                document.querySelector('.pigagotchi__speech').classList.remove('pigagotchi__speech_hidden');
            }
        }
    });
}

if (Modernizr.webaudio) {
    makeNoise();

    function makeNoise() {
        if (pig.state !== 'sleep' && pig.state !== 'died') {
            var soundNumber = Math.floor(Math.random() * 5) + 1;
            new Howl({
                urls: ['/sounds/pig' + soundNumber + '.mp3'],
                volume: document.querySelector('.pigagotchi__volume-input').value * 0.25
            }).play();
        }
        setTimeout(makeNoise, Math.random() * 10000 + 5000);
    }
}

setTimeout(blink, Math.random() * 3000 + 2000);

function blink() {
    if (pig.state !== 'sleep' && pig.state !== 'died') {
        closeEyes(200, function () {
            openEyes(200);
        });
    }
    setTimeout(blink, Math.random() * 3000 + 2000);
}