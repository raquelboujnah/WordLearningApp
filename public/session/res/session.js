const events = {
    stateChange: createEvent(),
    onShowAnswerCmd: createEvent(),
    onAnsweringCmd: createEvent(),
    reqFocus: createEvent(),
    finishClick: createEvent()
}

setupShowAnswerControl()
setupAnswerngControl()
setupFocus()
setupFinishHandle()

randomGenSetup()
// events.stateChange.addListener('debug', console.log);

insertItem(0, 'front', 'back')
events.stateChange.invoke('q');


function setupContainer(){
    // const items = [...document.querySelectorAll('.items')];


}

function setupFocus(){
    const scrollable = document.getElementsByClassName('scrollable')[0]

    function focus(item){
        const position = item.offsetTop - scrollable.offsetTop - scrollable.offsetHeight / 2;
        scrollable.scrollTo(0, position);
    }

    events.reqFocus.addListener('scroll', focus);
}

function getItems(){return [...document.querySelectorAll('.item')]}

function randomGenSetup(){
    events.onAnsweringCmd.addListener('gen',async (answer) => {

        let arr = getItems();
        let last = arr[arr.length - 1];
        console.log(last);
        events.reqFocus.invoke(last);

        insertLowering();
        insertItem(0, 'front', 'back');
        await wait(1000);
        arr = getItems();
        last = arr[arr.length - 1];
        events.reqFocus.invoke(last)
    })
}

function setupFinishHandle(){
    const btn = document.getElementById('fin');

    async function onClick(e){
        e.preventDefault();
        const response = await fetch('http://localhost:5000/session', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({finish: true})
        })

        window.location.href = 'http://localhost:5000/';
    }

    btn.onclick = onClick;
}

function insertItem(...args){
    const container = document.getElementById('container');
    const lastFiller = document.getElementsByClassName('filler')[1];
    // container.appendChild(makeItem(...args));
    container.insertBefore(makeItem(...args), lastFiller);
}

function insertLowering(){
    const container = document.getElementById('container');
    const lastFiller = container.getElementsByClassName('filler')[1];
    create('div', 'lowering', l => container.insertBefore(l, lastFiller));
}

function makeItem(id, front, back){
    return create('div', 'item', 'id:' + id, item => {
        create('label', 'side', 'front', 'text:' + front, label => item.appendChild(label));
        create('label', 'side', 'back', 'text:' + back, label => item.appendChild(label));
    })
}

function setupAnswerngControl(){
    const panel = document.getElementById('result-panel');
    const [bad, good] = [...panel.querySelectorAll('button')];

    function run(e){
        e.preventDefault();
        events.onAnsweringCmd.invoke(1);
        events.stateChange.invoke('q');
    }

    bad.onclick = run;
    good.onclick = run;

    events.stateChange.addListener('answer', state => {
        panel.style.display = state == 'a' ? 'flex' : 'none';
    })

    panel.style.display = 'none';
}

function setupShowAnswerControl(){
    const panel = document.getElementById('show-answer-panel');
    const btn = document.querySelector('#show-answer-panel button');


    function run(){
        events.onShowAnswerCmd.invoke();
        events.stateChange.invoke('a');
    }

    btn.onclick = function(e){
        e.preventDefault();
        run()
    }

    events.stateChange.addListener('show', state => {
        panel.style.display = state == 'q' ? 'flex' : 'none';
    })

    panel.style.display = 'block';
}

function createEvent(){
    const bus = {
        collection: {},

        addListener: (listener, fn) => {
            bus.collection[listener] = fn;
        },

        removeListener: (owner) => delete bus.collection[owner],

        invoke: arg => Object.values(bus.collection).forEach(fn => fn(arg))
    }
    return bus;
}

function create(tag, ...args){
    const el = document.createElement(tag);
    for(const arg of args){

        if(typeof arg === 'string'){
            if(arg.startsWith('id:')){
                el.id = arg.substring(3);
            }
            else if(arg.startsWith('text:')){
                el.appendChild(document.createTextNode(arg.substring(5)))
            }
            else {
                el.classList.add(arg);
            }
        }
        else if(typeof arg === 'function'){
            arg(el);
        }
    }
    return el;
}

function wait(ms){
    return new Promise(res => setTimeout(res, ms))
}