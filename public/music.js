let isPlaying = false;
let currentTrack = 1;
fetch('/getTracks', {
    method: "POST"
}).then(function(response) {
    return response.json()})
.then(function(data) {
    window.sessionStorage.setItem('totalTracks', data)
    document.getElementById("trackNumberContainer").innerHTML = "Playing " +currentTrack+ " of " +data;
});

let listOfSongs = '{ "songs" : [' +
'{ "number":"0", "name":"aye aye captain", "artist":"cassius king" , "location":"music/aye aye captain.mp3", "art":"albumArt/aye aye captain.jpg", "length":174 },' +
'{ "number":"1", "name":"DANCE", "artist":"cassius king" , "location":"music/DANCE.mp3", "art":"albumArt/DANCE.jpg", "length":48  },' +
'{ "number":"3", "name":"blackbird", "artist":"cassius king" , "location":"music/blackbird.mp3", "art":"albumArt/blackbird.jpg", "length":71  },' +
'{ "number":"4", "name":"dreamstate", "artist":"cassius king" , "location":"music/dreamstate.mp3", "art":"albumArt/dreamstate.jpg", "length":125  },' +
'{ "number":"5", "name":"i\'d rather be your enemy", "artist":"cassius king" , "location":"music/i\'d rather be your enemy.mp3", "art":"albumArt/i\'d rather be your enemy.jpg", "length":80  },' +
'{ "number":"6", "name":"let\'s get wild", "artist":"cassius king" , "location":"music/let\'s get wild.mp3", "art":"albumArt/let\'s get wild.jpg", "length":108  } ]}' ;

const obj = JSON.parse(listOfSongs);

var audio = new Audio(obj.songs[0].location);

$(document).ready(function(){ 
    $("#navDropdown").click(function(){
        $("#navScreen").fadeToggle("slow");
        $("#itemContainer").fadeToggle("slow");
        $("#emptyCart").fadeToggle("slow");     
    });
    
    $("#play").click(function(){
        $("#pause").fadeToggle(0);  
        $("#play").fadeToggle(0); 
        audio.play();
        isPlaying = true;
    });

    $("#pause").click(function(){
        $("#pause").fadeToggle(0);  
        $("#play").fadeToggle(0);  
        audio.pause();
        isPlaying = false;
    });

    $("#forward").click(function(){
        let totalTracks =  window.sessionStorage.getItem('totalTracks');
        if(currentTrack == totalTracks) {
            currentTrack = 1;
        }
        else {
            currentTrack++; 
        }
         document.getElementById("trackNumberContainer").innerHTML = "Playing " +currentTrack+ " of " +totalTracks;
         audio.pause()
         audio = new Audio(obj.songs[currentTrack - 1].location)
         document.getElementById("label1").innerHTML = "0:00";
        var minutes = (obj.songs[currentTrack - 1].length/60);
        var displayMinutes = Math.trunc(minutes)
        var displaySeconds = obj.songs[currentTrack - 1].length % 60
        if(displaySeconds.toString().length == 1) {
            displaySeconds = "0" + displaySeconds
        }
        document.getElementById("label2").innerHTML = displayMinutes + ":" + displaySeconds;
         if(isPlaying) {
            audio.play();
         }

         document.getElementById("photo").src = obj.songs[currentTrack - 1].art;
         document.getElementById("trackNameContainer").innerHTML = obj.songs[currentTrack - 1].name;
         document.getElementById("artistNameContainer").innerHTML = obj.songs[currentTrack - 1].artist;
         document.getElementById("slider").value = 0;

    }); 

    $("#back").click(function(){
        let totalTracks =  window.sessionStorage.getItem('totalTracks');
        if(currentTrack == 1) {
            currentTrack = totalTracks;
        }
        else {
            currentTrack--; 
        }
         document.getElementById("trackNumberContainer").innerHTML = "Playing " +currentTrack+ " of " +totalTracks;
         audio.pause()
         audio = new Audio(obj.songs[currentTrack - 1].location)
         document.getElementById("label1").innerHTML = "0:00";
        var minutes = (obj.songs[currentTrack - 1].length/60);
        var displayMinutes = Math.trunc(minutes)
        var displaySeconds = obj.songs[currentTrack - 1].length % 60
        if(displaySeconds.toString().length == 1) {
            displaySeconds = "0" + displaySeconds
        }
        document.getElementById("label2").innerHTML = displayMinutes + ":" + displaySeconds;
         if(isPlaying) {
            audio.play();
         }

         document.getElementById("photo").src = obj.songs[currentTrack - 1].art;
         document.getElementById("trackNameContainer").innerHTML = obj.songs[currentTrack - 1].name;
         document.getElementById("artistNameContainer").innerHTML = obj.songs[currentTrack - 1].artist;
         document.getElementById("slider").value = 0;

    });


    
    
    window.setInterval(() => {
        document.getElementById("slider").value = audio.currentTime;
        document.getElementById("slider").max = obj.songs[currentTrack - 1].length
        

        if(Math.trunc(audio.currentTime) < 60) {
            if(Math.trunc(audio.currentTime) < 10) {
                document.getElementById("label1").innerHTML = "0:0" + Math.trunc(audio.currentTime)
            }
            else {
                document.getElementById("label1").innerHTML = "0:" + Math.trunc(audio.currentTime)
            }
        }
        else {
            var minutes = (audio.currentTime/60);
            var displayMinutes = Math.trunc(minutes)
            var displaySeconds = audio.currentTime % 60
            if(displaySeconds < 10) {
                document.getElementById("label1").innerHTML = displayMinutes + ":0" + Math.trunc(displaySeconds);
            }
            else {
                document.getElementById("label1").innerHTML = displayMinutes + ":" + Math.trunc(displaySeconds);
            }
            
        }
    }, 1000);

    $("#slider").change(function(){
        window.setTimeout(() => {
            audio.currentTime = document.getElementById("slider").value
        })
    });

    

    document.getElementById("photo").src = obj.songs[currentTrack - 1].art;
    document.getElementById("trackNameContainer").innerHTML = obj.songs[currentTrack - 1].name;
    document.getElementById("artistNameContainer").innerHTML = obj.songs[currentTrack - 1].artist;

    var minutes = (obj.songs[currentTrack - 1].length/60);
    var displayMinutes = Math.trunc(minutes)
    var displaySeconds = obj.songs[currentTrack - 1].length % 60
    if(displaySeconds.toString().length == 1) {
        displaySeconds = "0" + displaySeconds
    }
    document.getElementById("label2").innerHTML = displayMinutes + ":" + displaySeconds;
});







