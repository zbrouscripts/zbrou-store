# ZBrou Store

Tienda independiente de **ZBrou Scripts** para FiveM. Nuxt 3 + Cloudflare Pages + Tebex Headless.

## Diseño actual

- Portada compacta en español, inspirada en la maqueta `zbrou-preview-para-otro-chat.zip`.
- Logotipo original ZBrou y portada original del producto PhraseKill.
- Inicio, catálogo de scripts y un bloque discreto de servidores.
- Una tarjeta de PhraseKill en el catálogo, con ficha propia en `/script/phrasekill`.
- Carrito y autentificación de Tebex conservados desde la plantilla.
- Los precios proceden exclusivamente del catálogo de Tebex. Si el producto no está publicado, no se puede comprar.
- Animación ligera del inicio asociada al desplazamiento, con soporte de movimiento reducido.

## Publicación

Cloudflare Pages: proyecto `zbrou-store`; rama pública `main`; rama de pruebas `design/phrasekill-showcase`.

Variables de compilación:
- `NITRO_PRESET=cloudflare_pages`
- `NUXT_PUBLIC_API_PUBLIC_KEY=` token público de Tebex

La clave privada de Tebex se guarda **solo como Secret** en Cloudflare si es necesaria (`NUXT_API_PRIVATE_KEY`). Nunca publicarla ni compartirla en GitHub.

## Estadísticas

`/api/usage` no devuelve cifras inventadas. Hasta configurar un proveedor agregado real, muestra valores no disponibles. Para conectarlo sin datos personales ni nombres de servidores, utilizar `NUXT_ZBROU_USAGE_ENDPOINT` y el secreto opcional `NUXT_ZBROU_USAGE_TOKEN`.

## Comprobaciones

`npm ci`, `npm run build`. GitHub Actions comprueba compilación y, si el entorno permite levantar Nuxt, ejecuta `scripts/visual-smoke.mjs` en Chrome para comprobar portada, catálogo, ficha, menú móvil y desbordamientos.

**No fusionar la rama hasta validar la vista previa de Cloudflare y las operaciones reales de compra con Tebex.**
