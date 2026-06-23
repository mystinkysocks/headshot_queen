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
text:"Игрок демонстрирует высокий уровень обаяния, приятную улыбку и опасно красивые светлые волосы",
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
text:"🇧🇦 Среда, 20:00 (Босния). Может сыграем ещё одну катку вместе?",
image:"her/photo4.jpg",
buttons:true
},
{
title:"MATCH ACCEPTED",
text:"Лобби создано. Осталось дождаться начала следующей катки. Спасибо за то, что стала причиной моей улыбки ❤️",
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
            <div>Абай</div>
        </div>

        <div class="player">
            <img src="./her/photo5.jpg" class="avatar">
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

    ${s.buttons
      ? `
        <div class="btnRow">
          <button id="yesBtn">Да</button>
          <button id="noBtn">Нет</button>
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
        showToast("Эта кнопка не работает. Попробуйте нажать 'Да'");
      };
    }
 });

 if(music.paused){
   music.play().catch(()=>{});
 }
}

render();
