x = 0;
y = 0;
screenWidth = 0
screenHeight = 0
apple = ""
drawApple = "";
speakData = ""
toNumber = ""

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function preload() {
    apple = loadImage('apple.png')
}

function start() {
    document.getElementById("status").innerHTML = "System is listening please speak";
    recognition.start();
}

recognition.onresult = function(event) {

    console.log(event);

    content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content;

    toNumber = Number(content)
    if (Number.isInteger(toNumber)) {
        document.getElementById('status').innerHTML = 'Started drawing apples'
        drawApple = "set"
    } else {
        document.getElementById('status').innerHTML = 'We have not recognized a number'
    }
}

function setup() {
    screenWidth = window.innerWidth
    screenHeight = window.innerHeight
    console.log(screenWidth, screenHeight)
    canvas = createCanvas(screenWidth, screenHeight - 150)
    canvas.position(0, 150)
}

function draw() {
    if (drawApple == "set") {
        document.getElementById("status").innerHTML = toNumber + " Apples drawn";
        drawApple = "";
        for (var i = 1; i <= toNumber; i = i + 1) {
            x = Math.floor(Math.random() * screenWidth - 50)
            y = Math.floor(Math.random() * screenHeight - 50)
            image(apple, x, y, 50, 50)
            document.getElementById('status').innerHTML = toNumber + " Apples drawn"
            speakData = toNumber + " Apples drawn"
            speak()
        }
    }

    function speak() {
        var synth = window.speechSynthesis;

        var utterThis = new SpeechSynthesisUtterance(speakData);

        synth.speak(utterThis);
        speakData = "";
    }
}