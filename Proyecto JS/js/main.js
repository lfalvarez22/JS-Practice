

//Icon mobile efects
icon.addEventListener("click", () => {
  menu_links.classList.toggle("activated");
  handmade_icon.forEach((child) => {
    child.classList.toggle("animed");
  });
});


//Menu push efect elements
pulsedElement.forEach((element) => {
  element.addEventListener("click", () => {
    menu_links.classList.remove("activated");
    pulsedElement.forEach((el) => {
      el.classList.remove("activated");
    });
    element.classList.add("activated");
  });
});


//Button scrolling
document.querySelectorAll(".scroll-to").forEach((element) => {
  element.addEventListener("click", scrollTo);
});


//Welcome msg
setTimeout(() => {
  createWelcomeModal();
}, 2000);



