const todoUl = document.getElementById('todoUl');
let todos = [];
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    setCookie(name, null, null)
}

function getTodos() {
    let stringCookie = getCookie('todos');
    if (stringCookie) {
        todos = JSON.parse(stringCookie);
    }
}

function saveTodos() {
    setCookie('todos', JSON.stringify(todos), 20);
}

function setTodos() {
    let html = "";
    if (todos.length === 0) {
        return;
    }
    for (const todo of todos) {
        html += `<li><input type="text" class="todoNameInp" placeholder="Todo...." value="${todo.title}"><textarea class="todoDesc" placeholder="description">${todo.desc}</textarea></li>`;
    }
    html += "<li><input type='text' class='todoNameInp' placeholder='Todo....''><textarea class='todoDesc' placeholder='description'></textarea></li>";
    todoUl.innerHTML = html;
    attachListeners();
}

function attachListeners() {

    for (const inp of document.getElementsByClassName('todoNameInp')) {
        inp.addEventListener('keydown', function (e) {
            if (e.key === "Enter") {
                let values = {
                    "title": inp.value,
                    "desc": inp.nextElementSibling.value
                };

                todos.push(values);
                saveTodos();
                setTodos();
                e.preventDefault();
            }
        })
    }
}
getTodos()
    ; setTodos();
attachListeners();