img = "";
status="";
objects = [];

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600,500);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
}

function modelLoaded() {
        console.log("Model Loaded ");
        status = true;
        objectDetector.detect(video,gotResult);
    }

function draw() {
    image(video,0,0,600,500);
     
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);  
}
  
function gotResult(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);

    for(i = 0; i < results.length; i++)
    {
        console.log(results[i].label);
      
      //  document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected:"+results.length;

        fill(r,g,b);
        percent = floor(results[i].confidence * 100);
        text(results[i].label+""+percent+"%",results[i].x+15,results[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(results[i].x,results[i].y,results[i].width,results[i].height);
        
       
        if(results[i].label == 'person'){
            document.getElementById("status").innerHTML = "Status :Baby is safe";
            stopAlert();      
        }else{
            document.getElementById("status").innerHTML = "Status : Baby Missing";
            playAlert();

        }

    }

}
    

    var sound; 
  
    function preload() { 
      
        // Initialize sound 
        sound = loadSound("Tornado_Siren_II-Delilah-747233690.mp3"); 
    } 
      
    function playAlert() { 
      
        // Playing the preloaded sound 
        sound.play(); 
    } 

    function stopAlert() { 
      
        // Playing the preloaded sound 
        sound.stop(); 
    } 
    
  

    
        
       
    






    
    