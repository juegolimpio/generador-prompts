# Generador de ideas para IA — piloto 0.3

**Estado:** prototipo funcional para revisión, **NO PUBLICADO**. Nombre y lema provisionales: «Donde tus ideas toman forma».

## Objetivo

Una persona sin conocimientos técnicos elige una tarea cotidiana, responde unas preguntas sencillas y obtiene una instrucción lista para copiar en ChatGPT, Gemini, Claude u otro modelo. También puede descargarla como `.txt`.

## Alcance de esta etapa

- Siete recorridos: correo, imagen, elegir una compra, comparar productos, preparar una evaluación, mejorar un pedido y otra idea.
- Campos contextuales. Solo el objetivo principal es obligatorio.
- Una salida completa adaptada a cada recorrido, sin pedirle a la IA que genere otro prompt (excepto «Mejorar lo que escribí», cuya finalidad es optimizar un pedido existente).
- Copiar / guardar, enlaces a modelos de IA (abren las páginas, sin enviarles texto automáticamente).
- Ayuda básica y pasos de instalación opcional en celular.
- Diseño adaptable, archivos estáticos, PWA/offline tras la primera carga desde HTTPS.
- Sin analíticas, usuarios, APIs, cookies, almacenamiento de textos o transmisión de los formularios a servidores propios. La app guarda archivos estáticos en caché para funcionamiento offline, pero no guarda los formularios.

## Probarla localmente

Para revisar el diseño en una computadora, abrir `index.html`. Para probar instalación, portapapeles y funcionamiento offline, usar HTTPS o un servidor localhost. Por ejemplo, desde esta carpeta:

```sh
python -m http.server 8000
```

Luego visitar `http://localhost:8000`.

## Publicación futura (solo con aprobación)

1. Crear un **repositorio nuevo**, por ejemplo `juegolimpio/generador-prompts`, sin modificar `juegolimpio/educacionfisica`.
2. Publicar los archivos de esta carpeta en la raíz del nuevo repositorio.
3. Activar GitHub Pages en la rama elegida y directorio raíz.
4. Comprobar HTTPS, instalación Android, copia, descarga y modo offline desde el enlace público.

La URL sería aproximadamente `https://juegolimpio.github.io/generador-prompts/`, si se mantiene ese nombre de repositorio.

## Pendiente antes de compartir ampliamente

- Contrastar las plantillas y criterios de calidad con el texto íntegro de los cuatro prompts originales; no se recuperó aún el archivo RTF original.
- Validar el contenido generado para cada caso con personas reales y ajustar las preguntas según dificultades.
- Elegir marca y nombre definitivo.
- Crear un formulario real de Google Forms y establecer su URL en la constante `FEEDBACK_FORM_URL` del archivo `app.js`. Mientras esté vacía, no aparece un enlace a feedback (para evitar un botón que no funciona). Configurar el formulario para aceptar respuestas sin exigir registro/correo, y explicar claramente el procesamiento voluntario por Google.
- Completar las comprobaciones de accesibilidad y navegadores móviles sobre dispositivos reales.

## Seguridad y privacidad

No introducir contraseñas, números de documento ni información personal innecesaria. Si alguien pega el resultado en un modelo de IA externo, se aplican las políticas de ese servicio. La app no ofrece diagnósticos ni verifica en tiempo real precios, productos, información curricular o respuestas de modelos: construye **instrucciones** para que esos modelos ejecuten esas tareas.

## Criterio de versiones

Conservar los pilotos 0.1 y 0.2 como respaldo; 0.3 modifica principalmente la experiencia pública (categorías en lenguaje corriente), mantiene el procesamiento local y agrega las rutas por tarea.
