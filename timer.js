const times =document.querySelector('.view-wrap');
const timeNumerTag =document.querySelectorAll('.time-number');
const hoursNumerTag =document.querySelector('.hours-number');
const minuteNumerTag =document.querySelector('.minute-number');
const secondNumerTag =document.querySelector('.second-number');
const startBtn =document.querySelector('.start-btn');
const pauseBtn =document.querySelector('.pause-btn');
const resetBtn =document.querySelector('.reset-btn');
let timeSettingNum = 0;
let timerRunning;
let istimerRunning=false;



times.addEventListener('click',(e)=>{
    console.log(e.offsetY);
    if(e.target.classList.contains('hours-number')){ //시간

        updatingTimeNum(e, 600000,e.offsetY, true);
    }else if(e.target.classList.contains('minute-number')){ // 분
        updatingTimeNum(e, 60000,e.offsetY, false);
    }else if(e.target.classList.contains('second-number')){ // 초
        updatingTimeNum(e, 1000,e.offsetY, false);
    }
    startBtn.removeAttribute('disabled');
    resetBtn.removeAttribute('disabled');
});

startBtn.addEventListener('click',()=>{ // 시작 버튼
    startBtn.classList.add('close');
    pauseBtn.classList.remove('close');
    istimerRunning = !istimerRunning;
    timeNumerTag.forEach((timeNum)=>timeNum.setAttribute('disabled',""));
    
    timerRunning=setInterval(()=>{
        if(timeSettingNum>0 && istimerRunning){
            timeSettingNum-=1000;

            let second = (timeSettingNum % 60000 / 1000) + '';
            secondNumerTag.textContent = second.padStart(2,'0');

            let minute = Math.floor(timeSettingNum / 60000) + '';
            minuteNumerTag.textContent = minute.padStart(2,'0');

            let hours = Math.floor(timeSettingNum / 600000) + '';
            hoursNumerTag.textContent = hours.padStart(2,'0');

            if(timeSettingNum === 0){
                settingZero();
                istimerRunning = !istimerRunning;
                clearInterval(timerRunning);
            }
        }
        console.log(timeSettingNum);
    },1000);
},false);

pauseBtn.addEventListener('click',()=>{ // 멈춤 버튼
    pauseBtn.classList.add('close');
    startBtn.classList.remove('close');
    istimerRunning = !istimerRunning;
    timeNumerTag.forEach((timeNum)=>timeNum.removeAttribute('disabled'));
    clearInterval(timerRunning);
});

resetBtn.addEventListener('click',settingZero);// 리셋 버튼

function updatingTimeNum(e, setNum, posY, isHours) {
    let nowTime = + e.target.textContent;
    if(!isHours&&nowTime>58){
        nowTime='0';
        if(setNum < 10000){
            let minute = + minuteNumerTag.textContent;
            (posY>40)?--minute:++minute;
            minute += '';
            minuteNumerTag.textContent = minute.padStart(2,'0');
        }else{
            let hours = + hoursNumerTag.textContent;
            (posY>40)?--hours:++hours;
            hours += '';
            hoursNumerTag.textContent = hours.padStart(2,'0');
        }
    }else{
        (posY>40)?--nowTime:++nowTime;
        nowTime += '';
        if(nowTime<0)nowTime ='0';
    }
    e.target.textContent =nowTime.padStart(2,'0');
    timeSettingNum += setNum;
}

function settingZero(){// 타이머 처음으로 셋팅
    pauseBtn.classList.add('close');
    startBtn.classList.remove('close');
    
    startBtn.setAttribute('disabled',"");
    resetBtn.setAttribute('disabled',"");
    
    timeNumerTag.forEach((timeNum)=>{
        timeNum.textContent='00';
        timeNum.removeAttribute('disabled');
    });
    
    istimerRunning=false;
    timeSettingNum=0;
}