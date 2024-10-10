import React from 'react';


function Price() {
    const handlePriceCheck = () => {
        alert("Price checked!");
        
document.getElementById('approve-button').addEventListener('click', function() {
    const estimatedPrice = document.getElementById('estimated-price').value;
    const adjustedPrice = document.getElementById('adjusted-price').value || estimatedPrice;
    
    alert(`Price Approved: ${adjustedPrice}PKR`);
});

document.getElementById('send-confirmation').addEventListener('click', function() {
    const adjustedPrice = document.getElementById('adjusted-price').value;
    if (adjustedPrice) {
        alert(`Final Price Confirmation sent to user: ${adjustedPrice}PKR`);
    } else {
        alert('Please adjust the price before sending confirmation.');
    }
});
    };

    return (
        <div>
            <h1>Price Confirmation</h1>
            <button onClick={handlePriceCheck}>Check Price</button>
        </div>
    );
}

export default Price;
