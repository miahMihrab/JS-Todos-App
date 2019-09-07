const addForm = document.querySelector('.add')
const list = document.querySelector('.todos');
const del = document.querySelector('.fa-trash')
const search = document.querySelector('.search')
//Create todo function
//localStorage.removeItem('todos')

let allTodos = [];


const generateTemplate = (todo) => {
    // console.log(todo.todo)

    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="fa fa-trash delete" aria-hidden="true"></i>
</li>
    `
    list.innerHTML += html;

    addForm.reset();


}


//Look for todos
if (localStorage.getItem('todos')) {
    const lookForTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos'))
        console.log(todos)
        //localStorage.removeItem('todos')
        todos.forEach(x => {
            allTodos.push(x)
            generateTemplate(x.todo)
        })

    }
    lookForTodos()
    //generateTemplate(allTodos)
}

//DELETE todos
const delTodos = (tds) => {
    console.log(tds)
    let newTodo = []
    const todos = JSON.parse(localStorage.getItem('todos'))
    todos.forEach(x => {
        if (x.todo != tds)
            newTodo.push(x)
    })
    console.log(newTodo)
    localStorage.setItem('todos', JSON.stringify(newTodo))
}





addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    allTodos.push({
        todo: todo
    })

    // console.log(allTodos)
    if (localStorage.getItem('todos')) {
        const lookForTodos = () => {
            localStorage.setItem('todos', JSON.stringify(allTodos))
            let length = JSON.parse(localStorage.getItem('todos')).length
            console.log(length)
            // console.log(JSON.parse(localStorage.getItem('todos'))[length - 1].todo)
            generateTemplate(JSON.parse(localStorage.getItem('todos'))[length - 1].todo)
        }
        lookForTodos()
        console.log(allTodos)

    } else {

        localStorage.setItem('todos', JSON.stringify(allTodos))
        generateTemplate(allTodos[allTodos.length - 1])
    }

})

//Delete todos
list.addEventListener('click', e => {

    //const TD = e.target.textContent.trim();
    if (e.target.classList.contains('delete')) {

        //console.log(e.target.parentElement.textContent.trim())
        const TD = e.target.parentElement.textContent.trim();
        // console.log(TD)
        delTodos(TD)
        e.target.parentElement.remove()
        //   console.log(e.target.textContent)
    }
})

//Filter Todos
const filterTodos = (term) => {
    Array.from(list.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add('filtered'))

    Array.from(list.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove('filtered'))
}


//Search
search.addEventListener('keyup', e => {
    e.preventDefault();
    const term = search.search.value.trim()
    filterTodos(term.toLowerCase())
})