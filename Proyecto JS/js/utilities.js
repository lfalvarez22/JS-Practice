//Llamada a API y pintada de elementos general
fetch(`${apiUrl}/users`)
  .then((Response) => Response.json())
  .then((users) => {
    users
      .slice()
      .reverse()
      .forEach((data) => {
        sliderContainer.prepend(createUserCard(data));
      });
    slider();
  });


  
function extracDataUser(div_element) {
  const id_user = div_element.dataset.id
  fetch(`${apiUrl}/users/${id_user}`)
    .then((Response) => {
      if (!Response.ok) {
        throw new Error(`Problem with response ${Response.status}`);
      }
      return Response.json();
    })
    .then((user) => {
      createUserCompanyCard(user, div_element)
    })
    .catch((err) => console.log(err));
}

function createUserCard(user) {
  let card = document.createElement("div");
  card.setAttribute("data-id", user.id);
  card.classList.add("slide");
  let cardContainer = document.createElement("div");
  const fullName = document.createElement("h5");
  fullName.appendChild(document.createTextNode(user.name));
  cardContainer.appendChild(fullName);
  const email = document.createElement("h6");
  email.appendChild(document.createTextNode(user.email));
  cardContainer.appendChild(email);
  const address = document.createElement("address");
  const addressContent = document.createElement("p");
  addressContent.appendChild(
    document.createTextNode(
      `${user.address.street}, ${user.address.suite}, ${user.address.city}`
    )
  );
  address.appendChild(addressContent);
  cardContainer.appendChild(address);
  card.appendChild(cardContainer);
  card.addEventListener("click", getDataUser, false);
  return card;
}

function createUserCompanyCard(user, div_element) {
  let oldCompanyCard = document.querySelector(".company-card");
    if (oldCompanyCard) {
        oldCompanyCard.remove();
    } 
  let companyCard = document.createElement("div");
  let companyName = document.createElement("p");
   companyCard.classList.add("company-card");

  companyName.appendChild(document.createTextNode(user.company.name));
  companyCard.appendChild(companyName);
  div_element.appendChild(companyCard);
  return companyCard;
}


function scrollTo(e) {
  document
    .getElementById(e.target.dataset.scroll)
    .scrollIntoView({ behavior: "smooth" });
}

function getDataUser(e) {
  extracDataUser(e.target.closest("div[data-id]"));
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}


/* Welcome modal */
function createWelcomeModal() {
  let modal = document.createElement("div");
  modal.style.display = "flex";
  modal.classList.add("modal");
  let modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-content");
  let modalClose = document.createElement("span");
  modalClose.classList.add("close");
  modalClose.innerHTML = "&times;";
  modalClose.addEventListener("click", function () {
    modal.style.display = "none";
  });
  modalContainer.appendChild(modalClose);
  let modalContainerText = document.createElement("p");
  modalContainerText.appendChild(document.createTextNode("¡WELCOME PACK JS!"));
  modalContainer.appendChild(modalContainerText);
  modal.appendChild(modalContainer);
  document.body.appendChild(modal);

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}