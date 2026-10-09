# ZBrou Store

Tienda oficial ZBrou Scripts, en español. Nuxt + Cloudflare Pages + Tebex Headless.
La única tienda pública es https://zbrou-store.pages.dev, desplegada desde main.

## Diseño actual

Logo y portadas originales del ZIP, Oxanium/Manrope, cristal oscuro y acentos azul hielo.
Cabecera con navegación centrada, Discord, cesta y acceso FiveM. Fondo con auroras,
partículas y estelas; reflejos y profundidad en tarjetas, brillo en botones, paralaje
del logo y carrusel de actividad. La pausa controla todos los efectos sin colapsar la
página. Se respeta reducir movimiento salvo que el usuario active expresamente la
animación, y su elección se guarda.

Las portadas, nombres y enlaces de detalle abren la ficha en otra pestaña.
El carrito sobre la portada añade el paquete real a la cesta y solicita acceso FiveM
si es necesario. Los nuevos paquetes disponen automáticamente de /script/{id};
PhraseKill conserva /script/phrasekill y su presentación personalizada.
La ficha tiene su propia página. Los diálogos quedan para acceso y las operaciones
del checkout original. NuxtPage conserva las rutas anidadas de autenticación,
variables y regalos de Tebex.

## Catálogo y nuevos scripts

Los productos proceden del catálogo público de Tebex. Para añadir uno, crear un
paquete en Tebex con nombre, descripción, portada, precio y entrega, asignarlo a una
categoría visible y publicarlo. Su tarjeta, categoría, precio, compra y ficha aparecen
automáticamente en la tienda al recargar; no es necesario editar tarjetas en código.
La descripción se muestra como texto seguro. El checkout calcula el importe final.

Los productos, perfiles y cifras de demostración se han retirado del código.

El único producto real sigue siendo PhraseKill. Su precio, disponibilidad,
autenticación y checkout proceden de Tebex. Si Tebex no devuelve el paquete, se
muestra Próximamente y no se permite comprar. No se ha inventado un precio real.
El vídeo provisional se retiró y no se muestra ningún vídeo hasta tener el correcto.

## Configuración

- NITRO_PRESET=cloudflare_pages para compilar para Cloudflare.
- NUXT_PUBLIC_API_PUBLIC_KEY: token público de Tebex.
- NUXT_API_PRIVATE_KEY: secreto privado solo si la integración lo necesita.
- NUXT_PUBLIC_PHRASEKILL_VIDEO_ID: ID de un vídeo real de PhraseKill.
- NUXT_PUBLIC_DISCORD_URL: invitación opcional que sustituye la de app.config.ts.
- NUXT_ZBROU_USAGE_ENDPOINT y NUXT_ZBROU_USAGE_TOKEN: fuente privada HTTPS de
  métricas agregadas; devuelve serversActive, playersOnline, installations, updatedAt.
- NUXT_ZBROU_COMMUNITY_ENDPOINT y NUXT_ZBROU_COMMUNITY_TOKEN: fuente HTTPS de datos
  aprobados para publicación. Devuelve satisfaction (0–100) y purchases:
  [{name, product, avatar: URL HTTPS opcional, time: fecha ISO}].
  No conectar una respuesta privada de pagos sin filtrar ni publicar datos sin permiso.

Sin fuentes reales, /api/usage y /api/community devuelven datos vacíos y la tienda
no presenta ventas ni valoraciones inventadas. El feed real se actualiza cada minuto
mientras la pestaña está visible. Los tokens permanecen exclusivamente en el servidor.
El pie mantiene la identidad de Tebex, aviso legal, condiciones, privacidad, soporte
de pagos y Visa/Mastercard/PayPal con aviso de disponibilidad.

## Verificación

npm ci --ignore-scripts; npm run build con el preset apropiado.
Revisar 1920, 1280, 390 y 320 píxeles, centrado, desbordamientos, búsquedas,
filtros, ordenación, enlaces en otra pestaña, acceso FiveM, cesta y pausa/reanudación.
Antes de publicar en main, revisar el
estado remoto y, después, esperar la confirmación del despliegue de Cloudflare.

Las fuentes originales conservan su licencia en public/fonts/OFL.txt.

## Rendimiento de las animaciones

El fondo decorativo tiene un presupuesto de 30 dibujos por segundo para no
competir con el scroll y las animaciones de la interfaz. Su reloj conserva los intervalos fraccionarios de
las pantallas de 60–165 Hz. Su velocidad depende del tiempo real, sin reducir las
partículas, los brillos, las estelas ni los desenfoques. Los reflejos de las tarjetas
agrupan los movimientos del puntero una vez por fotograma; el flotado lateral usa
traslación en lugar de recalcular la distribución de la página. `npm run test:motion`
comprueba cadencia, velocidad, pausas y recuperación tras un bloqueo del navegador.

Las animaciones decorativas alejadas de la pantalla o en una pestaña oculta se
pausan y continúan desde el mismo punto al volver. El paralaje modifica solo su
capa visual, sin volver a renderizar el catálogo durante el scroll. Los WebP del
logo y la portada conservan los píxeles RGBA de los PNG originales. El favicon usa
su propia versión de 64 px. Las estadísticas se consultan en paralelo en el cliente.

Las auroras rasterizan su degradado y desenfoque de 85 px al cambiar de tamaño y
reutilizan la textura al animar su transformación y opacidad. Mantienen posición,
colores, halo y duraciones. El título conserva sus letras y degradado con un
presupuesto de 30 cambios de color por segundo, manteniendo su ciclo de 9 segundos.
Las auroras conservan el CSS original como respaldo cuando el navegador no
soporta la preparación de texturas. El canvas de estrellas ya no modifica atributos
del DOM en cada dibujo. La prueba local de renderizado y scroll está fuera del
código publicado; sus tiempos de callbacks no se presentan como FPS de pantalla.

Las tarjetas aplican la última posición del ratón en el siguiente fotograma,
sin encadenar transiciones de 250 ms. El reflejo conserva su radio y color,
pero mueve una capa con el degradado fijo en vez de repintarlo. Las coordenadas
se calculan al empezar a seguir el puntero y se ajustan al scroll; no se leen de
la tarjeta ya inclinada en cada movimiento. El retorno suave al salir se mantiene.
El paralaje del fondo conserva su recorrido y profundidad con una respuesta
del 90 % en unos 81 ms, independiente de la cadencia de dibujo.

El retorno de FiveM usa `auth_callback=1`, sin colisionar con el `success` de Tebex.
La identidad se confirma contra la cesta antes de limpiar el callback. `npm run
test:auth` comprueba los parámetros, la persistencia y la recuperación de errores.

