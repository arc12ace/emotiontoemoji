Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality:90
});
Webcam.attach("#camera");

function clickPicture(){
    Webcam.snap(function (takeImg) {
        document.getElementById("result").innerHTML=`<img id="captured_image" src=${takeImg}>`
    })
}
console.log("ml5 version:", ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/YMRZApK35/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model has been loaded");
}

function speak(){
    var speech=window.SpeechSynthesis;
    speakData1="The first prediction is "+prediction1;
    speakData2="The second prediction is "+prediction2;
    var sayThis=new SpeechSynthesisUtterance(speakData1+speakData2);
}

function identify(){
    img=document.getElementById("captured_image");
    classifier.classify(img, getresult);
}

function getresult(error, results){
    if (error) {
        console.log(error)
    } else {
        console.log(results);
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        document.getElementById("emotion1").innerHTML=prediction1;
        document.getElementById("emotion2").innerHTML=prediction2;
        if(prediction1=="Shocked"){
            document.getElementById("emoji1").innerHTML="&#x1F632;";
        }
        if(prediction1=='The "tiktok"'){
            document.getElementById("emoji1").innerHTML="&#129318;"   
        }
           if(prediction1=="Smile"){
               document.getElementById("emoji1").innerHTML="&#128512;"
           }  
           if(prediction1=="Angry"){
               document.getElementById("emoji1").innerHTML="&#128545;"
           }   
           if(prediction2=="Shocked"){
            document.getElementById("emoji2").innerHTML="&#x1F632;";
        }
        if(prediction2=='The "tiktok"'){
            document.getElementById("emoji2").innerHTML="&#129318;"   
        }
           if(prediction2=="Smile"){
               document.getElementById("emoji2").innerHTML="&#128512;"
           }  
           if(prediction2=="Angry"){
               document.getElementById("emoji2").innerHTML="&#128545;"
           }   
           
                       
           
    }
}
