// En: The cards | Ar: البطاقات
var cards=getCards();
// En: The first card turned over | Ar: البطاقة الأولى التي تم قلبها
var firstCard=null;
// En: The second card turned over | Ar: البطاقة الثانية التي تم قلبها
var secondCard=null;
// En: Prevent interaction with the board during match checking | Ar: منع التفاعل مع اللوحة أثناء التحقق من التطابق
var lockBoard=false;
// En: Number of errors | Ar: عدد الأخطاء
var errors=0;
// En: Number of matched pairs | Ar: عدد الأزواج المتطابقة
var matchedPairs=0;
// En: Set the game board to a new level | Ar: تعيين لوحة اللعبة بمستوى جديد
function setGameBoard(){
    errors=0;
    matchedPairs=0;
    resetBoard();
    var currentLanguage=document.getElementById("gameLanguage").dataset.language;
    var currentLevel=document.getElementById("levelText").dataset.level;
    if(currentLanguage=="en"){
        // En: Change game language text | Ar: تغيير نص تغيير اللغة
        document.getElementById("gameLanguage").innerText="عربي";
        // En: Change the text in the game header | Ar: تغيير النصوص الموجودة في رأس اللعبة
        document.getElementById("levelText").innerText="Level is "+currentLevel;
        document.getElementById("levelEasy").innerText="Easy";
        document.getElementById("levelMedium").innerText="Medium";
        document.getElementById("levelHard").innerText="Hard";
        document.getElementById("gameErrors").innerText="Errors: 0";
        document.getElementById("newGame").innerText="Restart game";
        if(window.innerWidth==screen.width&&window.innerHeight==screen.height){
            document.getElementById("fullScreen").innerText="Unfull Screen";
        }
        else{document.getElementById("fullScreen").innerText="Full Screen";}
        // En: Change game information text | Ar: تغيير نص معلومات اللعبة
        document.getElementById("gameInfo").innerText="Click on two boxes and try to match the icons! Test your memory.";
        // En: Change the text in the game footer | Ar: تغيير النصوص الموجودة في ذيل اللعبة
        document.getElementById("gameDevelopedBy1").innerText="Similarity game based on JavaScript developed by";
        document.getElementById("gameDevelopedBy2").innerText="Muhammad Abdelaty";
    }
    else{
        // En: Change game language text | Ar: تغيير نص تغيير اللغة
        document.getElementById("gameLanguage").innerText="English";
        // En: Change the text in the game header | Ar: تغيير النصوص الموجودة في رأس اللعبة
        var levelText;
        if(currentLevel=="Easy"){levelText="سهل";}
        else if(currentLevel=="Medium"){levelText="متوسط";}
        else if(currentLevel=="Hard"){levelText="صعب";}
        document.getElementById("levelText").innerText="المستوى "+levelText;
        document.getElementById("levelEasy").innerText="سهل";
        document.getElementById("levelMedium").innerText="متوسط";
        document.getElementById("levelHard").innerText="صعب";
        document.getElementById("gameErrors").innerText="الأخطاء: 0";
        document.getElementById("newGame").innerText="أعد تشغيل اللعبة";
        if(window.innerWidth==screen.width&&window.innerHeight==screen.height){
            document.getElementById("fullScreen").innerText="إلغاء ملئ الشاشة";
        }
        else{document.getElementById("fullScreen").innerText="ملئ الشاشة";}
        // En: Change game information text | Ar: تغيير نص معلومات اللعبة
        document.getElementById("gameInfo").innerText="انقر على مربعين وحاول مطابقة الرموز! اختبر ذاكرتك.";
        // En: Change the text in the game footer | Ar: تغيير النصوص الموجودة في ذيل اللعبة
        document.getElementById("gameDevelopedBy1").innerText="لعبة التشابه المعتمدة على جافا سكريبت طورها";
        document.getElementById("gameDevelopedBy2").innerText="محمد عبد العاطي";
    }
    var gameBoard=document.getElementById("gameBoard");
    // En: Clear game board content | Ar: مسح محتوى لوحة اللعبة
    gameBoard.innerHTML="";
    // En: Create cards and add them to the game board | Ar: إنشاء البطاقات وإضافتها إلى لوحة اللعبة
    cards=getCards();
    cards.forEach((card,index)=>{
        // En: Create card | Ar: إنشاء البطاقة
        var cardElement=document.createElement('div');
        // En: Add class to card | Ar: إضافة كلاس للبطاقة
        cardElement.classList.add('card');
        // En: Add card ID | Ar: إضافة معرف البطاقة
        cardElement.dataset.id=card.id;
        // En: Add card index | Ar: إضافة موقع البطاقة
        cardElement.dataset.index=index;
        // En: Add card click event | Ar: إضافة حدث النقر على البطاقة
        cardElement.addEventListener("click",flipCard);
        // En: Add card to game board | Ar: إضافة البطاقة للوحة اللعبة
        gameBoard.appendChild(cardElement);
    });
    // En: Show the cards for four seconds and then turn them over | Ar: عرض البطاقات أربع ثواني ثم قلبهم
    showAllCards();
}
if(window.addEventListener){window.addEventListener("load",setGameBoard,false);}
else if(window.attachEvent){window.attachEvent("onload",setGameBoard);}
else{window.onload=setGameBoard;}
// En: Change game language | Ar: تغيير لغة اللعبة
function changeLanguage(){
    var currentLanguage=document.getElementById("gameLanguage");
    if(currentLanguage.innerText=="عربي"){
        currentLanguage.innerText="English";
        currentLanguage.dataset.language="ar";
        document.documentElement.dir="rtl";
        document.documentElement.lang="ar";
    }
    else{
        currentLanguage.innerText="عربي";
        currentLanguage.dataset.language="en";
        document.documentElement.dir="ltr";
        document.documentElement.lang="en";
    }
    document.getElementById("gameNotification").innerText="";
    setGameBoard();
}
// En: Change the game level between easy, medium and hard | Ar: تغيير مستوى اللعبة بين سهل ومتوسط وصعب
function changeLevel(elem){
    var levelText=document.getElementById("levelText");
    var currentLevel="level"+levelText.dataset.level;
    var newLevelId=elem.target.id;
    var newLevelText=elem.target.innerText;
    var currentLanguage=document.getElementById("gameLanguage").dataset.language;
    if(currentLevel!=newLevelId){
        var levelIs;
        if(currentLanguage=="en"){
            levelIs="Level is ";
        }
        else{
            levelIs="المستوى ";
        }
        levelText.dataset.level=newLevelId.slice(5);
        levelText.innerText=levelIs+newLevelText;
        document.getElementById(currentLevel).classList.toggle("bg-success");
        document.getElementById(currentLevel).classList.toggle("text-white");
        document.getElementById(newLevelId).classList.toggle("bg-success");
        document.getElementById(newLevelId).classList.toggle("text-white");
        setGameBoard();
    }
    else{
        var dir,info;
        if(currentLanguage=="en"){
            dir="ltr";
            info="You did not change the game level.";
        }
        else{
            dir="rtl";
            info="لم تقم بتغيير مستوى اللعبة.";
        }
        gameNotificationShow(info,dir);
    }
}
// En: FullScreen or cancel FullScreen | Ar: ملئ الشاشة أو إلغاء ملئ الشاشة
function fullScreen(){
    var currentLanguage=document.getElementById("gameLanguage").dataset.language;
    var dir,fullScreenText,fullScreenAlert,unfullScreenText,unfullScreenAlert;
    if(currentLanguage=="en"){
        dir="ltr";
        fullScreenAlert="Sorry, browser is unable to fullscreen.";
        fullScreenText="Full Screen";
        unfullScreenAlert="Sorry, browser is unable to cancel fullscreen.";
        unfullScreenText="Unfull Screen";
    }
    else{
        dir="rtl";
        fullScreenAlert="عذراً، المتصفح غير قادر على ملء الشاشة.";
        fullScreenText="ملئ الشاشة";
        unfullScreenAlert="عذراً، المتصفح غير قادر على إلغاء وضع ملء الشاشة.";
        unfullScreenText="إلغاء ملئ الشاشة";
    }
    var fullScreen=document.getElementById("fullScreen");
    if(window.innerWidth==screen.width&&window.innerHeight==screen.height){
        try{
            if(document.exitFullscreen){document.exitFullscreen();}
            else if(document.msExitFullscreen){document.msExitFullscreen();}
            else if(document.mozCancelFullScreen){document.mozCancelFullScreen();}
            else if(document.webkitExitFullscreen){document.webkitExitFullscreen();}
            fullScreen.innerText=fullScreenText;
        }
        catch{
            gameNotificationShow(unfullScreenAlert,dir);
            fullScreen.innerText=unfullScreenText;
        }
    }
    else{
        var elem=document.documentElement;
        try{
            if(elem.requestFullscreen){elem.requestFullscreen();}
            else if(elem.msRequestFullscreen){elem.msRequestFullscreen();}
            else if(elem.mozRequestFullScreen){elem.mozRequestFullScreen();}
            else if(elem.webkitRequestFullscreen){elem.webkitRequestFullscreen();}
            fullScreen.innerText=unfullScreenText;
        }
        catch{
            gameNotificationShow(fullScreenAlert,dir);
            fullScreen.innerText=fullScreenText;
        }
    }
}
// En: Get game cards | Ar: جلب بطاقات اللعبة
function getCards(){
    // En: All cards | Ar: كل البطاقات
    var cards=[
        {id:1,symbol:"🫑"},
        {id:2,symbol:"🥦"},
        {id:3,symbol:"🍫"},
        {id:4,symbol:"🥥"},
        {id:5,symbol:"🌽"},
        {id:6,symbol:"🍇"},
        {id:7,symbol:"☕"},
        {id:8,symbol:"🍓"},
        {id:9,symbol:"🍅"},
        {id:10,symbol:"🍉"}
    ];
    // En: Shuffle the cards randomly | Ar: خلط البطاقات عشوائيًا
    cards.sort(()=>0.5-Math.random());
    // En: Number of cards by level | Ar: عدد البطاقات حسب المستوى
    var currentLevel=document.getElementById("levelText").dataset.level;
    if(currentLevel=="Easy"){cards=cards.splice(1,6);}
    else if(currentLevel=="Medium"){cards=cards.splice(1,8);}
    // En: Duplicate cards so that each card has a counterpart | Ar: مضاعفة البطاقات لتكون لكل بطاقة مثيل لها
    cards=cards.concat(cards);
    // En: Shuffle the cards randomly again | Ar: خلط البطاقات عشوائيًا مرةً أخرى
    return cards.sort(()=>0.5-Math.random());
}
// En: Show the cards for three seconds and then turn them over | Ar: عرض البطاقات ثلاث ثواني ثم قلبهم
function showAllCards(){
    // عرض جميع البطاقات لمدة 2 ثوانٍ.
    var cardElements=document.querySelectorAll('.card');
    cardElements.forEach((card,index)=>{
        card.classList.add('flipped');
        card.textContent=cards[index].symbol;
    });
    setTimeout(()=>{
        cardElements.forEach((card)=>{
            card.classList.remove('flipped');
            card.textContent='';
        });
    },3000);
}
// En: Flipping the clicked card | Ar: قلب البطاقة المنقور عليها
function flipCard(){
    // En: If the game board is locked do nothing | Ar: إذا كانت لوحة اللعبة مغلقة لا تفعل شيئًا
    if(lockBoard){return;}
    // En: The clicked card | Ar: البطاقة المنقور عليها
    var card=this;
    /**
     * En: If the clicked card is the same as the first card it does nothing
     * Ar: إذا كانت البطاقة المنقور عليها هي نفسها البطاقة الأولى لا تفعل شيئًا
     */
    if(card===firstCard){return;}
    // En: Add class to card | Ar: إضافة كلاس للبطاقة
    card.classList.add('flipped');
    // En: If there is no first card | Ar: عرض رمز البطاقة
    card.textContent=cards[card.dataset.index].symbol;
    // En: If there is no first card | Ar: إذا لم تكن هناك بطاقة أولى
    if(!firstCard){
        // En: Set the current card as first | Ar: قم بتعيين البطاقة الحالية كأولى
        firstCard=card;
    }
    // En: If there is a first card | Ar: إذا كانت توجد بطاقة أولى
    else{
        // En: Set the current card as the second | Ar: قم بتعيين البطاقة الحالية كثانية
        secondCard=card;
        // En: Check if the two cards are matched | Ar: تحقق مما إذا كانت البطاقتين متطابقتين
        checkMatch();
    }
}
// En: Check if the two cards are matched | Ar: تحقق مما إذا كانت البطاقتين متطابقتين
function checkMatch(){
    var isMatch=firstCard.dataset.id===secondCard.dataset.id;
    var currentLanguage=document.getElementById("gameLanguage").dataset.language;
    // En: If the two cards are matched | Ar: إذا كانت البطاقتين متطابقتين
    if(isMatch){
        // En: Disable cards are matched | Ar: تعطيل البطاقات المتطابقة
        disableCards();
        // En: Increase number of matched pairs | Ar: زيادة عدد الأزواج المتطابقة
        matchedPairs++;
        // En: If all matching cards are found | Ar: إذا تم إيجاد كل البطاقات المتطابقة
        if(matchedPairs*2==cards.length){
            // En: Play finish sound | Ar: تشغيل صوت الانتهاء
            var finishAudio=new Audio(location.pathname+'/sound/finish.mp3');
            finishAudio.play();
            // En: Show finish notification | Ar: إشعار الانتهاء
            var dir,info,newGame;
            if(currentLanguage=="en"){
                dir="ltr";
                info="Well done, you have finished finding all the matching cards.";
                newGame="Play again";
            }
            else{
                dir="rtl";
                info="أحسنت لقد أنتهيت من إيجاد كل البطاقات المتطابقة.";
                newGame="العب مرةً أخرى";
            }
            document.getElementById("newGame").innerText=newGame;
            gameNotificationShow(info,dir);
        }
        else{
            // En: Play success sound | Ar: تشغيل صوت الصواب
            var successAudio=new Audio(location.pathname+'/sound/success.mp3');
            successAudio.play();
        }
    }
    // En: If the two cards are not matched | Ar: إذا كانت البطاقتين غير متطابقتين
    else{
        // En: Increase number of errors | Ar: زيادة عدد الأخطاء
        errors++;
        if(currentLanguage=="en"){document.getElementById("gameErrors").innerText="Errors: "+errors;}
        else{document.getElementById("gameErrors").innerText="الأخطاء: "+errors;}
        // En: Play error sound | Ar: تشغيل صوت الخطأ
        var errorAudio=new Audio(location.pathname+'/sound/error.mp3');
        errorAudio.play();
        // En: Flipping the two mismatched cards over again | Ar: قلب البطاقتين الغير متطابقتين مرةً أخرى
        unflipCards();
    }
}
// En: Disable cards are matched | Ar: تعطيل البطاقات المتطابقة
function disableCards(){
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}
// En: Flipping the two mismatched cards over again | Ar: قلب البطاقتين الغير متطابقتين مرةً أخرى
function unflipCards() {
    lockBoard=true;
    setTimeout(()=>{
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent='';
        secondCard.textContent='';
        resetBoard();
    },1000);
}
// En: Enable interaction with the game board and reset variables | Ar: تمكين التفاعل مع لوحة اللعبة وإعادة تعيين المتغيرات
function resetBoard(){
    firstCard=null;
    secondCard=null;
    lockBoard=false;
}
// En: Show notification to player | Ar: إظهار إشعار للاعب
function gameNotificationShow(p,dir){
    document.getElementById("gameNotification").innerHTML='<div><i class="btn btn-danger bi bi-x gameNotificationClose"></i><p dir='+dir+'>'+p+'</p></div>';
    document.getElementById("gameNotification").classList.remove('d-none');
    document.getElementById("gameNotification").classList.add('d-flex');
}
// En: Hide notification | Ar: إخفاء الإشعار
function gameNotificationClose(){
    document.getElementById("gameNotification").innerHTML="";
    document.getElementById("gameNotification").classList.remove('d-flex');
    document.getElementById("gameNotification").classList.add('d-none');
}
$(document).ready(function(){
    $(document).on("click","#gameLanguage",changeLanguage);
    $(document).on("click","#levelEasy",changeLevel);
    $(document).on("click","#levelMedium",changeLevel);
    $(document).on("click","#levelHard",changeLevel);
    $(document).on("click","#newGame",setGameBoard);
    $(document).on("click","#fullScreen",fullScreen);
    $(document).on("click",".gameNotificationClose",gameNotificationClose);
    $(document).on("blur","#gameNotification",gameNotificationClose);
});