// https://nuxt.com/docs/guide/directory-structure/app-config
// See index.d.ts for the full list of available options
export default defineAppConfig({
    // Shows in the <title> tag before the name of the page
    titlePrefix: "ZBrou Scripts",
    // The name of your store
    storeName: "ZBrou Scripts",
    // Require the user to login before they add items?
    auth: true,
    // Use external auth methods, e.g. CFX, Steam (Set to false for minecraft stores)
    authExternal: true,
    // The unique ID of the store
    storeId: 0,
    // A link to your main site (optional)
    mainSiteUrl: "https://zbrou-store.pages.dev",
    // A discord invite url (optional)
    discordUrl: "https://discord.gg/2u3YXjpf3N",
    // A IP of your server which to display (optional)
    serverIp: "",
    // Reveal the sidebar when an item is added to the cart?
    showCartOnAdd: true,
    // Show confetti after checkout?
    confetti: true,
    // Game type name to display on the store
    gameTypeName: "FiveM",
    // Tebex.js settings see https://docs.tebex.io/developers/tebex.js/integration#config
    tebexJsConfig: {
        theme: "dark",
        colors: [
            {
                name: "primary",
                color: "#0E58D8",
            },
            {
                name: "secondary",
                color: "#DDE8FF",
            },
        ],
    },
});
