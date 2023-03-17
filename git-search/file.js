const buttonSearch = document.querySelector(".search");
const input = document.querySelector("input");
const main = document.querySelector("main");
const startSearch = document.querySelector("h2");
const reload = document.querySelector(".reload");

function setNameGit(obj) {
  if (obj.total_count !== 0) {
    main.innerHTML = "";
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("mainDivStyle");
    main.append(mainDiv);
    obj.items.forEach((element, i) => {
      const cardPerson = document.createElement("div");
      cardPerson.classList.add("userCard");
      mainDiv.append(cardPerson);
      const imgPerson = document.createElement("img");
      imgPerson.classList.add("userImage");
      imgPerson.setAttribute("src", element.avatar_url);
      cardPerson.append(imgPerson);
      const namePerson = document.createElement("p");
      namePerson.classList.add("username");
      namePerson.textContent = element.login;
      cardPerson.append(namePerson);
      cardPerson.addEventListener("click", () => {
        window.sessionStorage.setItem("clickedPerson", JSON.stringify(element));
        window.location.href = "one-person.html";
      });
    });
  } else {
    const notFound = document.createElement("h2");
    main.innerHTML = "";
    notFound.textContent = "User not found try again";
    main.append(notFound);
  }
}

const newXML = new XMLHttpRequest();
buttonSearch.addEventListener("click", () => {
  newXML.open("GET", `https://api.github.com/search/users?q=${input.value}`);
  newXML.send();
  newXML.onload = () => {
    if (newXML.status >= 200 && newXML.status < 400) {
      const response = JSON.parse(newXML.response);
      setNameGit(response);
      startSearch.style.display = "none";
    } else {
      const error = document.createElement("h2");
      main.innerHTML = "";
      error.textContent = "Please insert a input";
      main.append(error);
      startSearch.style.display = "none";
    }
    input.value = "";
  };
});

reload.addEventListener("click", () => {
  window.location.reload();
});
