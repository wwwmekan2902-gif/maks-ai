const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");

function sendMsg(){
  const text = input.value.trim();
  if(!text) return;
  addMsg("user", text);
  input.value = "";

  fetch("/ask", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({message:text})
  })
  .then(res => res.json())
  .then(data => {
    addMsg("bot", data.reply);
    speak(data.reply);
  })
  .catch(()=> addMsg("bot","❌ Serwer bilen baglanyşyk ýok."));
}

function addMsg(sender, text){
  const msg = document.createElement("div");
  msg.textContent = (sender==="user"?"Sen: ":"AI: ") + text;
  msg.className = sender==="user"?"msg user":"msg bot";
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function speak(text){
  if('speechSynthesis' in window){
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang='en-US'; speech.pitch=1; speech.rate=1; speech.volume=1;
    speechSynthesis.speak(speech);
  }
}
