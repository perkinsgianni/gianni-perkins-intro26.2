let today = new Date();
let thisYear = today.getFullYear();

/////////////////////////////

let footer = document.createElement("footer");
let copyright = document.createElement("p");
copyright.innerHTML = `&copy; ${thisYear} Gianni Perkins`;
document.body.appendChild(footer).appendChild(copyright);

/////////////////////////////

let skills =  ["HTML", "JavaScript", "CSS", "GitHub"];
let skillsSection = document.getElementById("skills");
let skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}

/////////////////////////////

let messageForm = document.querySelector('form[name="leave_message"]');
messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = event.target.usersName.value;
    let email = event.target.usersEmail.value;
    let message = event.target.usersMessage.value;
    // console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    let messageSection = document.getElementById("messages");
    let messageList = messageSection.querySelector("ul");
    let newMessage = document.createElement("li");
    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a>: <span>${message}`

    let removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";
    removeButton.addEventListener("click", function (event) {
        let entry = removeButton.parentNode;
        entry.remove();
    })

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    messageForm.reset();
});
