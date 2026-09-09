document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("applicationForm");

    const motivation =
        document.getElementById("motivation");

    const counter =
        document.getElementById("counter");


    /* =====================================
       COMPTEUR MOTIVATION
    ===================================== */

    if (motivation && counter) {

        motivation.addEventListener("input", function () {

            counter.textContent =
                motivation.value.length + " / 5000";

        });

    }


    /* =====================================
       FORMULAIRE
    ===================================== */

    if (!form) {
        return;
    }


    form.addEventListener("submit", async function (event) {

        event.preventDefault();


        /* =====================================
           RÉCUPÉRATION DES DONNÉES
        ===================================== */

     const email =
    document.getElementById("email").value.trim();

const whatsapp =
    document.getElementById("whatsapp").value.trim();

const situation =
    document.getElementById("situation").value;

const age =
    document.getElementById("age").value;


        /* =====================================
           NOM
        ===================================== */

        if (nom === "") {

            alert(
                "Veuillez renseigner votre nom complet."
            );

            return;
        }


        /* =====================================
           EMAIL
        ===================================== */

        if (email === "") {

            alert(
                "Veuillez renseigner votre adresse email."
            );

            return;
        }

        /* =====================================
   WHATSAPP
===================================== */

if (whatsapp === "") {

    alert(
        "Veuillez renseigner votre numéro WhatsApp."
    );

    return;
}

const whatsappClean =
    whatsapp.replace(/[\s()-]/g, "");

if (!/^\+?[0-9]{8,15}$/.test(whatsappClean)) {

    alert(
        "Veuillez renseigner un numéro WhatsApp valide."
    );

    return;
}

        /* =====================================
           SITUATION MATRIMONIALE
        ===================================== */

        if (situation === "") {

            alert(
                "Veuillez sélectionner votre situation matrimoniale."
            );

            return;
        }



        /* =====================================
           ÂGE
        ===================================== */

        if (
            age === "" ||
            Number(age) < 18
        ) {

            alert(
                "Vous devez avoir au minimum 18 ans pour déposer une candidature."
            );

            return;
        }


    





        /* =====================================
           ENGAGEMENTS
        ===================================== */

        const engagement1 =
            document.getElementById("engagement1");

        const engagement2 =
            document.getElementById("engagement2");


        if (
            !engagement1.checked ||
            !engagement2.checked
        ) {

            alert(
                "Veuillez accepter les deux engagements avant de continuer."
            );

            return;
        }


        /* =====================================
           BOUTON
        ===================================== */

        const button =
            form.querySelector(".continue-button");

        const originalText =
            button.textContent;

        button.disabled = true;

        button.textContent =
            "Envoi en cours...";


        /* =====================================
           ENVOI FORMSPREE
        ===================================== */

        try {

            const formData =
                new FormData(form);


            const response =
                await fetch(
                    "https://formspree.io/f/mzepljnp",
                    {
                        method: "POST",

                        body: formData,

                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            /* =====================================
               SUCCÈS
            ===================================== */

            if (response.ok) {

                window.location.href =
                    "https://new.sebpay.bj/fr/pay/demande-dinitiation-8NniK3";

                return;
            }


            /* =====================================
   ERREUR FORMSPREE
===================================== */

let errorMessage =
    "Impossible d'envoyer votre candidature.";

try {

    const errorData =
        await response.json();

    console.error(
        "Réponse Formspree :",
        errorData
    );

    if (errorData.errors) {

        errorMessage += "\n\n";

        errorData.errors.forEach(function (error) {

            errorMessage +=
                (error.field
                    ? error.field + " : "
                    : "") +
                error.message +
                "\n";

        });

    } else if (errorData.error) {

        errorMessage +=
            "\n\n" +
            errorData.error;

    } else if (errorData.message) {

        errorMessage +=
            "\n\n" +
            errorData.message;
    }

} catch (jsonError) {

    console.error(
        "Impossible de lire la réponse Formspree :",
        jsonError
    );

}

alert(errorMessage);

        } catch (error) {

            console.error(
                "Erreur Formspree :",
                error
            );

            alert(
                "Impossible de contacter le service d'envoi. Vérifiez votre connexion Internet."
            );

        }


        /* =====================================
           RESTAURATION DU BOUTON
        ===================================== */

        button.disabled = false;

        button.textContent =
            originalText;

    });

});
