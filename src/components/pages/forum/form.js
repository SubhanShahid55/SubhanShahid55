import React from 'react';

const dropArea = document.querySelector(".drop_box"),
  button = dropArea.querySelector("button"),
  input = dropArea.querySelector("input");

let file;

const priceLabel = document.createElement("div");
priceLabel.className = "price-label";
priceLabel.style.marginTop = "10px";
dropArea.appendChild(priceLabel);

function determinePrice() {
  const deviceName = document.querySelector('input[placeholder="Device name"]').value.toLowerCase();
  const brand = document.querySelector('input[placeholder="Brand"]').value.toLowerCase();
  const model = document.querySelector('input[placeholder="Model"]').value.toLowerCase();

  let price = 0;

  if (deviceName.includes("iphone") || brand.includes("apple")) {
    price = 1000;
  } else if (brand.includes("samsung")) {
    price = 800;
  } else if (deviceName.includes("laptop")) {
    price = 600;
  } else if (deviceName.includes("tablet")) {
    price = 400;
  }

  priceLabel.textContent = price > 0 ? `Estimated Price: $${price}` : "Estimated Price: Not Available";
}

button.onclick = () => {
  input.click();
};

input.addEventListener("change", function (e) {
  var fileName = e.target.files[0].name;
  let filedata = `
    <form action="" method="post">
    <div class="form">
    <h4>${fileName}</h4>
    <input type="email" placeholder="Enter email upload file">
    <button class="btn">Upload</button>
    </div>
    </form>`;
  dropArea.innerHTML = filedata;
  dropArea.appendChild(priceLabel);
  determinePrice(); // Call to update price after file selection
});

const inputFields = document.querySelectorAll('input[type="text"]');
inputFields.forEach(inputField => {
  inputField.addEventListener("input", determinePrice);
});
export default Form;