/* =========================================
   MENU MOBILE
========================================= */

const menuButton = document.getElementById("menuButton");
const navigation = document.querySelector(".navigation");


menuButton.addEventListener("click", function () {

    navigation.classList.toggle("show");

});


/* =========================================
   FERMER LE MENU APRÈS UN CLIC
========================================= */

const navigationLinks = document.querySelectorAll(".navigation a");


navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navigation.classList.remove("show");

    });

});
