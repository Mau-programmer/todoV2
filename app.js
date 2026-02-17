const todoUl = document.getElementById('todoUl');
const compUl = document.getElementById('completedUl');
let todos = {
    "todo": [],
    "completed": []
}
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
function resetTodos() {
    todos = {
        "todo": [],
        "completed": []
    }
    deleteCookie('todos');
    setTodos();
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

    if (todos.todo.length > 0) {
        let html = "";
        for (const todo of todos.todo) {
            html += `<li><input type="text" class="todoNameInp" placeholder="Todo...." value="${todo.title}"><select name='priority' value="${todo.prior}"><option value='urgent'>urgent</option><option value='not-urgent'>not urgent</option></select ><textarea class="todoDesc" placeholder="description">${todo.desc}</textarea>                 <button onclick="addTodo(this)">add</button></li>`;
        }
        html += "<li><input type='text' class='todoNameInp' placeholder='Todo....''>        <select name='priority'><option value = 'urgent' > urgent</option><option value='not-urgent'>not urgent</option></select ><textarea class='todoDesc' placeholder='description'></textarea><button onclick='addTodo(this)'>add</button></li > ";
        todoUl.innerHTML = html;
        let counter = 0;
        for (const element of document.getElementsByClassName('todoNameInp')) {
            try {
                element.nextElementSibling.value = todos.todo[counter].prior;
                counter++;
            } catch (error) {
                element.nextElementSibling.value = "not-urgent";
                counter++;
            }
        }
    } else {
        todoUl.innerHTML = "<li><input type='text' class='todoNameInp' placeholder='Todo....''>        <select name='priority'><option value = 'urgent' > urgent</option><option value='not-urgent'>not urgent</option></select ><textarea class='todoDesc' placeholder='description'></textarea><button onclick='addTodo(this)'>add</button></li >";
    } if (todos.completed.length > 0) {
        for (const item of todos.completed) {
            let html = "";
            html += `<li><input type="text" class="todoNameInp" disabled placeholder="Todo...." value="${item.title}"><p>Urgency: ${item.prior}</p><textarea class="todoDesc" placeholder="description" disabled>${item.desc}</textarea><button onclick="addTodo(this)">add</button></li>`;
            compUl.innerHTML = html;
        }

    } else {
        compUl.innerHTML = "";
    }
    attachListeners();
}
function deleteTodo(btn) {
    if ((btn.previousElementSibling.value <= 0 || btn.previousElementSibling.value > todos.todo.length) && todos.todo.length === 0) {
        btn.previousElementSibling.value = "";
        return;
    }
    let todo = todos.todo.splice(todos[btn.previousElementSibling.value - 1], 1);
    todos.completed.push(todo[0]);
    setTodos();
    saveTodos();
}
function addTodo(btn) {
    let desc = btn.previousElementSibling;
    let select = desc.previousElementSibling;
    let values = {
        "title": select.previousElementSibling.value,
        "desc": desc.value,
        "prior": select.value
    };

    todos.todo.push(values);
    saveTodos();
    setTodos();
}
function attachListeners() {

    for (const inp of document.getElementsByClassName('todoNameInp')) {
        inp.addEventListener('keydown', function (e) {
            if (e.key === "Enter") {
                let select = inp.nextElementSibling;
                let desc = select.nextElementSibling;
                let values = {
                    "title": inp.value,
                    "desc": desc.value,
                    "prior": select.value
                };

                todos.todo.push(values);
                saveTodos();
                setTodos();

            }
        })
    }
}
getTodos(); setTodos();