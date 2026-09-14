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

        const nom = form.elements["nom"].value.trim();
const email = form.elements["email"].value.trim();
const situation = form.elements["condition_matrimoniale"].value;




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


const signaturePad = document.getElementById("signature-pad");
const signatureData = document.getElementById("signature-data");
const clearSignature = document.getElementById("clear-signature");

if (signaturePad) {

    const ctx = signaturePad.getContext("2d");

    function resizeSignaturePad() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);

        signaturePad.width = signaturePad.offsetWidth * ratio;
        signaturePad.height = signaturePad.offsetHeight * ratio;

        ctx.scale(ratio, ratio);

        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#000";
    }

    resizeSignaturePad();

    let drawing = false;

    function getPosition(event) {
        const rect = signaturePad.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    signaturePad.addEventListener("pointerdown", function(event) {
        drawing = true;

        const position = getPosition(event);

        ctx.beginPath();
        ctx.moveTo(position.x, position.y);

        signaturePad.setPointerCapture(event.pointerId);
    });

    signaturePad.addEventListener("pointermove", function(event) {

        if (!drawing) return;

        const position = getPosition(event);

        ctx.lineTo(position.x, position.y);
        ctx.stroke();
    });

    signaturePad.addEventListener("pointerup", function() {
        drawing = false;
        signatureData.value = signaturePad.toDataURL("image/png");
    });

    signaturePad.addEventListener("pointercancel", function() {
        drawing = false;
    });

    clearSignature.addEventListener("click", function() {

        ctx.clearRect(
            0,
            0,
            signaturePad.width,
            signaturePad.height
        );

        signatureData.value = "";
    });
}
