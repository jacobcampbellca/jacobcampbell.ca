$(document).ready(function(){
    
    $("#navDropdown").click(function(){
        $("#navScreen").fadeToggle("slow");
        $("#itemContainer").fadeToggle("slow");
        $("#emptyCart").fadeToggle("slow");     
    });
    
});

function submitInfo() {  
    
    var first, last, email, address, city, province, country, postal, phone;
    first = document.getElementById("firstName").value;
    last = document.getElementById("lastName").value;
    email = document.getElementById("email").value;
    address = document.getElementById("address").value;
    city = document.getElementById("city").value;
    province = document.getElementById("province").value;
    country = document.getElementById("country").value;
    postal = document.getElementById("postal").value;
    phone = document.getElementById("phone").value;
    
    
    var firstComplete;
    if(first != "") {
        document.getElementById("firstName").style = "background-color: #ffffff"
        firstComplete = true;
    }
    else {
        document.getElementById("firstName").style = "background-color: #ffcccd"
        firstComplete = false;
    }

    var lastComplete;
    if(last != "") {
        document.getElementById("lastName").style = "background-color: #ffffff"
        lastComplete = true;
    }
    else {
        document.getElementById("lastName").style = "background-color: #ffcccd"
        lastComplete = false;
    }

    var emailComplete
    if(email != "") {
        document.getElementById("email").style = "background-color: #ffffff"
        emailComplete = true;
    }
    else {
        document.getElementById("email").style = "background-color: #ffcccd"
        emailComplete = false;
    }

    var addressComplete;
    if(address != "") {
        document.getElementById("address").style = "background-color: #ffffff"
        addressComplete = true;
    }
    else {
        document.getElementById("address").style = "background-color: #ffcccd"
        addressComplete = false;
    }

    var cityComplete;
    if(city != "") {
        document.getElementById("city").style = "background-color: #ffffff"
        cityComplete = true;
    }
    else {
        document.getElementById("city").style = "background-color: #ffcccd"
        cityComplete = false;
    }

    var provinceComplete;
    if(province != "") {
        document.getElementById("province").style = "background-color: #ffffff"
        provinceComplete = true;
    }
    else {
        document.getElementById("province").style = "background-color: #ffcccd"
        provinceComplete = false;
    }

    var countryComplete;
    if(country != "") {
        document.getElementById("country").style = "background-color: #ffffff"
        countryComplete = true;
    }
    else {
        document.getElementById("country").style = "background-color: #ffcccd"
        countryComplete = false;
    }

    var postalComplete;
    if(postal != "") {
        document.getElementById("postal").style = "background-color: #ffffff"
        postalComplete = true;
    }
    else {
        document.getElementById("postal").style = "background-color: #ffcccd"
        postalComplete = false;
    }

    var phoneComplete;
    if(phone != "") {
        document.getElementById("phone").style = "background-color: #ffffff"
        phoneComplete = true;
    }
    else {
        document.getElementById("phone").style = "background-color: #ffcccd"
        phoneComplete = false;
    }

    if(firstComplete && lastComplete && emailComplete && addressComplete && cityComplete && provinceComplete && countryComplete && postalComplete && phoneComplete) {
        var toSession  = "[\""+first+"\", \""+last+"\", \""+address+"\", \""+email+"\", \""+city+"\", \""+province+"\", \""+country+"\", \""+postal+"\", "+phone+"]"
        window.sessionStorage.setItem("info", toSession);
        location.href = "terms.html"
    }
    
}

/*function phoneNumberFormatter() {
    const inputField = document.getElementById('phone');
    const formattedInputValue = formatPhoneNumber(inputField.value);
    inputField.value = formattedInputValue;
  }

  function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6, 9)}`;
  }*/
  