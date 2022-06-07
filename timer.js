const times =document.querySelector('.view-wrap');
const timeNumerTag =document.querySelectorAll('.time-number');
const secondNumerTag =document.querySelectorAll('.second-number');
const startBtn =document.querySelector('.start-btn');
const pauseBtn =document.querySelector('.pause-btn');
const resetBtn =document.querySelector('.reset-btn');
let timeSettingNum = 0;
let timerRunning;

times.addEventListener('click',(e)=>{
    if(e.target.classList.contains('hours-number')){
        let nowTime = + e.target.textContent;
        nowTime = ++nowTime+'';
        e.target.textContent =nowTime.padStart(2,'0');
        timeSettingNum += 600000;
    }else if(e.target.classList.contains('minute-number')){
        let nowTime = + e.target.textContent;
        nowTime = ++nowTime+'';
        e.target.textContent =nowTime.padStart(2,'0');
        timeSettingNum += 60000;
    }else if(e.target.classList.contains('second-number')){
        let nowTime = + e.target.textContent;
        nowTime = ++nowTime+'';
        e.target.textContent =nowTime.padStart(2,'0');
        timeSettingNum += 1000;
    }
    startBtn.removeAttribute('disabled');
    resetBtn.removeAttribute('disabled');
    console.log(timeSettingNum);

});

startBtn.addEventListener('click',()=>{
    startBtn.classList.add('close');
    pauseBtn.classList.remove('close');

    let second = timeSettingNum.toString().slice(-2);
    secondNumerTag.textContent = second;

    timerRunning=setInterval(()=>{
        timeSettingNum-=1000;
    },1000);
});

pauseBtn.addEventListener('click',()=>{
    pauseBtn.classList.add('close');
    startBtn.classList.remove('close');

    clearInterval(timerRunning)
});

resetBtn.addEventListener('click',()=>{
    startBtn.setAttribute('disabled',"");
    resetBtn.setAttribute('disabled',"");
    timeNumerTag.forEach((timeNum)=>timeNum.textContent='00');
    timeSettingNum=0;
});