var arraySize = 0;
cartArray = null;
shoppingCart = window.sessionStorage.getItem('array');

if(window.sessionStorage.getItem('patekClicked') == 'true') {
    document.getElementById("PatekPhillipe").value = "added to cart";
}
if(window.sessionStorage.getItem('cartierClicked') == 'true') {
    document.getElementById("Cartier").value = "added to cart";
}

$(document).ready(function(){
    $("#navDropdown").click(function(){
        $("#navScreen").fadeToggle("slow");
        $(".window").fadeToggle("slow");  
        return;  
    });

    

    patekClicked = false;
    $("#PatekPhillipe").click(function(){
        if(!patekClicked && window.sessionStorage.getItem('patekClicked') != "true") {
            document.getElementById("PatekPhillipe").value = "added to cart";
            window.sessionStorage.setItem('patekClicked', true);
            
            if(shoppingCart === null && cartArray === null) {
                cartArray = '[1, "Patek Phillipe","Nautilus",16000]';
                window.sessionStorage.setItem('array', cartArray);
            }
            else if(shoppingCart === null && cartArray !== null) {
                cartArray += ',[1, "Patek Phillipe","Nautilus",16000]';
                window.sessionStorage.setItem('array', cartArray);
            }
            else {
                shoppingCart += (',[1, "Patek Phillipe","Nautilus",16000]');
                window.sessionStorage.setItem('array', shoppingCart);
            }
            
            patekClicked = true;
            arraySize++

        }  
    });

    cartierClicked = false;
    $("#Cartier").click(function(){
        if(!cartierClicked && window.sessionStorage.getItem('cartierClicked') !== "true") {
            
            document.getElementById("Cartier").value = "added to cart";
            window.sessionStorage.setItem('cartierClicked', true);
            
            if(shoppingCart === null && cartArray === null) {
                cartArray = '[2, "Cartier","Grand Tourbillon",62499]';
                window.sessionStorage.setItem('array', cartArray)
            }
            else if(shoppingCart === null && cartArray !== null) {
                cartArray += ',[2, "Cartier","Grand Tourbillon",62499]';
                window.sessionStorage.setItem('array', cartArray);
            }
            else {
                shoppingCart += ',[2, "Cartier","Grand Tourbillon",62499]';
                window.sessionStorage.setItem('array', shoppingCart);
            }
            cartierClicked = true;
            arraySize++;
        }  
    });

  });

