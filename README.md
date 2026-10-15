# Generador de ideas para IA — piloto 0.5

**Estado:** aplicación publicada mediante GitHub Pages; versión 0.5 con mejoras en la guía visual y acceso voluntario a opiniones. Nombre y lema provisionales: «Donde tus ideas toman forma».

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

## Publicación y actualización

1. Conservar una copia de la versión estable anterior.
2. Subir los archivos modificados (`index.html`, `styles.css`, `app.js`, `sw.js` y este README) al repositorio `juegolimpio/generador-prompts` tras revisión.
3. Comprobar la guía, la invitación a opinar, la PWA y la generación en celulares después de cada despliegue.

Sitio: `https://juegolimpio.github.io/generador-prompts/`. GitHub Pages publica desde `main`.

## Pendiente antes de compartir ampliamente

- Contrastar las plantillas y criterios de calidad con el texto íntegro de los cuatro prompts originales; no se recuperó aún el archivo RTF original.
- Validar el contenido generado para cada caso con personas reales y ajustar las preguntas según dificultades.
- Elegir marca y nombre definitivo.
- **Hecho:** se incorporó la URL pública de Google Forms en `FEEDBACK_FORM_URL`, y se comprobó que funciona en una ventana privada (verificación realizada por el responsable del proyecto).
- Completar las comprobaciones de accesibilidad y navegadores móviles sobre dispositivos reales.

## Seguridad y privacidad

No introducir contraseñas, números de documento ni información personal innecesaria. Si alguien pega el resultado en un modelo de IA externo, se aplican las políticas de ese servicio. La app no ofrece diagnósticos ni verifica en tiempo real precios, productos, información curricular o respuestas de modelos: construye **instrucciones** para que esos modelos ejecuten esas tareas.

## Criterio de versiones

Conservar los pilotos 0.1 y 0.2 como respaldo; 0.3 modifica principalmente la experiencia pública (categorías en lenguaje corriente), mantiene el procesamiento local y agrega las rutas por tarea.

## Cambios de 0.4

- Guía de instalación con pasos visuales independientes para Chrome/Android y Safari/iPhone.
- Una sección discreta para opiniones, que se activa únicamente con un enlace real de Google Forms.
- La app sigue sin enviar automáticamente textos del generador a terceros.
- El archivo `crear_formulario_feedback.gs`, entregado **por separado**, es solo para ejecutar una vez desde Google Apps Script; **no se sube al repositorio público**.

## Enlace público de opiniones conectado en 0.4

https://docs.google.com/forms/d/e/1FAIpQLSf3MonQK1hkRnv7XsqtGNOZFXBH2Px6HfpgR8BYQBTSDqd3mg/viewform

El formulario externo es voluntario: la aplicación no envía contenidos de los prompts a Google Forms.

## Novedad 0.5: Compartir la aplicación

Botón «Compartir» en el encabezado. En navegadores compatibles utiliza la interfaz nativa para compartir; en otros, copia el enlace público. Nunca comparte los textos introducidos ni el prompt generado. Se actualizó la versión de caché para distribuir el cambio a quienes la tienen instalada.
