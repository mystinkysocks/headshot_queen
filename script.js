const app = document.getElementById("app");
const music = document.getElementById("bgMusic");

const screens = [
{
title:"PRONAĐEN MATCH",
text:"Sistem je otkrio novog igrača... Manuela.",
image:"her/photo1.jpg",
button:"Proveri profil"
},
{
title:"Analiza profila",
text:"🎹 Voli klavir. 🎤 Voli da peva. 🎮 Igra CS2. Status: sumnjivo zanimljiv igrač.",
image:"her/photo2.jpg",
button:"Nastavi analizu"
},
{
title:"Podudaranje pronađeno",
text:"Sistem je uporedio dva profila i otkrio neočekivano mnogo podudaranja. Muzika, klavir, igre...",
image:"me/me1.jpg",
button:"Pogledaj detalje"
},
{
title:"Demo meča",
text:"Igrač pokazuje visok nivo šarma, prijatan osmeh i opasno lepu plavu kosu",
image:"her/photo3.jpg",
button:"Otvori statistiku"
},
{
title:"Statistika",
stats:true,
button:"Potvrdi rezultat"
},
{
title:"Sledeći meč",
text:"🇧🇦 Sreda, 20:00 (Bosna). Hoćemo li igrati još jednu partiju zajedno?",
image:"her/photo4.jpg",
buttons:true
},
{
title:"MATCH ACCEPTED",
text:"Lobi je kreiran. Ostaje da se sačeka početak sledeće partije. Hvala što si razlog mog osmeha ❤️",
image:"her/photo1.jpg",
final:true
}
];

let current = 0;

function typeText(el,text,callback){
 let i=0;
 el.innerHTML="";

 const timer=setInterval(()=>{
  el.innerHTML += text[i] || "";
  i++;

  if(i>text.length){
   clearInterval(timer);
   callback?.();
  }
 },20);
}

function showToast(text){
 const toast = document.getElementById("toast");
 toast.innerText = text;
 toast.classList.add("show");

 clearTimeout(window.toastTimer);

 window.toastTimer = setTimeout(()=>{
   toast.classList.remove("show");
 },2500);
}

function renderStats(){
 return `
 <div class="stats">

    <div class="players">

        <div class="player">
            <img src="./me/me2.jpg" class="avatar">
            <div>Abai</div>
        </div>

        <div class="player">
            <img src="./her/photo5.jpg" class="avatar">
            <div>Manuela</div>
        </div>

    </div>

    <table>
        <tr>
            <th>Veština</th>
            <th>Ti</th>
            <th>Ona</th>
        </tr>

        <tr>
            <td>Muzika</td>
            <td>95</td>
            <td>100</td>
        </tr>

        <tr>
            <td>Klavir</td>
            <td>70</td>
            <td>100</td>
        </tr>

        <tr>
            <td>CS2</td>
            <td>100</td>
            <td>100</td>
        </tr>

        <tr>
            <td>Humor</td>
            <td>95</td>
            <td>75</td>
        </tr>
    </table>

    <div class="compatibility">
        Kompatibilnost: 91.9%
    </div>

 </div>
 `;
}

function render(){

 const s = screens[current];

 if(s.stats){

 app.innerHTML=`
 <div class="card">
    <div class="title">${s.title}</div>

    ${renderStats()}

    <button id="nextBtn">${s.button}</button>
 </div>
 `;

 document.getElementById("nextBtn").onclick=()=>{
    current++;
    render();
 };

 return;
 }

 app.innerHTML=`
 <div class="card">
    <div class="title">${s.title}</div>

    <img src="${s.image}" alt="photo">

    <div class="text" id="typed"></div>

    ${s.buttons
      ? `
        <div class="btnRow">
          <button id="yesBtn">Da</button>
          <button id="noBtn">Ne</button>
        </div>
      `
      : !s.final
        ? `<button id="nextBtn" style="display:none">${s.button}</button>`
        : ""
    }
 </div>
 `;

 const typed=document.getElementById("typed");

 typeText(typed,s.text,()=>{

    const btn=document.getElementById("nextBtn");

    if(btn){
        btn.style.display="block";
        btn.onclick=()=>{
            current++;
            render();
        };
    }

    if(s.buttons){

      const yes = document.getElementById("yesBtn");
      const no = document.getElementById("noBtn");

      yes.onclick = () => {
        current++;
        render();
      };

      no.onclick = () => {
        showToast("Ovo dugme ne radi. Pritisni 'Da'");
      };
    }
 });

 if(music.paused){
   music.play().catch(()=>{});
 }
}

render();
