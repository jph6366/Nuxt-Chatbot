

<template>
  <div>
  <h1>Chatbot Dev</h1>
  <!-- <div class="dropdown">
    <button class="dropbtn">Settings</button>
    <div class="dropdown-content">
      <a href="#" onclick='setApiUrl()'>Custom API URL</a>
      <a href="#" onclick='setIDsession()'>Custom ID Session</a>
    </div>
  </div> -->
  <div id="response">
    <div class="ai-message">Hey there, how can i assist you?</div>
  </div>
  <form id="chatForm" v-on:submit="chat()">
    <textarea id="input" type="text" placeholder="Send a message" v-on:keydown.enter="chat()"></textarea>
    <button type="submit">➤</button>
  </form>

  </div>
</template>
<script lang="js" setup> 
import { storeToRefs } from 'pinia'
import { useBotLinkStore } from '@/src/models/stores/BotLinkStore'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


let apiUrl = 'https://mindful-dog.kipper.workers.dev'

let uuid = uuidv4()

function chat() {
  const inputField = document.getElementById('input');
  const responseDiv = document.getElementById('response');

  var input = inputField.value;
  input = encodeURIComponent(input)

  const userMessageDiv = document.createElement('div');
  userMessageDiv.className = 'user-message';
  userMessageDiv.innerText = decodeURIComponent(input);
  responseDiv.appendChild(userMessageDiv);

  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'loading';
  loadingDiv.innerHTML = `<svg width="30" height="30" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" stroke="black" stroke-width="4" fill="none" /><circle cx="25" cy="25" r="20" stroke="#3498db" stroke-width="4" fill="none" stroke-dasharray="90" stroke-dashoffset="0"><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/></circle></svg><center class="smaller">If you recive an error than wait 1-2 minutes refresh and try again.</center>`;
  responseDiv.appendChild(loadingDiv);

  axios.get(`${apiUrl}/${uuid}?q=${encodeURIComponent(input)}`)
    .then((response) => {
      responseDiv.removeChild(loadingDiv);

      const aiMessages = response.data[0].response.filter(message => message.role === 'system' && message.content.response);
      console.log(aiMessages)
      if (aiMessages.length > 0) {
        const lastAiMessage = aiMessages[aiMessages.length - 1];
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'ai-message';
        aiMessageDiv.innerHTML = lastAiMessage.content.response;
        responseDiv.appendChild(aiMessageDiv);
      }

      inputField.value = '';
    })
    .catch((error) => {
      console.log("Error receiving response:", error);
    });
}


</script>
<style src="./styles.css"></style>