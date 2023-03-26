'use strict';

// General DOM
const rows = document.querySelector('.rows');
const quoteEl = document.querySelector('.quote');
const author = document.querySelector('.author');
const toWrite = document.querySelector('.container-to-write');
const settings = document.querySelector('.container-settings');
let lettersEl = [];
const cursor = document.createElement('span');

// Buttons DOM
const btnStart = document.querySelector('.start');
const btnSettings = document.querySelector('.settings');
const btnReset = document.querySelector('.reset');
const btnHome = document.querySelector('.home');

// Txt
const txtSettings = document.querySelector('.txt-settings');
const txtStart = document.querySelector('.txt-start');
const txtReset = document.querySelector('.txt-reset');
const txtHome = document.querySelector('.txt-home');
const txtTitleSettings = document.querySelector('.txt-title-settings');
const txtColor = document.querySelector('.txt-color');
const txtLanguage = document.querySelector('.txt-language');
const txtKeyboard = document.querySelector('.txt-keyboard');
const txtOptEnglish = document.querySelector('.txt-opt-english');
const txtOptSpanish = document.querySelector('.txt-opt-spanish');


// Inputs DOM
const languageOption = document.querySelector('.language');

// Variables
const excludes = ['CapsLock', 'Enter', 'Tab', 'Escape', 'Control', 'Meta', 'Shift'];
let isStart = false;
let isAccentMark = false;
let letters = [];
let typed = [];
let language = 'english';

const languages = {
  english: {
    initial: 'A good day to learn...(Ctrl + Enter)',
    settings: 'Settings',
    start: 'Start',
    reset: 'Reset',
    home: 'Home',
    language: 'Language',
    color: 'Color',
    keyboard: 'Keyboard',
    english: 'English',
    spanish: 'Spanish',
    quotes: [ { author: 'Harper Lee', text: 'You never really understand a person until you consider things from his point of view... Until you climb inside of his skin and walk around in it.' }, { author: 'J.K. Rowling', text: 'It is our choices, Harry, that show what we truly are, far more than our abilities.' }, { author: 'F. Scott Fitzgerald', text: 'So we beat on, boats against the current, borne back ceaselessly into the past.' }, { author: 'Maya Angelou', text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel." }, { author: 'Albert Einstein', text: 'Try not to become a man of success. Rather become a man of value.' }, { author: 'William Shakespeare', text: "All the world's a stage, and all the men and women merely players: they have their exits and their entrances; and one man in his time plays many parts, his acts being seven ages." }, { author: 'Oscar Wilde', text: 'To live is the rarest thing in the world. Most people exist, that is all.' }, { author: 'Jorge Luis Borges', text: "Truth is a dream that comes undone, or a dream that's fulfilled."}, { author: 'Gabriel García Márquez', text: "Love is the only thing that grows when it's divided." }, { author: 'Pablo Neruda', text: 'Love is an iridescent rainbow between two hearts.' }],
    words: [ 'chair', 'table', 'computer', 'window', 'door', 'house', 'dog', 'cat', 'mouse', 'bird', 'book', 'pen', 'notebook', 'pencil', 'telephone', 'television', 'fridge', 'oven', 'microwave', 'plate', 'fork', 'knife', 'pan', 'glass', 'bottle', 'cup', 'beach chair', 'umbrella', 'towel', 'bag', 'coin', 'bill', 'folder', 'pencil', 'eraser', 'ruler', 'calculator', 'marker', 'glue', 'stickers', 'paint', 'brush', 'colored pencil', 'bookmark', 'notebook', 'ballpoint', 'pen', 'feather', 'pens', 'stamp', 'envelope', 'mail', 'postage', 'stamp', 'paper', 'paper', 'scissors', 'clip', 'stapler', 'tape', 'metal', 'tape', 'drawer', 'desk', 'office', 'chair', 'file', 'cabinet', 'closet', 'bookshelf', 'printer', 'scanner', 'projector', 'screen', 'speaker', 'headphones', 'optical', 'mouse', 'keyboard', 'cell', 'phone', 'tablet', 'laptop', 'digital', 'camera', 'music', 'player', 'television', 'decoder', 'gaming', 'console', 'game', 'remote', 'control', 'battery', 'charger', 'adapter', 'outlet', 'cable', 'switch', 'light', 'fan', 'heater', 'air', 'conditioner', 'thermometer', 'humidifier', 'vacuum', 'cleaner', 'iron', 'dryer', 'washing', 'machine', 'sink',],
  },
  spanish: {
    initial: 'Un buen día para aprender...(Ctrl + Enter)',
    settings: 'Ajustes',
    start: 'Iniciar',
    reset: 'Reiniciar',
    home: 'Inicio',
    language: 'Lenguaje',
    color: 'Color',
    keyboard: 'Teclado',
    english: 'Inglés',
    spanish: 'Español',
    quotes: [ { author: 'Harper Lee', text: 'Nunca entenderás realmente a una persona hasta que consideres las cosas desde su punto de vista... Hasta que te metas en su piel y camines por ella.' }, { author: 'J.K. Rowling', text: 'Son nuestras elecciones, Harry, las que muestran lo que realmente somos, mucho más que nuestras habilidades.' }, { author: 'F. Scott Fitzgerald', text: 'Así que seguimos adelante, barcos contra la corriente, arrastrados sin cesar hacia el pasado.' }, { author: 'Maya Angelou', text: 'He aprendido que la gente olvidará lo que dijiste, la gente olvidará lo que hiciste, pero la gente nunca olvidará cómo los hiciste sentir.' }, { author: 'Albert Einstein', text: 'Trata de no convertirte en un hombre de éxito, sino en un hombre de valores.' }, { author: 'William Shakespeare', text: 'Todo el mundo es un escenario, y todos los hombres y mujeres meros actores: tienen sus entradas y sus salidas; y un hombre en su tiempo juega muchos papeles, sus actos siendo siete edades.' }, { author: 'Oscar Wilde', text: 'Vivir es la cosa más rara del mundo. La mayoría de la gente simplemente existe, eso es todo.' }, { author: 'Jorge Luis Borges', text: 'La verdad es un sueño que se cumple, o un sueño que se desvanece.' }, { author: 'Gabriel García Márquez', text: 'El amor es lo único que crece cuanto más se reparte.' }, { author: 'Pablo Neruda', text: 'El amor es un arco iris entre dos corazones.' }, ],
    words: [ 'silla', 'mesa', 'ordenador', 'ventana', 'puerta', 'casa', 'perro', 'gato', 'ratón', 'pájaro', 'libro', 'lapicero', 'cuaderno', 'bolígrafo', 'telefono', 'television', 'nevera', 'horno', 'microondas', 'plato', 'tenedor', 'cuchillo', 'sarten', 'vaso', 'botella', 'copa', 'silla', 'playa', 'sombrilla', 'toalla', 'bolsa', 'moneda', 'billete', 'carpeta', 'lapiz', 'goma', 'borrar', 'regla', 'calculadora', 'marcador', 'pegamento', 'pegatinas', 'pintura', 'pincel', 'lápiz', 'colores', 'marcapáginas', 'libreta', 'boligrafo', 'plumas', 'sello', 'sobre', 'correo', 'estampilla', 'papel', 'tijeras', 'papel', 'clip', 'grapadora', 'cinta', 'adhesiva', 'cinta', 'metálica', 'cajón', 'escritorio', 'silla', 'escritorio', 'archivador', 'armario', 'estantería', 'impresora', 'escaner', 'proyector', 'pantalla', 'altavoz', 'auriculares', 'ratón', 'óptico', 'teclado', 'teléfono', 'móvil', 'tablet', 'ordenador', 'portátil', 'cámara', 'digital', 'reproductor', 'música', 'televisión', 'decodificador', 'consola', 'juegos', 'juego', 'mando', 'distancia', 'pila', 'cargador', 'adaptador', 'enchufe', 'cable', 'interruptor', 'luz', 'ventilador', 'calefacción', 'aire', 'acondicionado', 'termómetro', 'humidificador', 'aspiradora', 'plancha', 'secadora', 'lavadora', 'regadero'],
  }
}

// Vocals with accent
const tildedVowels = [
  { id: 'a', letter: 'á' },
  { id: 'e', letter: 'é' },
  { id: 'i', letter: 'í' },
  { id: 'o', letter: 'ó' },
  { id: 'u', letter: 'ú' },
  { id: 'á', letter: 'á' },
  { id: 'é', letter: 'é' },
  { id: 'í', letter: 'í' },
  { id: 'ó', letter: 'ó' },
  { id: 'ú', letter: 'ú' },
];

// Functions

// Language
const loadLanguage = (language) => {
  txtSettings.textContent = languages[language].settings;
  txtStart.textContent = languages[language].start;
  txtReset.textContent = languages[language].reset;
  txtHome.textContent = languages[language].home;
  txtTitleSettings.textContent = languages[language].settings;
  txtColor.textContent = languages[language].color;
  txtLanguage.textContent = languages[language].language;
  txtKeyboard.textContent = languages[language].keyboard;
  txtOptEnglish.textContent = languages[language].english;
  txtOptSpanish.textContent = languages[language].spanish;
  quoteEl.textContent = languages[language].initial;
}

// Init
const init = function() {
  loadLanguage(language);
  // DOM
  toWrite.classList.remove('hidden');
  settings.classList.add('hidden');
  btnStart.classList.remove('hidden'); 
  btnSettings.classList.remove('hidden'); 
  btnReset.classList.add('hidden'); 
  btnHome.classList.add('hidden'); 
  author.classList.add('hidden'); 
  quoteEl.style.textAlign = 'center';
  isStart = false;
  cursor.textContent = '|';
  cursor.classList.add('cursor');
};
init();

// Settings
const showSettingsSection = () => {
  toWrite.classList.add('hidden');
  settings.classList.remove('hidden');
  btnHome.classList.remove('hidden');
  btnSettings.classList.add('hidden');
}

// Accent mark
const accentMark = key => tildedVowels.find(e => e.id === key).letter;

// Display quote 
const displayText = function(arg) { 
  if(typeof(arg) === 'object'){
    author.textContent = `- ${arg.author}`;
    letters = [...arg.text];
  } else {
    letters = [...arg];
  } 
  for(let i = 0; i < letters.length; i++) {
    const span = document.createElement('span');
    span.textContent = letters[i];
    span.classList.add('letter');
    quoteEl.append(span);
  }
};

// Start type
const startType = function() {
  // DOM
  toWrite.classList.remove('hidden');
  settings.classList.add('hidden');
  quoteEl.textContent = '';
  quoteEl.style.textAlign = 'left';
  btnStart.classList.add('hidden');
  btnSettings.classList.add('hidden');
  btnReset.classList.remove('hidden'); 
  btnHome.classList.remove('hidden'); 
  author.classList.remove('hidden'); 

  // Display quote 
  const quotes = languages[language].quotes;
  const num = Math.trunc(Math.random() * quotes.length);
  displayText(quotes[num]); 
  lettersEl = document.querySelectorAll('.letter');
  lettersEl[0].append(cursor);

  // Variables
  isStart = true;
  typed = [];
};

// Validate typed
const validateTyped = function(key) {
  let pos = typed.length;
  if(key === 'Backspace') {
    // Remove key
    if (pos !== 0) {
      typed.pop(key);
      pos -= 2;
      lettersEl[pos + 1].classList.remove('true', 'false');
    } else {
      pos -= 1;
    }
  } else {
      // Add class true or false
      typed.push(key);
      lettersEl[pos].classList.add(typed[pos] === letters[pos] ? 'true' : 'false');
      // Is the last letter?
      if (typed.length === letters.length) {
        // isStart = false;
        startType();
        return;
      }
    }
  
  // Add cursor the next letter 
  lettersEl[pos + 1].append(cursor);
};

// Reading keys
document.addEventListener('keydown', (e) => {
  let key = e.key;
  if (isStart && !excludes.includes(key)) {
    if (key === 'Dead') {
      isAccentMark = true;
    } else if (isAccentMark) {
      if (key === 'Backspace') isAccentMark = false;
      else {
        isAccentMark = false;
        key = accentMark(key);
        validateTyped(key);
      }
    } else {
      e.preventDefault(); 
      validateTyped(key);
    }
  }
});

// Btn start
btnStart.addEventListener('click', () => {
  startType();
});

// Btn reset
btnReset.addEventListener('click', () => {
  startType();
});

// Btn home
btnHome.addEventListener('click', () => {
  init();
});

// Btn settings
btnSettings.addEventListener('click', () => {
  showSettingsSection();
});

// Shortcut's
document.addEventListener('keydown', (e) => {
  const {key, ctrlKey} = e;
  if (ctrlKey && key === 'Enter') {
    startType();
  } else if (!isStart && ctrlKey && key === 's') {
    e.preventDefault();
    showSettingsSection();
  } else if (isStart && key === 'Tab') {
    e.preventDefault();
    btnReset.focus();
  } else if (ctrlKey && key === 'h') {
    e.preventDefault();
    init();
  }
});

// Language update
languageOption.addEventListener('click', () => {
  language = languageOption.value;
  loadLanguage(language);
});
