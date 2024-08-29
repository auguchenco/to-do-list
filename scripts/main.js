const TODO_KEY = "taskList";


const sortConfig = {
    text: undefined,
    date: undefined,
    state: "all",
    sortBy: "add",
    invert: false,
};
// {
//     text: string
//     date: "yyy-mm-dd"
//     state: pending completed all
//     sortBy: add title date
//     invert: bool
// };

// --- --- --- AUX FUNCTIONS --- --- ---

// --- --- --- LOCAL STORAGE AUX FUNCTIONS
// Retorna un array de objetos <Task> almacenado en el local storage. 
function getTaskList() {
    let taskListStr = localStorage.getItem(TODO_KEY);
    if (!taskListStr) { return [] };
    return JSON.parse(localStorage.getItem(TODO_KEY));
};
// Guarda el parametro <taskList>, que es un array de objetos "Task", en el local storage.
function setTaskList(taskList) {
    if (!taskList) {
        alert("No es posible guardar la lista de tareas");
    } else {
        localStorage.setItem(TODO_KEY, JSON.stringify(taskList));
    };
};

// --- --- --- ID GENERATOR AUX FUNCTION
// Genera un numero entero unico para utilizar como id.
function idNumberGenerator() {
    return Number(Date.now());
};

// --- --- --- ACCESSIBILITY AU FUNCTION
// Funcion para cargar aria labels de los elementos HTML (para mejora en la accesibilidad) !!! -> Falta agregar más
function loadAriaLabel() {

    const searchText = document.querySelector("#searchText");
    searchText.ariaLabel = "Introduce el texto para buscar una tarea";
    
    const searchBtn = document.querySelector("#searchBtn");
    searchBtn.ariaLabel = "Boton para buscar tarea según el texto introducido";
    
    const addNetTaskBtn = document.querySelector("#addTaskBtn");
    addNetTaskBtn.ariaLabel = "Boton para agregar una nueva tarea";
    
    const sortBtn = document.querySelector("#sortBtn");
    sortBtn.ariaLabel = "Boton para ordenar la lista de tareas";
    

    const formTask = document.querySelector("#formTask");
    formTask.ariaLabel = "Formulario para crear una nueva tarea";
    
    const formTaskTitle = document.querySelector("#formTaskTitle");
    formTaskTitle.ariaLabel = "Título de la nueva tarea, puedes introducir el título de tu nueva tarea";
    
    const formTaskDate = document.querySelector("#formTaskDate");
    formTaskDate.ariaLabel = "Fecha de la nueva tarea, puedes introducir la fecha de tu nueva tarea";
    
    const formTaskDescription = document.querySelector("#formTaskDescription");
    formTaskDescription.ariaLabel = "Descripción de la nueva tarea, puedes introducir la descripción de tu nueva tarea";
    
    const saveTaskBtn = document.querySelector("#saveTaskBtn");
    saveTaskBtn.ariaLabel = "Boton guardar de la nueva tarea, puedes guardar tu nueva tarea";
    

    const taskList = document.querySelector("#taskList");
    taskList.ariaLabel = "Lista de tareas";
};



// --- --- --- MAIN FUNCTIONS



// --- --- --- HTML CREATE ELEMENT FUNCTIONS

// --- --- --- POP-UP FUNCTIONS

// Esta funcion crea un elemento PopUpHTML (section HTML) que será la estructura para nuestros pop-up y lo agrega al DOM.
// Le dara un titulo popUpTitle y le agregara un contenido principal popUpContent.
// Ademas de su propio boton para cerrarse, con su funcion cargada.
function getPopUpHTML(popUpTitle, popUpContent) {
    // Creamos el elemento section
    const popUpHTML = document.createElement("section");
    // Seteamos sus atributos (id y class) y creamos su cuerpo
    popUpHTML.id = "popUp";
    popUpHTML.classList.add("pop-up");
    popUpHTML.innerHTML = `
            <div class="pop-up__element">
                <div class="pop-up__element-header">
                    <h2 class="title">${popUpTitle}</h2>
                    <button type="button" id="popUpCloseBtn" class="button">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                    </button>
                </div>
                <div class="pop-up__element-main">
                </div>
            </div>
            `;
    // Agregamos el boton para que se cierre
    popUpHTML.querySelector("#popUpCloseBtn").addEventListener("click", () => popUpHTML.remove());
    // Agregamos el elemento que tendra el pop-up
    popUpHTML.querySelector(".pop-up__element-main").append(popUpContent);
    // Agregamos el pop-up al main
    document.querySelector(".main").append(popUpHTML);
    // Lo retornamos por si lo queremos usar
    return popUpHTML;
};

// Esta funcion crea un elemento PopUpFormHTML (section HTML) que será la estructura para nuestros formularios pop-up y lo agrega al DOM mediante un pop-up.
// Tendra un título formTitle y un contenido formContent.
function getPopUpFormHTML(formTitle, form) {
    return getPopUpHTML(formTitle, form);
};

// Esta funcion crea un PopUpFormTaskHTML, es un pop-up con un formulario por defecto para un elemento de tipo Task.
// Servira como estructura para crear nuevas tareas o editar tareas.
function getPopUpFormTaskHTML(formType) {
    // Creamos el elemento form
    const formHTML = document.createElement("form");
    formHTML.id = "formTask";
    formHTML.classList.add("form");
    formHTML.innerHTML = `
                        <fieldset class="fieldset">
                            <legend class="legend">Task</legend>

                            <div class="input__container">
                                <label for="formTaskTitle" class="label">Title:</label>
                                <input type="text" placeholder="Do something..." maxlength="30" name="title" id="formTaskTitle" class="input" required>
                            </div>
                        </fieldset>

                        <fieldset  class="fieldset">
                            <legend class="legend">Information</legend>

                            <div class="input__container">
                                <label for="formTaskDate" class="label">Date:</label>
                                <input type="date" name="date" id="formTaskDate" class="input">
                            </div>

                            <div class="input__container input__container--text-area">
                                <label for="formTaskDescription"  class="label">Description:</label>
                                <textarea type="text" placeholder="Start with..." maxlength="150" rows="5" form="formTask" name="description" id="formTaskDescription" class="input text-area"></textarea>
                            </div>
                        </fieldset>

                        <div class="buttons__container">
                            <button type="submit" id="saveTaskBtn" class="button">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" /><path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M14 4l0 4l-6 0l0 -4" /></svg>
                            </button>
                        </div>
                            `;

    let formTitle = '';
    switch (formType) {
        case "new-task":
            // En caso de nueva tarea solo modificmaos el texto
            formTitle = "New Task";
            break;

        case "edit-task":
            // En caso de editar la tarea modificamos el texto y mandamos unas banderas para poder completar el formulario
            formTitle = "Edit Task"

            // Cremaos 2 banderas ocultas, el id y el isCheck
            const idSender = document.createElement("input");
            idSender.input = "text";
            idSender.name = "id";
            idSender.id = "formTaskId";
            idSender.classList.add("hidden");

            const isCheckedSender = document.createElement("input");
            isCheckedSender.type = "text";
            isCheckedSender.name = "isCheck";
            isCheckedSender.id = "formTaskIsCheck";
            isCheckedSender.classList.add("hidden");

            formHTML.querySelector(".input__container").append(idSender);
            formHTML.querySelector(".input__container").append(isCheckedSender);
            break;
            
            default:
                console.log(`ERROR - ${formType} no es un tipo de formulario valido`);
                break;
    };
    formHTML.addEventListener("submit", saveTask);
    return getPopUpFormHTML(formTitle, formHTML);
};

// Esta funcion crea un PopUpSortFormHTML
// Sirve para ordenar la lista de tareas
function getPopUpFormSortHTML(sortConfig) {
    // Creamos el elemento form
    const formHTML = document.createElement("form");
    formHTML.classList.add("form");
    const text = (sortConfig.text) ? (sortConfig.text) : '';
    formHTML.innerHTML = `
                        <fieldset class="fieldset">
                            <legend class="legend">Filter</legend>

                            <div class="input__container">
                                <label for="formTaskText" class="label">Text:</label>
                                <input type="text" placeholder="Do something..." maxlength="30" name="text" id="formTaskText" class="input" value=${text}>
                            </div>

                            <div class="input__container">
                                <label for="formTaskDate" class="label">Date:</label>
                                <input type="date" name="date" id="formTaskDate" class="input" value=${sortConfig.date}>
                            </div>

                            <div class="input__container">
                                <label for="formTaskState" class="label">State:</label>
                                <select name="state" id="formTaskState" class="input" required>
                                    <option value=${sortConfig.state}></option>
                                    <option value="all">All</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                        </fieldset>

                        <fieldset  class="fieldset">
                            <legend class="legend">Sort</legend>

                            <div class="input__container">
                                <label for="formTaskSortBy" class="label">Sort by:</label>
                                <select name="sortBy" id="formTaskSortBy" class="input" value=${sortConfig.sortBy} required>
                                    <option value=${sortConfig.sortBy}></option>
                                    <option value="add">Add</option>
                                    <option value="title">Title</option>
                                    <option value="date">Date</option>
                                </select>
                            </div>

                            <div class="input__container">
                                <label for="formTaskAscOrd" class="label">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-sort-descending"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l9 0" /><path d="M4 12l7 0" /><path d="M4 18l7 0" /><path d="M15 15l3 3l3 -3" /><path d="M18 6l0 12" /></svg>
                                </label>
                                <input type="radio" name="invert" value="false" id="formTaskAscOrd" class="input">

                                <label for="formTaskDescOrd" class="label">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-sort-ascending"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l7 0" /><path d="M4 12l7 0" /><path d="M4 18l9 0" /><path d="M15 9l3 -3l3 3" /><path d="M18 6l0 12" /></svg>
                                </label>
                                <input type="radio" name="invert" value="true" id="formTaskDescOrd" class="input">
                            </div>
                        </fieldset>



                        <div class="buttons__container">
                        <button type="button" id="resetSortConfig" class="button">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-restore"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.06 13a9 9 0 1 0 .49 -4.087" /><path d="M3 4.001v5h5" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>    
                        
                        </button>
                        <button type="submit" id="sortTaskBtn" class="button">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-sort-ascending"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l7 0" /><path d="M4 12l7 0" /><path d="M4 18l9 0" /><path d="M15 9l3 -3l3 3" /><path d="M18 6l0 12" /></svg>

                        </button>
                        </div>
                        `;
    
    formHTML.addEventListener("submit", sortTaskList);
    formHTML.querySelector("#resetSortConfig").addEventListener("click", resetSortConfig);
    return getPopUpFormHTML("Sort Task List", formHTML);
}



// --- --- --- STORAGE/HTML-VIEW FUNCTIONS

// Crea un objeto "Task" con los datos que nos envia el formulario form[id="formTask"] (a travez de la propiedad target del parametro event (form[id="formTask"] === event.target)) y lo guarda en el array de objetos "Task" que se encuentra en el local storage.
function saveTask(event) {
    // Cortamos el flujo por defecto del evento event
    event.preventDefault();

    // Capturamos el formulario, guardamos la info. en el objeto formData <FormData()> y lo reseteamos.
    const form = event.target; // = document.querySelector("#formTask")
    const formData = new FormData(form);

    // Creamos el objeto newTask y seteamos los atributos capturados del formulario
    const newTask = {};
    formData.forEach((value, key) => {
        newTask[key] = value;
    });
    
    // Si la tarea existia previamente la actualizamos sino la agregamos
    const newTaskList = getTaskList();
    
    // Manejamos la posibilidad de que la tarea se encuentre en la lista (caso de edicion)
    const preExistentTaskIndex = newTaskList.findIndex((task) => task.id === newTask.id);
    if (preExistentTaskIndex === -1) {
        // No esta, es tarea nueva, agregamos
        newTask.id = `task-${idNumberGenerator()}`;
        newTask.isCheck = false;
        newTaskList.push(newTask);
    }
    else {
        // Esta, es edicion, por lo que actualizamos
        newTask.isCheck = (newTask.isCheck == 'true') ? true : false;
        newTaskList[preExistentTaskIndex] = newTask;
    };


    // Guardamos la lista de tareas en el local storage
    setTaskList(newTaskList);

    // Resetamos el formulario, ocultamos la ventana de nueva tarea y mostramos la lista de tareas
    form.reset();
    document.querySelector("#popUp").remove();
    renderTaskListHTML(newTaskList);
};

// Edita una tarea mediante el formulario para tareas del pop-up
function editTask(taskId) {
    const taskList = getTaskList();
    const taskIndex = taskList.findIndex((task) => taskId === task.id);
    const form = getPopUpFormTaskHTML("edit-task");
    form.querySelector("#formTaskId").value = taskList[taskIndex].id;
    form.querySelector("#formTaskIsCheck").value = taskList[taskIndex].isCheck;
    form.querySelector("#formTaskTitle").value = taskList[taskIndex].title;
    form.querySelector("#formTaskDate").value = taskList[taskIndex].date;
    form.querySelector("#formTaskDescription").value = taskList[taskIndex].description;
};

// Actualiza el estado "isCheck" de un objeto "Task" almacenado en el local storage (con id === "taskId"), luego renderiza la lista de objetos "Task" del local storage.
function updateCompletedTask(taskId, isCheck) {
    const taskList = getTaskList();
    const taskIndex = taskList.findIndex( task => task.id === taskId);
    taskList[taskIndex].isCheck = isCheck;
    setTaskList(taskList);
    renderTaskListHTML(taskList);
}

// Elimina un objeto "Task" almacenado en el local storage (con id === "taskId"), luego renderiza la lista de objetos "Task" del local storage.
function deleteTask(taskId) {
    const taskList = getTaskList();
    const taskIndex = taskList.findIndex( task => task.id === taskId);
    if (taskIndex === -1) return ;
    taskList.splice(taskIndex,1);
    setTaskList(taskList);
    renderTaskListHTML(taskList);
}

function resetSortConfig() {
    sortConfig.text = undefined;
    sortConfig.text = undefined;
    sortConfig.date = undefined;
    sortConfig.state = "all";
    sortConfig.sortBy = "add";
    sortConfig.invert = false;
    document.querySelector(".form").reset();
    document.querySelector("#popUp").remove();
    getPopUpFormSortHTML(sortConfig);
};

function sortTaskListAux(taskList, sortConfig) {
    if (sortConfig.text) { taskList = taskList.filter( (task) => `${task.title} ${task.description}`.toLowerCase().includes(`${sortConfig.text}`.toLowerCase()) ); };
    if (sortConfig.date) { taskList = taskList.filter( (task) => task.date == sortConfig.date ); };
    if (sortConfig.state === "pending") { taskList = taskList.filter ( (task) => task.isCheck === false ); }
    else if (sortConfig.state === "completed") { taskList = taskList.filter ( (task) => task.isCheck === true ); };
    if (sortConfig.sortBy === "title") { taskList.sort((a,b) => a.title - b.title); }
    else if (sortConfig.sortBy === "date") { taskList.sort((a,b) => a.date - b.date); };
    if (sortConfig.invert == "true") { taskList.reverse(); };
    return taskList;
};



function sortTaskList(event) {
    event.preventDefault();

    const form = event.target; // = document.querySelector("#formTask")
    const formData = new FormData(form);

    // Creamos el objeto newTask y seteamos los atributos capturados del formulario

    formData.forEach((value, key) => {
        sortConfig[key] = value;
    });

    // Si la tarea existia previamente la actualizamos sino la agregamos
    // sortedTaskList = sortTaskListAux(getTaskList(), sortConfig);

    form.reset();
    document.querySelector("#popUp").remove();
    renderTaskListHTML(getTaskList());
    
}



// --- --- --- HTML RENDER VIEW FUNCTIONS

// Crea el cuerpo HTML de un objeto "Task" (un elemento "li" HTML, con la informacion de un objeto "Task", con sus atributos, clases y funciones) listo para ser agregado al DOM.
function renderTask(task) {
    // Cremos el elemento li con la tarea
    const taskHTML = document.createElement("li");
    taskHTML.id = task.id;
    taskHTML.classList.add("task");
    taskHTML.ariaLabel = `Tarea: ${task.title}`
    const date = task.date.split("-");
    taskHTML.innerHTML = `
                    <div class="task__header">
                        <input type="checkbox" aria-label="Checkbox: marca tu tarea ${task.title} como completada" class="input">
                        <h3 aria-label="Título de la tarea: ${task.title}">${task.title}</h3>
                        <button type="button" aria-label="Boton editar tarea: ${task.title}" class="button btnEdit">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                        </button>
                        <button type="button" aria-label="Boton elminar tarea: ${task.title}" class="button btnDelete">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7h16" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /><path d="M10 12l4 4m0 -4l-4 4" /></svg>
                        </button>
                    </div>
                    <div class="task__main">
                        <p aria-label="Descripción de la tarea ${task.title}: ${task.description}">${task.description}</p>
                    </div>
                    <div class="task__footer">
                        <span aria-label="Fecha de la tarea: ${task.title}">${date[2]} / ${date[1]} / ${date[0]}</span>
                    </div>
    `;

    // Seteamos el checkbox y configuramos las clases si el valor isCheck es true
    const chboxChecked = taskHTML.querySelector(`.task__header input[type="checkbox"]`);
    if (task.isCheck) {
        taskHTML.classList.toggle("task--checked");
        chboxChecked.checked = task.isCheck;
    };
    // Agregamos el evento para check una tarea
    chboxChecked.addEventListener("click", () => updateCompletedTask(task.id, !task.isCheck));

    // Agregamos los botones para manipular la tarea
    const btnDelete = taskHTML.querySelector(`.btnDelete`);
    btnDelete.addEventListener("click", () => deleteTask(task.id));

    const btnEdit = taskHTML.querySelector(`.btnEdit`);
    btnEdit.addEventListener("click", () => editTask(task.id));

    return taskHTML;
};

// Renderiza (agrega al DOM) la lista de objetos "Task" almacenados en el local storage.
function renderTaskListHTML(taskList) {
    // Ordenar la lista
    taskList = sortTaskListAux(taskList, sortConfig);
    
    // Seleccionamos la lista y la vaciamos
    const taskListHTML = document.querySelector("#taskList");
    taskListHTML.innerHTML = '';

    // Si no hay elementos se corta el programa
    if (taskList.length === 0) return;
        
    // Si hay elementos, los renderiza
    taskList.forEach( task => taskListHTML.append(renderTask(task)));
};



// --- --- --- DOM CONTENT LOADED --- --- ---
document.addEventListener("DOMContentLoaded", () => {

    // Agregamos el evento de crear nueva tarea al boton #addTaskBtn
    document.querySelector("#addTaskBtn").addEventListener("click", () => {
        getPopUpFormTaskHTML("new-task");
    });
    // Agregamos el evento de ordenar lista de tareas al boton #sortTaskListBtn
    document.querySelector("#sortTaskListBtn").addEventListener("click", () => {
        getPopUpFormSortHTML(sortConfig);
    });
    
    // Cargamos las etiquetas de accesibilidad
    // loadAriaLabel();

    // Renderizamos la lista de tarea en caso de que exista y tenga elementos
    renderTaskListHTML(getTaskList());
});