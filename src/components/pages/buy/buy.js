import React from 'react';

function Buy() {
    const handlePurchase = () => {
        alert("Purchase completed!");
        // Add your purchase logic here
    };

    return (
        <div>
            <h1>Buy</h1>
            <button onClick={handlePurchase}>Buy Now</button>
        </div>
    );
}

export default Buy;
