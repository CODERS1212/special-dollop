objectDetector = "";
status = "";
objects = [];
object_finder = "";
text="";


function setup() {
canvas = createCanvas(480,380);
canvas.center();
video = createCapture(VIDEO);
video.hide();

}

function start() {
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById('status').innerHTML = "Status Detecting";
text = document.getElementById('input').value;




}


function draw() {
    image(video, 0,0,480,380);

    if(status != ""){
        objectDetector.detect(video, gotResult);
    
 
    for(i=0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "status = objects dectected";
        document.getElementById("number_of_objects").innerHTML = "number of objects is "+objects.length;

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == text){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById('status').inneHTML = text+" found!!!!";
        }

        else{
            document.getElementById('status').inneHTML = text+" not found :(";
        }
    }
    
    }
}

function modelLoaded() {
    console.log("working");
    
}

function gotResult() {
    if(error) {
        console.log(error)
    }

    console.log(results);
    objects = results;
}