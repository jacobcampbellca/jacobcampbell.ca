var price = window.sessionStorage.getItem('price');
//document.getElementById("checkoutButton").innerHTML = "Pay: $" + price;


const stripe = Stripe("pk_test_51Ji4DQFXfhxckIUbBKYGq8kIaENIEkpay6SxSUNDuQkAdOdSzeS16eKB7YbFK76PqPXj6UZGtcyHhBaqRToGCFSf00bTlKtt9K");

let elements;

initialize();

// Fetches a payment intent and captures the client secret
async function initialize() {
    var cartToSend = window.sessionStorage.getItem('array');
    var mailingInformation = window.sessionStorage.getItem('info');
    var postData = {
        cart: cartToSend,
        info: mailingInformation
    }
  
    const response = await fetch("/myapi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  const { clientSecret } = await response.json();
  console.log(clientSecret)

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#ff0000',
      colorBackground: '#22201d',
      colorText: '#ffffff',
    },
  };
  elements = stripe.elements({ appearance, clientSecret });

  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");
}

var thisLocation = location.hostname
async function handleSubmit(e) {
    setLoading(true);
  
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://"+thisLocation+"/paymentSuccess.html",
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      showMessage(error.message);
    } else {
      showMessage("An unexpected error occurred.");
    }
  
    setLoading(false);
}


async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
  
    if (!clientSecret) {
      return;
    }
  
    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
  
    switch (paymentIntent.status) {
      case "succeeded":
        showMessage("Payment succeeded!");
        break;
      case "processing":
        showMessage("Your payment is processing.");
        break;
      case "requires_payment_method":
        showMessage("Your payment was not successful, please try again.");
        break;
      default:
        showMessage("Something went wrong.");
        break;
    }
}



function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");
  
    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;
  
    setTimeout(function () {
      messageContainer.classList.add("hidden");
      messageText.textContent = "";
    }, 4000);
  }
  
  // Show a spinner on payment submission
  function setLoading(isLoading) {
    if (isLoading) {
      // Disable the button and show a spinner
      document.querySelector("#submit").disabled = true;
      document.querySelector("#spinner").classList.remove("hidden");
      document.querySelector("#button-text").classList.add("hidden");
    } else {
      document.querySelector("#submit").disabled = false;
      document.querySelector("#spinner").classList.add("hidden");
      document.querySelector("#button-text").classList.remove("hidden");
    }
  }

$(document).ready(function(){
    
    $("#navDropdown").click(function(){
        $("#navScreen").fadeToggle("slow");
        $("#itemContainer").fadeToggle("slow");
        $("#emptyCart").fadeToggle("slow");     
    });
    
});

/*function dateFormatter() {
    const inputField = document.getElementById('expiry');
    const formattedInputValue = formatDate(inputField.value);
    inputField.value = formattedInputValue;
}

function formatDate(value) {
    if (!value) return value;
    const date = value.replace(/[^\d]/g, '');
    const dateLength = date.length;
    if (dateLength < 3) return date;
    return `${date.slice(0,2)}/${date.slice(2)}`;
    
}

String.prototype.toCardFormat = function () {
    return this.replace(/[^0-9]/g, "").substr(0, 16).split("").reduce(cardFormat, "");
    function cardFormat(str, l, i) {
        return str + ((!i || (i % 4)) ? "" : "-") + l;
    }
};
    
$(document).ready(function(){
    $("#cardNumber").keyup(function () {
        $(this).val($(this).val().toCardFormat());
    });
});*/




