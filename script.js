
const app = document.getElementById("app");
const music = document.getElementById("bgMusic");

const screens = [
{
title:"MATCH FOUND",
text:"Система обнаружила нового игрока... Мануэлла.",
image:"her/photo1.jpg"
},
{
title:"Анализ профиля",
text:"🎹 Любит пианино. 🎤 Любит петь. 🎮 Играет в CS2. Статус: подозрительно интересный игрок.",
image:"her/photo2.jpg"
},
{
title:"Совпадение найдено",
text:"Система сравнила два профиля и обнаружила необычно много совпадений. Музыка, пианино, игры...",
image:"me/me1.jpg"
},
{
title:"Демка матча",
text:"Здесь игрок выглядит безобидно. Но система предупреждает: вероятно умеет забирать рейтинг.",
image:"her/photo3.jpg"
},
{
title:"Статистика",
text:"Music 1:1 Piano 1:1 Gaming 1:1. Победителя определить невозможно.",
image:"her/photo4.jpg"
},
{
title:"Секретный отчёт",
text:"Обычно после матча показывают статистику. Но этот матч оказался немного странным. Мне понравилось не только играть с тобой. Мне понравилось общаться с тобой.",
image:"me/me2.jpg"
},
{
title:"Следующая игра",
text:"🇧🇦 Вторник 20:00 (Bosnia) 🇰🇬 Среда 00:00 (Kyrgyzstan). Кажется, это хорошее время для ещё одной катки.",
image:"her/photo5.jpg"
},
{
title:"INVITATION ACCEPTED",
text:"Отлично. Тогда увидимся в следующем матче. Спасибо, что стала причиной появления этой маленькой страницы. gg ❤️",
image:"her/photo1.jpg",
final:true
}
];

let current=0;

function typeText(el,text,callback){
 let i=0;
 el.innerHTML="";
 let timer=setInterval(()=>{
  el.innerHTML += text[i] || "";
  i++;
  if(i>text.length){
   clearInterval(timer);
   if(callback) callback();
  }
 },25);
}

function render(){
 const s=screens[current];

 app.innerHTML=`
 <div class="card">
 <div class="title">${s.title}</div>
 <img src="${s.image}" alt="photo">
 <div class="text" id="typed"></div>
 ${!s.final ? '<button id="nextBtn" style="display:none">Продолжить</button>' : ''}
 </div>
 `;

 const typed=document.getElementById("typed");

 typeText(typed,s.text,()=>{
   const btn=document.getElementById("nextBtn");
   if(btn){
      btn.style.display="inline-block";
      btn.onclick=()=>{
        current++;
        render();
      };
   }
 });

 if(music.paused){
   music.play().catch(()=>{});
 }
}

render();
