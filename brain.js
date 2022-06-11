const msg = new SpeechSynthesisUtterance();
let voices = [];
const voiceDropDown = document.querySelector("#voices");
const option = document.querySelectorAll('[type="range"] , [name="text"]');
const speakButton = document.getElementById("speak");
const stopButton  = document.getElementById("stop");
msg.text = document.querySelector("[name='text']").value;

function voicesStart()
    {
        voices = this.getVoices();
   
        voiceDropDown.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} {${voice.lang}}</option>`).join('');
    }

function setVoice()
{
    msg.voice = voices.find(voice=> voice.name === this.value);
    toogle();
}

function toogle(startOver = true)
{
    speechSynthesis.cancel();
    if(startOver)  {speechSynthesis.speak(msg);}
}

function setOption()
{
    msg[this.name] = this.value;
    toogle();
}

speechSynthesis.addEventListener('voiceschanged',voicesStart);
voiceDropDown.addEventListener('change',setVoice);
option.forEach(option => option.addEventListener("change",setOption));


speakButton.addEventListener('click',toogle);

stopButton.addEventListener('click',() => toogle(false))



//for mobile
speakButton.addEventListener('touchstart',toogle);
stopButton.addEventListener('touchstart',() => toogle(false))


voiceDropDown.addEventListener('touchmove',setVoice);
option.forEach(option => option.addEventListener("touchmove",setOption));