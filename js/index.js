let button = document.querySelector(".menu-hamburger");
let menuContent = document.querySelector(".menu-content");

button.addEventListener("click", function (event) {
    menuContent.classList.toggle("showMenu");
    console.log(menuContent);
})

document.addEventListener("click", function (event) {
    if (!event.target.closest('.menu-hamburger')) {
        let menuContent = document.getElementsByClassName("menu-content");
        console.log(menuContent);

        for (let i = 0; i < menuContent.length; i++) {
            let menuOptions = menuContent[i];
            console.log(menuOptions);

            if (menuOptions.classList.contains("showMenu")) {
                menuOptions.classList.remove("showMenu");
            }
        }
    }
})

/////////////////////////////

let skills =  ["HTML", "CSS", "JavaScript", "GitHub"];
let skillsSection = document.getElementById("skills");
let skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}

/////////////////////////////

let projectSection = document.getElementById("projects");
let projectList = projectSection.querySelector("ul");

fetch('https://api.github.com/users/perkinsgianni/repos')
    .then(response => {
        if (!response.ok) {
            throw new Error("Request failed");
        }
        return response.json();
    })
    .then(repositories => {
        console.log(repositories);

        for (let i = 0; i < repositories.length; i++) {
            let project = document.createElement("a");
            project.href = `https://github.com/perkinsgianni/${repositories[i].name}`;
            project.target = "_blank"
            project.textContent = repositories[i].name;
            projectList.appendChild(project);
        }
    })
    .catch(error => {
        let errorMessage = document.createElement("p");
        errorMessage.innerHTML = `${error}`;
        projectList.appendChild(errorMessage);
    })

/////////////////////////////

let messageForm = document.querySelector("form[name='leave_message']");
messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = event.target.usersName.value;
    let email = event.target.usersEmail.value;
    let message = event.target.usersMessage.value;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    let messageSection = document.getElementById("messages");
    let messageList = messageSection.querySelector("ul");
    let newMessage = document.createElement("li");
    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a>: <span>${message}</span>`

    let removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function (event) {
        let entry = removeButton.parentNode;
        entry.remove();
    })

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    messageForm.reset();
});

/////////////////////////////

let today = new Date();
let thisYear = today.getFullYear();

let footer = document.createElement("footer");
let copyright = document.createElement("p");
copyright.innerHTML = `&copy; ${thisYear} Gianni Perkins`;
document.body.appendChild(footer).appendChild(copyright);
