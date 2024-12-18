const container = document.getElementById('container');

for(i = 0; i < 20; i++){
    container.appendChild(makeItem());
}

for(const el of document.querySelectorAll('.front input')){
    // console.log(el)
    el.ondblclick = (e) => {el.readOnly = false;}
    el.addEventListener('focusout', (e) => {el.readOnly = true;})
}

for(const el of document.querySelectorAll('.back input')){
    // console.log(el)
    el.ondblclick = (e) => {el.readOnly = false;}
    el.addEventListener('focusout', (e) => {el.readOnly = true;})
}


for(const el of document.querySelectorAll('.adder .show-area')){
    console.log(el);
    const btn = el.querySelector('.addNew');
    console.log(btn)
    el.onmouseover = (e) => {
        btn.style.visibility = 'visible';
    };
    el.onmouseleave = (e) => {
        btn.style.visibility = 'hidden';
    };

    btn.onclick = () => console.log('ADD!!!')
}


function makeItem(){
    const div = document.createElement('div')
    div.classList.add('item');
    div.innerHTML = `
            <div class="item-btn"></div>

            <div class="front">
                <input type="text" value="front" readonly>
            </div>

            <div class="back">
                <input type="text" value="back" readonly>
            </div> 

            <div class="item-controls">
                <button class="btn-up">U</button>
                <button class="btn-down">D</button>
                <button class="btn-remove">R</button>
            </div>
        `
    return div;
}