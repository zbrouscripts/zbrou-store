export default defineI18nConfig(() => ({
    legacy: false,
    locale: "es-ES",
    numberFormats: {
        "es-ES": { currency: { style: "currency", currency: "EUR", notation: "standard" } },
        "en-US": {
            currency: {
                style: "currency",
                currency: "USD",
                notation: "standard",
            },
        },
        "de-DE": {
            currency: {
                style: "currency",
                currency: "EUR",
                notation: "standard",
            },
        },
    },
    messages: {
        "es-ES": {
            store_name: "ZBrou Scripts",
            play: "ZBrou",
            index: {
                hero: {
                    title: "ZBrou Scripts",
                    subtitle: "RECURSOS FIVEM DE ZBROU",
                },
            },
            buttons: {
                checkout: "Finalizar compra",
                cart: "Cesta | Cesta ({n}) | Cesta ({n})",
                add_to_cart: "Añadir a la cesta",
                add_gift_to_cart: "Añadir regalo a la cesta",
                gift: "Regalar",
                login: "Acceder",
                logout: "Cerrar sesión",
                copied: "¡Copiado!",
                home: "Inicio",
                menu: "Menú",
                go_to_top: "Subir arriba",
            },
            auth: {
                login: {
                    title: "Introduce tu usuario de {gameTypeName}",
                },
                logout: {
                    title: "¿Seguro que quieres cerrar sesión?",
                },
                login_redirect: {
                    title: "Pulsa aquí para acceder",
                    method: "Acceder con {name}",
                },
                login_complete: {
                    title: "Has iniciado sesión",
                },
                username: "Usuario",
            },
            gift: {
                input_placeholder: "Usuario de {gameTypeName} del destinatario",
            },
            error: {
                page_not_found: "Página no encontrada",
                cannot_add_package:
                    "No puedes comprar este producto",
            },
            footer: {
                join_our_discord: "Únete a nuestro Discord",
                copyright: "© 2026 {storeName}. Todos los derechos reservados.",
                tebex: {
                    description:
                        "Las compras y los pagos son gestionados por Tebex Limited, que también atiende las consultas y devoluciones relacionadas con los pedidos.",
                    impressum: "Impressum",
                    privacy_policy: "Política de privacidad",
                    tos: "Condiciones de servicio",
                },
            },
            messages: {
                success: {
                    added_to_cart: "{name} añadido a la cesta",
                    removed_from_cart: "{name} eliminado de la cesta",
                },
            },
            sidebar: {
                menu: "Menú",
            },
            titles: {
                login: "Acceder",
                package: "{name}",
            },
            checkout: {
                completed: {
                    title: "Gracias por tu compra",
                    subtitle:
                        "Recibirás tus productos en unos minutos",
                },
            },
            cart: {
                title: "Cesta",
                empty: "Tu cesta está vacía",
                total: "Total",
                item: {
                    quantity: "x{quantity}",
                    gift_to: "Regalo para {username}",
                },
            },
            category: {
                image_alt: "Imagen de la categoría {name}",
            },
        },
        "en-US": {
            store_name: "ZBrou Scripts",
            play: "ZBrou",
            index: {
                hero: {
                    title: "ZBrou Scripts",
                    subtitle: "FIVEM RESOURCES BY ZBROU",
                },
            },
            buttons: {
                checkout: "Proceed to Checkout",
                cart: "Cart | Cart ({n}) | Cart ({n})",
                add_to_cart: "Add to cart",
                add_gift_to_cart: "Add Gift to Cart",
                gift: "Gift",
                login: "Login",
                logout: "Log Out",
                copied: "Copied!",
                home: "Home",
                menu: "Menu",
                go_to_top: "Go to top",
            },
            auth: {
                login: {
                    title: "Please enter your {gameTypeName} username",
                },
                logout: {
                    title: "Are you sure you want to log out?",
                },
                login_redirect: {
                    title: "Click here to login",
                    method: "Login with {name}",
                },
                login_complete: {
                    title: "Logged in successfully",
                },
                username: "Username",
            },
            gift: {
                input_placeholder: "Recipient {gameTypeName} Username",
            },
            error: {
                page_not_found: "Page not found",
                cannot_add_package:
                    "You are not allowed to purchase this package",
            },
            footer: {
                join_our_discord: "Join our Discord",
                copyright: "© 2026 {storeName}. All rights reserved.",
                tebex: {
                    description:
                        "This website and its checkout process is operated by our online reseller & Merchant of Record, Tebex Limited, who also handles order-related inquiries and refunds.",
                    impressum: "Impressum",
                    privacy_policy: "Privacy Policy",
                    tos: "Terms of Service",
                },
            },
            messages: {
                success: {
                    added_to_cart: "{name} Added to cart",
                    removed_from_cart: "{name} Removed from cart",
                },
            },
            sidebar: {
                menu: "Menu",
            },
            titles: {
                login: "Login",
                package: "{name}",
            },
            checkout: {
                completed: {
                    title: "Thank you for your order",
                    subtitle:
                        "You should receive your items within a few minutes",
                },
            },
            cart: {
                title: "Cart",
                empty: "Your cart is empty",
                total: "Total",
                item: {
                    quantity: "x{quantity}",
                    gift_to: "Gift to {username}",
                },
            },
            category: {
                image_alt: "An image for the {name} category",
            },
        },
        "de-DE": {
            store_name: "ZBrou Scripts",
            play: "ZBrou",
            index: {
                hero: {
                    title: "ZBrou Scripts",
                    subtitle: "FIVEM RESOURCES BY ZBROU",
                },
            },
            buttons: {
                checkout: "Zur Kasse gehen",
                cart: "Warenkorb | Warenkorb ({n}) | Warenkorb ({n})",
                add_to_cart: "In den Warenkorb",
                add_gift_to_cart: "Geschenk in den Warenkorb",
                gift: "Geschenk",
                login: "Anmelden",
                logout: "Abmelden",
                copied: "Kopiert!",
                home: "Startseite",
                menu: "Menü",
                go_to_top: "Nach oben",
            },
            auth: {
                login: {
                    title: "Bitte gib deinen {gameTypeName} Benutzernamen ein",
                },
                logout: {
                    title: "Bist du sicher, dass du dich abmelden möchtest?",
                },
                login_redirect: {
                    title: "Hier klicken, um sich anzumelden",
                    method: "Anmelden mit {name}",
                },
                login_complete: {
                    title: "Erfolgreich angemeldet",
                },
                username: "Benutzername",
            },
            gift: {
                input_placeholder: "Benutzername des Empfängers {gameTypeName}",
            },
            error: {
                page_not_found: "Seite nicht gefunden",
                cannot_add_package:
                    "Du kannst dieses Paket nicht kaufen",
            },
            footer: {
                join_our_discord: "Tritt unserem Discord bei",
                copyright: "© 2026 {storeName}. Alle Rechte vorbehalten.",
                tebex: {
                    description:
                        "Diese Website und ihr Checkout-Prozess werden von unserem Online-Reseller & Händler, Tebex Limited, betrieben, der auch für bestellbezogene Anfragen und Rückerstattungen zuständig ist.",
                    impressum: "Impressum",
                    privacy_policy: "Datenschutzerklärung",
                    tos: "Nutzungsbedingungen",
                },
            },
            messages: {
                success: {
                    added_to_cart: "{name} in den Warenkorb gelegt",
                    removed_from_cart: "{name} aus dem Warenkorb entfernt",
                },
            },
            sidebar: {
                menu: "Menü",
            },
            titles: {
                login: "Anmelden",
                package: "{name}",
            },
            checkout: {
                completed: {
                    title: "Vielen Dank für deine Bestellung",
                    subtitle:
                        "Du solltest deine Artikel in wenigen Minuten erhalten",
                },
            },
            cart: {
                title: "Warenkorb",
                empty: "Dein Warenkorb ist leer",
                total: "Gesamt",
                item: {
                    quantity: "x{quantity}",
                    gift_to: "Geschenk an {username}",
                },
            },
            category: {
                image_alt: "Ein Bild für die Kategorie {name}",
            },
        }
    },
}));
