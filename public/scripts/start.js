const reg = document.getElementById('reg');
const log = document.getElementById('log');
const toLogBtn = document.getElementById('toLog');
const toRegBtn = document.getElementById('toReg');
const regBtn = document.getElementById('regBtn');
const logBtn = document.getElementById('logBtn');

reg.classList.add('appearing');
log.style.display = 'none';

toLogBtn.onclick = toLog;
toRegBtn.onclick = toReg;

window.onload = function(){
    log.style.display = 'none';
    enable(reg); 
}


const url = "http://localhost:5000"

async function regMe(){

    const username = document.querySelector("#reg .username").value
    const password = document.querySelector("#reg .password").value

    const response = await fetch(url + "/registration", {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    const json = await response.json()
    console.log(json);
}

async function logMe(){
    const username = document.querySelector("#log .username").value
    const password = document.querySelector("#log .password").value

    const response = await fetch(url + "/login", {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    const json = await response.json()
    console.log(json)
}



async function toLog(e) {
    e.preventDefault();
    disable(reg)
    await wait(600)
    reg.style.display = 'none';    
    log.style.display = 'block';
    enable(log);
}

async function toReg(e){
    e.preventDefault();
    disable(log)
    await wait(600)
    log.style.display = 'none';    
    reg.style.display = 'block';
    enable(reg);
}

function disable(element){
    element.classList.add('disappearing')
    element.classList.remove('appearing')
}

function enable(element){
    element.classList.remove('disappearing')
    element.classList.add('appearing')
}

function wait(ms){
    return new Promise(res => setTimeout(res, ms));
}