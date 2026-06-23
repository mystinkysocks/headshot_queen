const app = document.getElementById("app");
const music = document.getElementById("bgMusic");

const screens = [
{
title:"MATCH FOUND",
text:"Система обнаружила нового игрока... Мануэлла.",
image:"her/photo1.jpg",
button:"Проверить профиль"
},
{
title:"Анализ профиля",
text:"🎹 Любит пианино. 🎤 Любит петь. 🎮 Играет в CS2. Статус: подозрительно интересный игрок.",
image:"her/photo2.jpg",
button:"Продолжить анализ"
},
{
title:"Совпадение найдено",
text:"Система сравнила два профиля и обнаружила необычно много совпадений. Музыка, пианино, игры...",
image:"me/me1.jpg",
button:"Посмотреть детали"
},
{
title:"Демка матча",
text:"Здесь игрок выглядит безобидно. Но система предупреждает: вероятно умеет забирать рейтинг.",
image:"her/photo3.jpg",
button:"Открыть статистику"
},
{
title:"Статистика",
stats:true,
button:"Подтвердить результат"
},
{
title:"Следующий матч",
text:"🇧🇦 Среда, 20:00 (Bosnia). Сервер уже зарезервировал место в лобби.",
image:"her/photo5.jpg",
button:"Перейти в лобби"
},
{
title:"MATCH ACCEPTED",
text:"Лобби создано. Осталось дождаться начала следующей катки. Спасибо за то, что стала причиной появления этой страницы ❤️",
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

function renderStats(){
 return `
 <div class="stats">

    <div class="players">

        <div class="player">
            <img src="me/avatar.jpg" class="avatar">
            <div>Абай</div>
        </div>

        <div class="player">
            <img src="her/avatar.jpg" class="avatar">
            <div>Мануэлла</div>
        </div>

    </div>

    <table>
        <tr>
            <th>Навык</th>
            <th>Ты</th>
            <th>Она</th>
        </tr>

        <tr>
            <td>Музыка</td>
            <td>100</td>
            <td>100</td>
        </tr>

        <tr>
            <td>Пианино</td>
            <td>100</td>
            <td>100</td>
        </tr>

        <tr>
            <td>CS2</td>
            <td>100</td>
            <td>100</td>
        </tr>

        <tr>
            <td>Юмор</td>
            <td>95</td>
            <td>95</td>
        </tr>
    </table>

    <div class="compatibility">
        Совместимость: 99.8%
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

    ${!s.final
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
 });

 if(music.paused){
   music.play().catch(()=>{});
 }
}

render();
