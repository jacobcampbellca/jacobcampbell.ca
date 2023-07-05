
var howFarDown = 13;
var descriptionTop = 14.5;
var removeTop = 8;
var price = 0;
const shoppingCart = window.sessionStorage.getItem('array');
const emptyCart = document.getElementById("emptyCart");
if(window.sessionStorage.getItem('array') == null ) {
    emptyCart.innerHTML = "cart is empty";
    document.getElementById("titleContainer").textContent = ""
    price = 0;
}
else {
    var arr = JSON.parse("[" + shoppingCart + "]");
    for(i = 0; i < arr.length; i++) {
        price += arr[i][3];
        document.getElementById('items').innerHTML += `
        <img class="cartImage" style="top:`+howFarDown+`%;" src="photos/`+arr[i][1]+`.jpeg" ></img>
        <div class="itemDescription" style="top: `+descriptionTop+`%;"><p>`+arr[i][1]+`</p>
        <p>`+arr[i][2]+`</p>
        <p style="font-size:larger;">$`+arr[i][3]+`</p></div>
        <div class="removeButton" id="`+arr[i][1]+`" style="top: `+removeTop+`%;" onclick="removeItem(this.id)">
            <div id="removeDetail1"></div>
            <div id="removeDetail2"></div>
        </div>`
        howFarDown += 20;
        descriptionTop += 20;
        removeTop += 30;
    }
    
}

document.getElementById("price").innerHTML = "Total: $"+ price;
window.sessionStorage.setItem("price", price);


function continueClicked() {
    if(price == 0) {
        alert("Cart is Empty");
    }
    else {
        location.href = "information.html"
    }
}


function removeItem(id) {
    
    var arr = JSON.parse("[" + shoppingCart + "]");
    for(var i = 0; i < arr.length; i++) {
        if(id == arr[i][1]) {
            arr.splice(i,1);
            var newArr = JSON.stringify(arr);
            newArr = newArr.substring(1,newArr.length-1);
            if(arr.length == 0) {
                window.sessionStorage.removeItem('array');
            }
            else {
                window.sessionStorage.setItem('array', newArr);
            }

            if(id == "Patek Phillipe") {
                window.sessionStorage.removeItem("patekClicked")
            }
            else if(id == "Cartier") {
                window.sessionStorage.removeItem("cartierClicked")
            }
            location.reload();
        }
    }
    return;
}


$(document).ready(function(){
    
    $("#navDropdown").click(function(){
        $("#navScreen").fadeToggle("slow");
        $("#itemContainer").fadeToggle("slow");
        $("#emptyCart").fadeToggle("slow");     
    });
    
});

