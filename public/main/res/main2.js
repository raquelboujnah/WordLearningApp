
insertFillers()


const buses = {
    fieldUpdate: createEventBus(),
    newItem: createEventBus() 
}

buses.fieldUpdate.addListener(0, console.log)

insertItem(0, 'dude', 'hey', buses)

sweepHeaders()

async function sweepHeaders(){
    const names = ['dude', 'MAN', 'john.doe'];
    let i = 0;
    while(true){
        setHeader(names[i]); 
        i = (i + 1) % names.length
        await wait(2000);
    }
}

function setHeader(username){
    const header = document.querySelector('header h1');
    header.textContent = `Hi, ${username}`
}

function wait(ms){
    return new Promise(res => setTimeout(res, ms));
}

function insertFillers(){
    const container = document.getElementById('container');
    create('div', 'filler', filler => container.appendChild(filler));
    create('div', 'filler', filler => container.appendChild(filler));
}

function insertItem(id, front, back){
    const container = document.getElementById('container');
    const lastFiller = document.getElementsByClassName('filler')[1];

    container.insertBefore(makeItem(id, front, back, buses), lastFiller);
}

function makeItem(id, front, back, buses){

    function setupField(field, init, fieldName){
        field.value = init;
        field.readOnly = true;
        field.placeholder = fieldName;

        field.addEventListener('dblclick', (e) => {
            e.preventDefault();
            field.readOnly = false;
        })

        field.addEventListener('focusout', (e) => {
            e.preventDefault();
            field.readOnly = true;

            buses.fieldUpdate.invoke({[fieldName]: field.value, id: id});
        })
    }

    return create('div', 'item', item => {
        
        create('div', 'item-btn', holder => {
            item.appendChild(holder);
            create('img', 'range-sel', s => {
                holder.appendChild(s)
                s.src = './res/images/blackTriangle.svg'
            })
        })

        create('div', 'side','front', holder => {
            item.appendChild(holder);
            create('input', field => {
                holder.appendChild(field);
                setupField(field, front, 'front')
            }) 
        })

        create('div', 'adder', holder => {
            item.appendChild(holder);

            create('div', 'show-area', area => {
                holder.appendChild(area)
                create('button', 'addNew', 'text:+', btn => {
                    area.appendChild(btn);
                    btn.style.display = 'none';
                    btn.onclick = () => makeNewItemAfter(item, buses);

                    area.onmouseover = () => btn.style.display = 'block';
                    area.onmouseleave = () => btn.style.display = 'none';
                })
            })
        })

        create('div', 'side', 'back', holder => {
            item.appendChild(holder);
            create('input', field => {
                holder.appendChild(field)
                setupField(field, back, 'back')
            })
        })

    })
}

function makeNewItemAfter(item, buses){
    const container = document.getElementById('container');
    const newItem = makeItem(undefined, '', '', buses)
    container.insertBefore(newItem, item.nextSibling);
}

function createEventBus(){
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