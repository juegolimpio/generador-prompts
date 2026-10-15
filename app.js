(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const FEEDBACK_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf3MonQK1hkRnv7XsqtGNOZFXBH2Px6HfpgR8BYQBTSDqd3mg/viewform'; // Enlace público de Google Forms para responder.
  const taskDefinitions = {
    email: {
      intro: 'Contanos qué querés comunicar. Con esos datos prepararemos una instrucción para redactar tu correo.',
      fields: [
        { key: 'goal', label: '¿Qué querés comunicar?', example: 'Ej.: pedir una reunión para conversar sobre un proyecto', type: 'textarea', required: true },
        { key: 'to', label: '¿A quién va dirigido?', example: 'Ej.: a la dirección de una institución' },
        { key: 'tone', label: '¿Qué tono preferís?', type: 'select', options: [['', 'Elegí o dejá que la IA decida'], ['formal', 'Formal'], ['cordial', 'Cordial'], ['cercano', 'Cercano'], ['firme y respetuoso', 'Firme y respetuoso']] },
        { key: 'details', label: '¿Hay algún dato que deba incluir?', type: 'textarea', example: 'Ej.: disponibilidad, fecha, motivo, información importante' }
      ]
    },
    image: {
      intro: 'Describí la imagen que imaginás. Podés agregar detalles para que el resultado se parezca más a tu idea.',
      fields: [
        { key: 'goal', label: '¿Qué querés mostrar en la imagen?', type: 'textarea', required: true, example: 'Ej.: una ciudad junto al mar al atardecer' },
        { key: 'style', label: '¿Qué estilo preferís?', type: 'select', options: [['','Elegí o dejá que la IA decida'],['fotografía realista','Fotografía realista'],['ilustración','Ilustración'],['minimalista','Minimalista'],['dibujo animado','Dibujo animado'],['infografía clara','Infografía clara']] },
        { key: 'use', label: '¿Dónde vas a utilizarla?', example: 'Ej.: portada, presentación, publicación de redes' },
        { key: 'details', label: '¿Qué detalles son importantes?', type: 'textarea', example: 'Ej.: colores, personas, ambiente, elementos que no deben aparecer' }
      ]
    },
    buy: {
      intro: 'Unas pocas respuestas permitirán pedir recomendaciones de compra más ajustadas a vos.',
      fields: [
        { key: 'goal', label: '¿Qué te gustaría comprar?', required: true, example: 'Ej.: una notebook para estudiar y trabajar' },
        { key: 'budget', label: '¿Cuál es tu presupuesto aproximado?', example: 'Ej.: hasta USD 700' },
        { key: 'location', label: '¿En qué país o tienda comprarías?', example: 'Ej.: Uruguay, Mercado Libre' },
        { key: 'details', label: '¿Para qué la usarías y qué te importa más?', type: 'textarea', example: 'Ej.: uso cotidiano, que dure años, liviana, buena batería' }
      ]
    },
    compare: {
      intro: 'Indicá las opciones que estás considerando y qué aspectos son más importantes para vos.',
      fields: [
        { key: 'goal', label: '¿Qué productos querés comparar?', required: true, type: 'textarea', example: 'Ej.: modelo A y modelo B, con marca y versión exacta si las sabés' },
        { key: 'details', label: '¿Para qué los vas a usar?', example: 'Ej.: trabajar muchas horas, viajar, entrenar' },
        { key: 'criteria', label: '¿Qué querés comparar especialmente?', example: 'Ej.: precio, batería, garantía, durabilidad' },
        { key: 'location', label: '¿Dónde comprarías? (País o tienda)', example: 'Ej.: Uruguay' }
      ]
    },
    evaluate: {
      intro: 'Podés preparar una prueba o actividad de evaluación. No es necesario escribir con lenguaje educativo técnico.',
      fields: [
        { key: 'goal', label: '¿Sobre qué tema querés evaluar?', required: true, type: 'textarea', example: 'Ej.: comprensión lectora, multiplicación, reglas del voleibol' },
        { key: 'audience', label: '¿Para quién es?', example: 'Ej.: estudiantes de 14 años, personas adultas en formación' },
        { key: 'format', label: '¿Qué tipo de evaluación te gustaría?', type: 'select', options: [['','Que la IA proponga'],['opción múltiple','Preguntas de opción múltiple'],['preguntas abiertas','Preguntas abiertas'],['actividad práctica','Actividad práctica'],['mixta','Combinada']] },
        { key: 'details', label: '¿Qué debería tener en cuenta?', type: 'textarea', example: 'Ej.: 10 preguntas, duración de 30 minutos, criterios de corrección' }
      ]
    },
    improve: {
      intro: 'Pegá el texto que ya escribiste. Prepararemos instrucciones para que una IA lo revise sin cambiar tu intención.',
      fields: [
        { key: 'goal', label: 'Pegá tu pedido actual', required: true, type: 'textarea', example: 'Ej.: quiero que me ayudes a organizar unas vacaciones...', help: 'Aunque esté incompleto o desordenado, sirve.' },
        { key: 'context', label: '¿Qué querías conseguir?', example: 'Ej.: organizar un viaje con presupuesto limitado' },
        { key: 'details', label: '¿Qué tendría que respetar?', type: 'textarea', example: 'Ej.: mantener mi estilo, no modificar los datos, mejorar la claridad' }
      ]
    },
    other: {
      intro: 'Empezá con tus palabras. La aplicación organizará tu idea para que la IA entienda mejor lo que necesitás.',
      fields: [
        { key: 'goal', label: '¿Qué querés lograr?', required: true, type: 'textarea', example: 'Ej.: organizar unas vacaciones, escribir un cuento, planear un proyecto...' },
        { key: 'context', label: '¿Qué información ayudaría a entender tu idea?', type: 'textarea', example: 'Ej.: dónde, para qué, con qué recursos o límites' },
        { key: 'audience', label: '¿Para quién sería el resultado?', example: 'Ej.: para mí, para un grupo de amigos, para clientes' },
        { key: 'format', label: '¿Cómo te gustaría recibir la respuesta?', type: 'select', options: [['','Que la IA elija lo más adecuado'],['pasos','Paso a paso'],['lista','Lista clara'],['tabla','Tabla comparativa'],['texto','Texto redactado'],['plan','Plan organizado']] }
      ]
    }
  };

  let activeTask = 'other';
  let generated = '';
  const form = $('generator-form');
  const fieldsHost = $('dynamic-fields');
  const empty = $('empty-result');
  const filled = $('filled-result');

  function detail(label, value) { return value ? `${label}: ${value.trim()}\n` : ''; }
  function getValue(name) { const element = form.elements.namedItem(name); return element ? String(element.value || '').trim() : ''; }
  function block(lines) { return lines.filter(Boolean).join(''); }
  function optionalBlock(lines) { const text = block(lines); return text ? `\nINFORMACIÓN ADICIONAL\n${text}` : ''; }
  function useGuidance() { return '\nSi te falta un dato imprescindible, hacé preguntas concretas antes de continuar. Si podés avanzar, hacelo sin inventar hechos, fuentes o información personal. Priorizá una respuesta clara y realmente útil.'; }

  function compose(task, data) {
    const g = data.goal;
    switch (task) {
      case 'email': return `REDACCIÓN DE CORREO\n\nRedactá un correo electrónico listo para enviar.\n\nOBJETIVO\n${g}\n${optionalBlock([detail('Destinatario', data.to),detail('Tono',data.tone),detail('Datos importantes',data.details)])}\nINSTRUCCIONES\n- Redactá un asunto breve y apropiado.\n- Escribí el cuerpo completo del correo, con apertura y cierre adecuados.\n- Mantené el sentido de lo que quiero comunicar.\n- No inventes nombres, fechas, cargos ni compromisos. Cuando falte algún dato concreto, dejá un marcador fácil de reemplazar.\n- Evitá explicaciones innecesarias; quiero un texto que pueda revisar y utilizar.${useGuidance()}`;
      case 'image': return `CREACIÓN DE IMAGEN\n\nCreá una imagen a partir de la siguiente descripción. Si no tenés capacidad de generar imágenes, indicámelo claramente en lugar de fingir que la generaste.\n\nESCENA PRINCIPAL\n${g}\n${optionalBlock([detail('Estilo visual',data.style),detail('Uso previsto',data.use),detail('Detalles y preferencias',data.details)])}\nCRITERIOS PARA LA IMAGEN\n- La composición debe comunicar claramente la idea principal.\n- Respetá el estilo y los detalles que indiqué.\n- Si hay texto dentro de la imagen, mantenelo mínimo, legible y correctamente escrito.\n- No agregues objetos, logotipos ni elementos que contradigan mis indicaciones.\n- Si falta algún detalle secundario, tomá una decisión visual coherente sin complicar el resultado.${useGuidance()}`;
      case 'buy': return `ASESORAMIENTO PARA ELEGIR UNA COMPRA\n\nAyudame a elegir una opción adecuada a mis necesidades y presupuesto. No te limites a recomendar lo más popular o lo más caro.\n\nPRODUCTO QUE BUSCO\n${g}\n${optionalBlock([detail('Presupuesto',data.budget),detail('País o tienda',data.location),detail('Usos y prioridades',data.details)])}\nQUÉ NECESITO\n1. Identificá las características que realmente importan para el uso indicado.\n2. Proponé algunas opciones apropiadas y explicá brevemente sus ventajas y desventajas.\n3. Compará precio, calidad, durabilidad y relación costo-beneficio según corresponda.\n4. Terminá con una recomendación clara, adaptada a mis necesidades, y explicá por qué.\n5. Si podés consultar Internet, verificá precios, disponibilidad y especificaciones actuales; indicá fuentes y fecha. Si no podés, aclará qué información necesita verificación.\nNo inventes precios, reseñas ni pruebas de producto.${useGuidance()}`;
      case 'compare': return `COMPARACIÓN DE PRODUCTOS\n\nCompará estas opciones y ayudame a decidir cuál se ajusta mejor a lo que necesito.\n\nPRODUCTOS\n${g}\n${optionalBlock([detail('Uso previsto',data.details),detail('Criterios importantes',data.criteria),detail('País o tienda',data.location)])}\nQUÉ NECESITO\n1. Identificá correctamente los modelos y versiones, sin mezclar características de productos distintos.\n2. Prepará una tabla comparativa con los criterios pertinentes.\n3. Explicá ventajas, limitaciones y diferencias que influyen en la decisión.\n4. Recomendá la mejor opción para mi caso y señalá cuándo convendría elegir la otra.\n5. Si tenés acceso a búsquedas, comprobá especificaciones, precios y disponibilidad, incluyendo fuentes y fecha; de lo contrario, identificá lo no verificado.\nNo inventes datos técnicos ni afirmes haber probado los productos.${useGuidance()}`;
      case 'evaluate': return `PREPARACIÓN DE UNA EVALUACIÓN\n\nDiseñá una evaluación clara, apropiada para sus destinatarios y lista para revisar antes de utilizar.\n\nTEMA O CONTENIDO\n${g}\n${optionalBlock([detail('Destinatarios',data.audience),detail('Tipo de evaluación',data.format),detail('Condiciones y criterios',data.details)])}\nQUÉ NECESITO\n- Definí qué aprendizajes o conocimientos se pretenden comprobar a partir de la información disponible.\n- Elaborá consignas comprensibles y acordes al nivel de las personas destinatarias.\n- Organizá la evaluación en un formato práctico, respetando la cantidad o duración que haya indicado.\n- Incluí respuestas esperadas o criterios de corrección en una sección separada.\n- Evitá preguntas ambiguas o respuestas incorrectas.\n- No atribuyas requisitos a un programa curricular específico si no fue proporcionado.${useGuidance()}`;
      case 'improve': return `MEJORA DE UNA INSTRUCCIÓN PARA IA\n\nActuá como especialista en redacción de instrucciones claras para modelos de inteligencia artificial. Tu tarea es mejorar el pedido que incluyo abajo, no realizar todavía su contenido.\n\nMI PEDIDO ORIGINAL\n${g}\n${optionalBlock([detail('Objetivo principal',data.context),detail('Condiciones que deben respetarse',data.details)])}\nPROCEDIMIENTO\n1. Identificá qué pretende lograr el pedido y qué información ya está clara.\n2. Detectá ambigüedades, redundancias y datos indispensables que faltan.\n3. Si necesitás aclaraciones importantes, haceme hasta cinco preguntas breves antes de cerrar la versión final. Si no, avanzá.\n4. Entregá una versión mejorada, completa y lista para copiar, respetando mi objetivo y mis restricciones.\n5. Explicá brevemente qué mejoraste. No agregues complejidad que no aporte utilidad.${useGuidance()}`;
      default: return `SOLICITUD PARA REALIZAR UNA TAREA\n\nNecesito que me ayudes con lo siguiente. Elegí el enfoque profesional o creativo que sea apropiado al tema y resolvé mi solicitud directamente. No me devuelvas simplemente otro prompt.\n\nMI IDEA\n${g}\n${optionalBlock([detail('Contexto relevante',data.context),detail('Público o destinatarios',data.audience),detail('Formato esperado',data.format)])}\nCÓMO QUIERO QUE TRABAJES\n- Comprendé mi objetivo y tené en cuenta el contexto y las preferencias indicadas.\n- Organizá la respuesta de forma útil y fácil de aplicar.\n- Ajustá el nivel de detalle a la complejidad real de la tarea, sin extenderte innecesariamente.\n- Respetá mis condiciones y distinguí datos, supuestos y propuestas.\n- Si el pedido requiere información actualizada, verificá con fuentes si tenés acceso; si no, señalá esa limitación.${useGuidance()}`;
    }
  }

  function invalidate() {
    generated = '';
    empty.hidden = false;
    filled.hidden = true;
    $('copy-message').textContent = '';
  }

  function buildField(spec) {
    const wrapper = document.createElement('div');
    wrapper.className = 'field';
    const label = document.createElement('label');
    label.htmlFor = `field-${spec.key}`;
    label.append(document.createTextNode(spec.label + ' '));
    const qualifier = document.createElement('span');
    qualifier.className = spec.required ? 'required' : 'optional';
    qualifier.textContent = spec.required ? '*' : '(opcional)';
    label.append(qualifier);
    wrapper.append(label);
    let input;
    if (spec.type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = 3;
    } else if (spec.type === 'select') {
      input = document.createElement('select');
      for (const [value, text] of spec.options) {
        const option = document.createElement('option');
        option.value = value; option.textContent = text;
        input.append(option);
      }
    } else {
      input = document.createElement('input');
      input.type = 'text';
    }
    input.id = `field-${spec.key}`;
    input.name = spec.key;
    input.required = Boolean(spec.required);
    input.autocomplete = 'off';
    if (spec.example) input.placeholder = spec.example;
    input.addEventListener('input', invalidate);
    input.addEventListener('change', invalidate);
    wrapper.append(input);
    if (spec.help) {
      const help = document.createElement('small'); help.className = 'field-help'; help.textContent = spec.help; wrapper.append(help);
    }
    return wrapper;
  }

  function selectTask(task, navigate = true) {
    if (!taskDefinitions[task]) return;
    activeTask = task;
    document.querySelectorAll('[data-task]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.task === task)));
    fieldsHost.replaceChildren(...taskDefinitions[task].fields.map(buildField));
    $('form-intro').textContent = taskDefinitions[task].intro;
    $('form-error').hidden = true;
    invalidate();
    if (navigate) {
      $('preparar').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  document.querySelectorAll('[data-task]').forEach(button => button.addEventListener('click', () => selectTask(button.dataset.task)));
  selectTask('other', false);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const first = form.elements.namedItem('goal');
    if (!first.value.trim()) {
      $('form-error').textContent = 'Contanos primero qué querés hacer. Con una frase alcanza para empezar.';
      $('form-error').hidden = false;
      first.focus();
      return;
    }
    $('form-error').hidden = true;
    const data = {};
    taskDefinitions[activeTask].fields.forEach(field => data[field.key] = getValue(field.key));
    generated = compose(activeTask, data);
    $('result-text').textContent = generated;
    const words = generated.trim().split(/\s+/).length;
    $('result-count').textContent = `${words} palabras`;
    empty.hidden = true;
    filled.hidden = false;
    $('copy-message').textContent = '';
    $('resultado').scrollIntoView({behavior:'smooth',block:'start'});
  });
  $('reset-btn').addEventListener('click', () => {
    selectTask(activeTask, false);
    form.elements.namedItem('goal').focus();
  });
  $('copy-btn').addEventListener('click', async () => {
    if (!generated) return;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(generated);
      $('copy-message').textContent = '¡Copiado! Ya podés pegarlo en tu IA preferida.';
    } catch (_) {
      const temp = document.createElement('textarea');
      temp.value = generated; temp.style.position = 'fixed'; temp.style.left = '-9999px';
      document.body.append(temp); temp.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch (_) { /* fallback */ }
      temp.remove();
      if (copied) {
        $('copy-message').textContent = '¡Copiado! Ya podés pegarlo en tu IA preferida.';
      } else {
        $('copy-message').textContent = 'No se pudo copiar automáticamente. Seleccioná el texto de arriba o usá «Guardar .txt».';
        $('result-text').focus();
      }
    }
  });
  $('download-btn').addEventListener('click', () => {
    if (!generated) return;
    const blob = new Blob([generated], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'mi-prompt.txt';
    document.body.append(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    $('copy-message').textContent = 'Se preparó el archivo de texto para guardar.';
  });

  // Compartir solo el enlace público de la app, nunca el contenido del formulario.
  const APP_SHARE_URL = 'https://juegolimpio.github.io/generador-prompts/';
  const shareButton = $('share-app-btn');
  const shareStatus = $('share-status');
  let shareNoticeTimer;
  function showShareNotice(message) {
    window.clearTimeout(shareNoticeTimer);
    shareStatus.textContent = message;
    shareNoticeTimer = window.setTimeout(() => { shareStatus.textContent = ''; }, 5000);
  }
  shareButton.addEventListener('click', async () => {
    // En móviles compatibles aparece la ventana nativa (WhatsApp, correo, etc.).
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'Generador de ideas para IA',
          text: 'Donde tus ideas toman forma. Gratis y sin registro.',
          url: APP_SHARE_URL
        });
        return;
      } catch (error) {
        if (error && error.name === 'AbortError') return; // El usuario cerró el menú.
      }
    }
    // Alternativa accesible cuando no hay menú nativo para compartir.
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard no disponible');
      await navigator.clipboard.writeText(APP_SHARE_URL);
      showShareNotice('¡Enlace copiado! Ya podés compartirlo.');
    } catch (_) {
      const input = document.createElement('textarea');
      input.value = APP_SHARE_URL;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.left = '-9999px';
      document.body.append(input);
      input.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch (_) { /* alternativa manual */ }
      input.remove();
      if (copied) showShareNotice('¡Enlace copiado! Ya podés compartirlo.');
      else window.prompt('Copiá el enlace de la aplicación:', APP_SHARE_URL);
    }
  });

  // Se muestra la invitación solo si configuramos una URL de Google Forms para responder.
  try {
    const feedbackUrl = new URL(FEEDBACK_FORM_URL);
    const isGoogleForm = feedbackUrl.protocol === 'https:' &&
      (feedbackUrl.hostname === 'forms.gle' ||
       (feedbackUrl.hostname === 'docs.google.com' && feedbackUrl.pathname.startsWith('/forms/')));
    const isEditLink = feedbackUrl.pathname.endsWith('/edit');
    if (isGoogleForm && !isEditLink) {
      $('feedback-action').href = feedbackUrl.href;
      $('opiniones').hidden = false;
    }
  } catch (_) { /* El formulario todavía no fue vinculado. */ }

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
})();
