$(document).ready(function(){
    
    $("#navDropdown").click(function(){
        $("#navScreen").fadeToggle("slow");
        $("#itemContainer").fadeToggle("slow");
        $("#emptyCart").fadeToggle("slow");     
    });

    $("#checkoutButton").click(function() {
        var termsAccepted = document.getElementById("acceptTerms").checked
        if(termsAccepted) {
            location.href = "payment.html";
        }
        else {
            window.alert("Please accept Terms and Conditions to continue.")
        }
    })
    
});