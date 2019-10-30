import './../scss/main.scss';
let body = document.getElementsByTagName('body').item(0);

let createDiv = (value, parent, content) => {
    let div = document.createElement('div');
    div.classList = `container container-${value}`;
    div.setAttribute('name', `container-${value}`);
    div.setAttribute('data-value', `${value}`);
    // div.setAttribute('id', `${value}`);
    if (content != null) {
        div.innerHTML = `<span>${content}</span>`;
    }
    parent.appendChild(div);
    return div;
}

let div1 = createDiv(1, body, 'Input stock symbols:');
let div2 = createDiv(2, body, null);
let div3 = createDiv(3, body, null);
let div4 = createDiv(4, body, null);

let createInput = (value, parent, type) => {
    let input = document.createElement('input');
    input.classList = `input-${value}`;
    input.setAttribute('type', `${type}`);
    input.setAttribute('name', `input-${value}`);
    if (type == 'submit') {
        input.setAttribute('value', `${type}`);
    }
    parent.appendChild(input);
    return input;
}

let inputText = createInput(2, div2, 'input');
let submitBtn = createInput(3, div3, 'submit');

let s1 = 'https://api.worldtradingdata.com/api/v1/stock?symbol=';
let query;
let token = '&api_token=demo';
let Rx = require('rxjs/Rx');
Rx.Observable.fromEvent(submitBtn, 'click').subscribe(()=>{
    if (div4.hasChildNodes) {
        while(div4.firstChild) {
            div4.removeChild(div4.firstChild);
        }
    }
    query = s1+inputText.value+token;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(){
        let response = JSON.parse(this.responseText);
        let data = response.data;
        if (data == undefined) {
            let span = document.createElement('span');
            span.innerHTML = 'Data do not exist!'
            div4.appendChild(span);
        } else {
            let col = [];
            for (let i = 0; i < data.length; i++) {
                for (let key in data[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }
    
            let table = document.createElement('table');
            let tr = table.insertRow(-1);
            for (let i = 0; i < col.length; i++) {
                let th = document.createElement('th');
                th.innerHTML = col[i];
                tr.appendChild(th);
            }
    
            for (let i = 0; i < data.length; i++) {
                tr = table.insertRow(-1);
                for (let j = 0; j < col.length; j++) {
                    let tableCell = tr.insertCell(-1);
                    tableCell.innerHTML = data[i][col[j]];
                }
            }
            div4.appendChild(table);
        }
    })
    xhr.open('GET', query);
    xhr.send();
})
// submitBtn.addEventListener('click', function(){
//     // div4.removeChild(document.getElementsByTagName('table'));
//     if (div4.hasChildNodes) {
//         while(div4.firstChild) {
//             div4.removeChild(div4.firstChild);
//         }
//     }
//     query = s1+inputText.value+token;
//     let xhr = new XMLHttpRequest();
//     xhr.addEventListener('load', function(){
//         let response = JSON.parse(this.responseText);
//         let data = response.data;
//         if (data == undefined) {
//             let span = document.createElement('span');
//             span.innerHTML = 'Data do not exist!'
//             div4.appendChild(span);
//         } else {
//             let col = [];
//             for (let i = 0; i < data.length; i++) {
//                 for (let key in data[i]) {
//                     if (col.indexOf(key) === -1) {
//                         col.push(key);
//                     }
//                 }
//             }
    
//             let table = document.createElement('table');
//             let tr = table.insertRow(-1);
//             for (let i = 0; i < col.length; i++) {
//                 let th = document.createElement('th');
//                 th.innerHTML = col[i];
//                 tr.appendChild(th);
//             }
    
//             for (let i = 0; i < data.length; i++) {
//                 tr = table.insertRow(-1);
//                 for (let j = 0; j < col.length; j++) {
//                     let tableCell = tr.insertCell(-1);
//                     tableCell.innerHTML = data[i][col[j]];
//                 }
//             }
//             div4.appendChild(table);
//         }
//     })
//     xhr.open('GET', query);
//     xhr.send();
// })