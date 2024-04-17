estatus = false
lista = []
persona = false

function setup() {
    canvas = createCanvas(500, 300)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    detectorobjetos = ml5.objectDetector("cocossd", modelLoaded)
}
function draw() {
    image(video, 0, 0, width, height)
    if(estatus == true) {
        video.size(width, height)
        detectorobjetos.detect(video, Respuestas)
        persona = false
        for(i = 0; i < lista.length; i ++) {
            obj = lista[i]
            if(obj.label == "person") {
                persona = true
            }
            porcentaje = round(obj.confidence*100)
            stroke("red")
            strokeWeight(5)
            noFill()
            rect(obj.x, obj.y, obj.width, obj.height)
            noStroke()
            fill("black")
            textSize(15)
            textStyle(BOLD)
            text(obj.label + " " + porcentaje + "%", obj.x, obj.y + 10)
        }
        if(persona == true) {
            alarma.stop()
        } else if (!alarma.isPlaying()) {
            alarma.play()
        }
        document.getElementById("status").innerHTML = lista.length + " objetos detectados"
    }
}
function modelLoaded() {
    console.log("Cargo cocossd")
    estatus = true
}
function Respuestas(error, resultados) {
    if(error) {
        console.error("ERROR")
    } else {
        console.log(resultados)
        lista = resultados
    }
}
function preload() {
    alarma = loadSound("nuclear_alarm.mp3")
}