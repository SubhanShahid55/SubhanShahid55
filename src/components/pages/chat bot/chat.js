import React from 'react';

function Chat() {
  const handleSendMessage = () => {
      alert("Message sent!");
      (function() {

        "use strict";
      
        const apiUrl = "https://apiaiserg-osipchukv1.p.rapidapi.com/addContext"; // Updated endpoint
        const apiKey = "fc9c1dbc5bmshbb36ac6ab2407f0p119d47jsn6cc2bc8d4d1f"; // Your RapidAPI key
      
        const submit = document.querySelector(".chat-submit");
        const chatBox = document.querySelector(".chat-box");
        const chatInput = document.querySelector(".chat-input");
    
        function chatTemplate(aiOrPerson) {
          return (
            `
              <div class="ai-person-container">
                <div class="${aiOrPerson.class}">
                  <p>${aiOrPerson.text}</p>
                </div>
                <span class="${aiOrPerson.class}-date">${aiOrPerson.date}</span>
              </div>
            `
          );
        }
      
        submit.addEventListener("click", function(e) {
          appendChatBox(true);
        });
      
        document.addEventListener("keypress", function(e) {
          if (e.key === "Enter") {
            appendChatBox(true);
          }
        });
      
        function appendChatBox(fromPerson) {
          const date = new Date();
          if (!fromPerson) {
            date.setSeconds(date.getSeconds() + 2);
          }
          if (fromPerson && !chatInput.value.trim()) {
            return;
          }
          const timestamp = date.toLocaleTimeString();
          const userMessage = chatInput.value.trim();
          const newChatDiv = chatTemplate({
            class: fromPerson ? "person" : "ai",
            text: fromPerson ? userMessage : "Loading...",
            date: timestamp
          });
          chatBox.innerHTML += newChatDiv;
          chatBox.scrollTop = chatBox.scrollHeight;
    
          if (fromPerson) {
            chatInput.value = "";
            callChatbotAPI(userMessage);
          }
        }
      
        function callChatbotAPI(userMessage) {
          const data = new FormData();
          data.append('message', userMessage); // Assuming the API expects a 'message' field
    
          const xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
    
          xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
              try {
                const response = JSON.parse(this.responseText);
                const aiMessage = response.response || "I didn't understand that."; // Adjust based on your API's response structure
                const timestamp = new Date().toLocaleTimeString();
                const newChatDiv = chatTemplate({
                  class: "ai",
                  text: aiMessage,
                  date: timestamp
                });
                chatBox.innerHTML += newChatDiv;
                chatBox.scrollTop = chatBox.scrollHeight;
              } catch (error) {
                console.error('Error parsing response:', error);
                displayError();
              }
            }
          });
    
          xhr.open('POST', apiUrl);
          xhr.setRequestHeader('x-rapidapi-key', apiKey);
          xhr.setRequestHeader('x-rapidapi-host', 'apiaiserg-osipchukv1.p.rapidapi.com');
    
          xhr.send(data);
        }
    
        function displayError() {
          const timestamp = new Date().toLocaleTimeString();
          const newChatDiv = chatTemplate({
            class: "ai",
            text: "Error: Unable to reach the chatbot service.",
            date: timestamp
          });
          chatBox.innerHTML += newChatDiv;
          chatBox.scrollTop = chatBox.scrollHeight;
        }
      
    }());
  };

  return (
      <div>
          <h1>Chat</h1>
          <button onClick={handleSendMessage}>Send Message</button>
      </div>
  );
}

export default Chat;

