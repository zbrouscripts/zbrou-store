# ZBrou Store

Tienda oficial de ZBrou Scripts, en español. Nuxt + Cloudflare Pages + Tebex Headless.

La única tienda pública es https://zbrou-store.pages.dev y se despliega desde main.

## Referencias de diseño

Se conserva la identidad de la preview aprobada zbrou-glass-scroll.html y la versión compacta zbrou-preview-para-otro-chat.zip: portada negra de pantalla completa, logo original, Oxanium/Manrope, estrellas y cometas, cabecera de cristal y catálogo azul oscuro.

Los ajustes posteriores del usuario también se respetan: sin círculos ni marcos alrededor del logo, PhraseKill como único producto, tarjeta pequeña, Añadir a la cesta encima de Ver detalles, ficha en un diálogo y reflejo al mover el cursor. /script/phrasekill conserva un enlace directo al mismo contenido.

El scroll controla la transición desde el logo hasta Scripts. La animación se puede pausar y respeta reducir movimiento. Búsqueda, diálogos y cesta conservan controles de teclado.

## Comercio y configuración

Los precios, la disponibilidad, el acceso FiveM y el checkout proceden de Tebex. Cuando el catálogo no devuelve el producto, la compra permanece desactivada. No se muestra un precio inventado.

Variables de Cloudflare:

- NITRO_PRESET=cloudflare_pages
- NUXT_PUBLIC_API_PUBLIC_KEY: token público de Tebex.
- NUXT_API_PRIVATE_KEY: secreto privado, solo si se necesita; nunca publicarlo.
- NUXT_PUBLIC_PHRASEKILL_VIDEO_ID: identificador de un vídeo real de PhraseKill. El antiguo vídeo provisional se retiró; no se presenta como demostración del producto.

/api/usage sigue disponible para la integración de estadísticas agregadas anterior. La home se centra en la tienda y no añade bloques vacíos de métricas.

## Verificación

npm ci y npm run build. Comprobar escritorio, móvil, desplazamiento, buscador, apertura/cierre del diálogo, navegación directa a la ficha, cesta y reducir movimiento. Después de publicar en main, verificar el check de Cloudflare Pages y la tienda principal.

Las fuentes originales incluyen su licencia en public/fonts/OFL.txt.