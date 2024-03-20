const exibirTodos = document.querySelector("#todos");
const appleButton = document.querySelector("#apple");
const samsungButton = document.querySelector("#samsung");
const motorolaButton = document.querySelector("#motorola");

const filterPhones = (filterValue) => {
    const phones = document.querySelectorAll('.card');

    phones.forEach((phone) => {
        if(filterValue === "todos" || phone.classList.contains(filterValue)) {
            phone.classList.remove("hidden");
        }
        else {
            phone.classList.add("hidden");
        }
    });
}

export function inicializarFiltros() {
    appleButton.addEventListener("click", function() {
        filterPhones("apple");
    })

    samsungButton.addEventListener("click", function() {
        filterPhones("samsung");
    })

    motorolaButton.addEventListener("click", function() {
        filterPhones("motorola");
    })

    exibirTodos.addEventListener("click", function() {
        filterPhones("todos");
    })
}
