// ------------------------------------------About------------------------------------------------

var tablinks=document.getElementsByClassName('tab-links');
var tabcontents=document.getElementsByClassName("tab-contents");

function opentab(event,tabname){

  for(tablink of tablinks)
  {
    tablink.classList.remove("active-link")
  }

  for(tabcontent of tabcontents)
  {
    tabcontent.classList.remove("active-tab")
  }

  event.currentTarget.classList.add('active-link');
  document.getElementById(tabname).classList.add('active-tab');
}

// ------------------------------------------Menu------------------------------------------------

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0px";
}

function closemenu(){
    sidemenu.style.right='-200px';
}

// ------------------------------------------Form------------------------------------------------

const scriptURL = 'https://script.google.com/a/macros/cctech.co.in/s/AKfycbwNTCT_853Lyp_YYL3Jmt_UKO-_Anws1cZBMVl-WqxMWz3A2m1H6c6PefT74QZEw-A4/exec'
const form = document.forms['submit-to-google-sheet'];

const msg=document.getElementById("msg");

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML="Message sent successfully";
        setTimeout(function(){
            msg.innerHTML="";
        },3000)
        form.reset();
    })
    .catch(error => console.error('Error!', error.message))
})