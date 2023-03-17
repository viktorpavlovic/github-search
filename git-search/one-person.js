const person = JSON.parse(sessionStorage.getItem("clickedPerson"));

const mainRepo = document.querySelector(".repo-div");
const goBack = document.querySelector(".goto");

console.log(person.repos_url);

// const

function printCards(obj) {
  obj.forEach((element) => {
    console.log(element.name);
    const repoCard = document.createElement("div");
    repoCard.classList.add("repo-card");
    mainRepo.append(repoCard);
    const repoName = document.createElement("p");
    repoName.textContent = element.name;
    repoName.classList.add("repoName");
    repoCard.append(repoName);
    const repoImg = document.createElement("img");
    repoImg.setAttribute("src", element.owner.avatar_url);
    repoImg.classList.add("repoImg");
    repoCard.append(repoImg);
    const repoDescription = document.createElement("p");
    console.log(element.description);
    if (element.description !== null) {
      repoDescription.textContent = element.description;
      repoDescription.classList.add("repoDescription");
      repoCard.append(repoDescription);
    } else {
      repoDescription.textContent = "No description";
      repoDescription.classList.add("repoDescription");

      repoCard.append(repoDescription);
    }
    // console.log(stargazers_count);
    const stars = document.createElement("p");
    if (element.stargazers_count !== 0) {
      stars.innerHTML = `${element.stargazers_count}  &#11088;`;
      stars.classList.add("repoStars");
      repoCard.append(stars);
    } else {
      stars.textContent = "No stars for this rubish project";
      stars.classList.add("repoStars");
      repoCard.append(stars);
    }
  });

  goBack.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

const newXMLOnePerson = new XMLHttpRequest();

newXMLOnePerson.open("GET", person.repos_url);
newXMLOnePerson.send();
newXMLOnePerson.onload = () => {
  if (newXMLOnePerson.status >= 200 && newXMLOnePerson.status < 400) {
    const response = JSON.parse(newXMLOnePerson.response);
    printCards(response);
  }
};
