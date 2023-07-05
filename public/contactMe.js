$(document).ready(function(){
    
    $("#navDropdown").click(function(){
        $("#navScreen").fadeToggle("slow");
        $("#itemContainer").fadeToggle("slow");
        $("#emptyCart").fadeToggle("slow");     
    });
    
});

function sendMessage() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value

    var nameComplete = true;
    if(name != "") {
        document.getElementById("name").style = "background-color: #ffffff"
        nameComplete = true;
    }
    else {
        document.getElementById("name").style = "background-color: #ffcccd"
        nameComplete = false;
    }

    var emailComplete = true;
    if(email != "") {
        document.getElementById("email").style = "background-color: #ffffff"
        emailComplete = true;
    }
    else {
        document.getElementById("email").style = "background-color: #ffcccd"
        emailComplete = false;
    }

    var subjectComplete = true;
    if(subject != "") {
        document.getElementById("subject").style = "background-color: #ffffff"
        subjectComplete = true;
    }
    else {
        document.getElementById("subject").style = "background-color: #ffcccd"
        subjectComplete = false;
    }

    var messageComplete = true;
    if(message != "") {
        document.getElementById("message").style = "background-color: #ffffff"
        messageComplete = true;
    }
    else {
        document.getElementById("message").style = "background-color: #ffcccd"
        messageComplete = false;
    }

    if(nameComplete && emailComplete && subjectComplete && messageComplete) {
        var postData = {
            from: email,
            to: 'jacobcampbellca@outlook.com',
            subject: subject + " - " + name,
            text: message + "\n sent from " + email,
        }
      
        fetch("/sendMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData),
        }).then(res => {if(res.status == 200) {
            console.log("success");
        }
        else {
            console.log("failure")
        }});

        location.href = 'messageSuccess.html'
    }
    

    
}