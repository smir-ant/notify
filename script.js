/**
 * =============================================================================
 * SCRIPT DE NOTIFICATIONS
 * =============================================================================
 * 
 * Description :
 *  - Un script JavaScript permettant d'afficher des notifications sur votre page.
 *  - Les notifications peuvent être de différents types (default, error, success,
 *    warning, etc.) et apparaître pour un certain temps ou rester jusqu'à
 *    fermeture manuelle.
 *
 * Installation :
 *  1. Incluez la feuille de style CSS dans la section <head> de votre fichier :
 *     <link rel="stylesheet" href="style.css">
 * 
 *  2. Incluez ce script JavaScript juste avant la balise </body> :
 *     <script src="script.js"></script>
 * 
 * Utilisation :
 *  - Pour afficher une notification, utilisez la fonction globale `showNotification`.
 *  - Exemple d'appels :
 *    
 *    // Notification par défaut, persistante (pas de paramètre pour le delay)
 *    showNotification("Ceci est une notification par défaut !");
 * 
 *    // Notification d'erreur persistante
 *    showNotification("Ceci est une notification d'erreur !", "error", 0);
 * 
 *    // Notification de succès avec une durée de 5 secondes
 *    showNotification("Ceci est une notification de succès !", "success", 5000);
 * 
 *    // Notification de danger persistante
 *    showNotification("Ceci est une notification de danger !", "warning", 0);
 * 
 * Options :
 *  - showNotification(messageOrOptions, typeOrDelayBeforeHide = "default", delayBeforeHide = 0)
 *    > messageOrOptions : String ou Object
 *       - String : représente directement le message de la notification.
 *       - Object : peut contenir { message, type, delayBeforeHide }, par exemple :
 *         {
 *           message: "Votre message",
 *           type: "success",
 *           delayBeforeHide: 3000
 *         }
 *    > typeOrDelayBeforeHide : Soit une chaîne (type de notification), soit un nombre 
 *      (durée en millisecondes) si vous ne souhaitez pas spécifier de type.
 *    > delayBeforeHide : Durée en millisecondes avant disparition automatique.
 *      0 = pas de fermeture automatique (notification persistante).
 * 
 * Fonctionnalités :
 *  - Bouton "Fermer" qui apparaît automatiquement si la notification est persistante.
 *  - Fermeture automatique si un délai est spécifié.
 *  - Fermeture de la première notification visible en appuyant sur la touche "Escape".
 *  - Gestion flexible des types de notifications (icône et style personnalisables).
 * 
 * Personnalisation :
 *  - Les types de notification sont définis dans l'objet `notificationTypes`.
 *    Vous pouvez en ajouter d'autres ou modifier les classes existantes pour
 *    adapter le style et l'icône (via Font Awesome).
 * 
 * Licence :
 *  - Distribué sous licence MIT. Utilisable librement.
 * =============================================================================
 */

(function() {
    /**
     * Écoute l'événement 'keydown' pour gérer la fermeture d'une notification
     * lorsque la touche Escape est pressée.
     */
    document.addEventListener("keydown", closeNotificationOnEscape);

    /**
     * Définit les différents types de notifications disponibles.
     *  - icon  : la classe Font Awesome de l'icône.
     *  - class : la classe CSS appliquée à la notification.
     */
    const notificationTypes = {
        default: { icon: "fas fa-info-circle", class: "default" },
        error: { icon: "fas fa-times-circle", class: "error" },
        success: { icon: "fas fa-check-circle", class: "success" },
        warning: { icon: "fas fa-exclamation-circle", class: "warning" }
    };

    /**
     * Affiche une notification.
     * 
     * @param {string|object} messageOrOptions
     *  - Un message sous forme de string
     *  - Ou un objet d'options : { message, type, delayBeforeHide }
     * @param {string|number} [typeOrDelayBeforeHide="default"]
     *  - Soit le type de notification ("default", "error", etc.)
     *  - Soit un nombre représentant la durée avant fermeture automatique.
     * @param {number} [delayBeforeHide=0]
     *  - Durée en millisecondes avant la disparition automatique de la notification.
     *  - 0 = Notification persistante (besoin d'un clic sur "Fermer" ou Escape).
     */
    function showNotification(messageOrOptions, typeOrDelayBeforeHide = "default", delayBeforeHide = 0) {
        let message;
        let type;
        let delayBeforeHideValue;

        // Gestion des paramètres pour la flexibilité : string ou objet.
        if (typeof messageOrOptions === "string") {
            // Si on reçoit une simple chaîne de caractères, c'est le message.
            message = messageOrOptions;

            // Si le second paramètre est une chaîne, c'est le type. Sinon, c'est le délai.
            type = typeof typeOrDelayBeforeHide === "string" 
                ? typeOrDelayBeforeHide 
                : "default";

            // Si le second paramètre est un nombre, il s'agit du délai avant fermeture.
            delayBeforeHideValue = typeof typeOrDelayBeforeHide === "number" 
                ? typeOrDelayBeforeHide 
                : delayBeforeHide;
        } else {
            // Si le premier paramètre est un objet, on extrait ses propriétés.
            const options = messageOrOptions;
            message = options.message;
            type = options.type || "default";
            // Si l'objet possède déjà un delayBeforeHide, on l'utilise. Sinon, on prend la valeur par défaut.
            delayBeforeHideValue = options.delayBeforeHide !== undefined 
                ? options.delayBeforeHide 
                : delayBeforeHide;
        }

        // Sélectionne ou crée le conteneur principal des notifications.
        let notificationContainer = document.getElementById("notification-container");
        if (!notificationContainer) {
            notificationContainer = document.createElement("div");
            notificationContainer.id = "notification-container";
            document.body.appendChild(notificationContainer);
        }

        // Crée l'élément de notification principal.
        const notification = document.createElement("div");
        notification.className = `notification ${notificationTypes[type].class}`;

        // Ajoute l'icône correspondant au type de notification.
        const icon = document.createElement("i");
        icon.className = notificationTypes[type].icon;
        notification.appendChild(icon);

        // Crée un conteneur pour le message.
        const messageContainer = document.createElement("div");
        messageContainer.className = "notif-container";

        // Ajoute l'élément de texte du message.
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        messageElement.className = "notif";

        messageContainer.appendChild(messageElement);
        notification.appendChild(messageContainer);

        // Si la notification est persistante (delayBeforeHideValue === 0),
        // on ajoute un bouton "Fermer" qui sera cliquable.
        if (delayBeforeHideValue === 0) {
            const closeButton = document.createElement("button");
            closeButton.className = "close-button";
            closeButton.textContent = "Fermer";

            // Événement qui ferme la notification lorsque l'utilisateur clique sur le bouton.
            closeButton.addEventListener("click", function(event) {
                event.stopPropagation();
                closeNotification(notification);
            });

            notification.appendChild(closeButton);
        }

        // Ajoute la notification au conteneur principal.
        notificationContainer.appendChild(notification);

        // Petite astuce pour détecter si le texte déborde et lui appliquer un style (ex: scroll).
        setTimeout(() => {
            if (messageElement.scrollWidth > messageContainer.clientWidth) {
                messageElement.classList.add("scrolling");
            }
        }, 0);

        // Si on a défini un délai de fermeture (différent de 0),
        // on déclenche une fermeture automatique.
        if (delayBeforeHideValue !== 0) {
            setTimeout(function() {
                closeNotification(notification);
            }, delayBeforeHideValue);
        }
    }

    /**
     * Ferme et retire une notification du DOM.
     * @param {HTMLElement} notification - L'élément de notification à fermer.
     */
    function closeNotification(notification) {
        if (notification && notification.parentElement) {
            // Ajoute une classe "remove" pour gérer une animation de disparition si désiré.
            notification.classList.add("remove");

            // Retire l'élément du DOM après un court délai (par ex. 300ms) 
            // pour laisser le temps à l'animation.
            setTimeout(function() {
                notification.parentElement.removeChild(notification);
            }, 300);
        }
    }

    /**
     * Ferme la première notification visible lorsque l'utilisateur appuie
     * sur la touche "Escape".
     * @param {KeyboardEvent} event - L'événement clavier.
     */
    function closeNotificationOnEscape(event) {
        if (event.key === "Escape") {
            // Sélectionne la première notification qui n'est pas déjà en cours de suppression.
            const notification = document.querySelector(".notification:not(.remove)");
            if (notification) {
                closeNotification(notification);
            }
        }
    }

    // Rattache la fonction showNotification à l'objet window, 
    // pour qu'elle soit accessible globalement.
    window.showNotification = showNotification;

})();
