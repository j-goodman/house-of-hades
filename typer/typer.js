var canvas;
var ctx;

var colorInput;

var cursor;
cursor = {x: 20, y: 20};
var shift = false;

var fontcolor = '#fff';
var fontsize = 22;
var kerning = 1;
var line = 0;

var typebox;

window.addEventListener('load', () => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  colorInput = document.getElementById('color');
  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);
  typebox = new Typebox ('typebox');
});

var clearType = () => {
  if (line > 5) {
    line = 0;
    cursor = {x: 20, y: 20};
    shift = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

var Typebox = function (canvasID) {
    this.canvas = document.getElementById(canvasID);
    this.context = this.canvas.getContext('2d');
    this.contents = [];
    this.cursor = 0;
    this.fontsize = fontsize;
    this.top = 16;
};

Typebox.prototype.drawContents = function () {
    var i;
    var character;
    this.context.fillStyle = fontcolor;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.cursor = 0;
    for (i = 0; i < this.contents.length; i++) {
      character = characters[(shift ? '*' : '') + this.contents[i]] || false;
      this.context.fillRect(this.cursor, this.top, this.fontsize, this.fontsize);
      this.context.drawImage(character, this.cursor, this.top, this.fontsize, this.fontsize);
      this.cursor += this.fontsize;
    }
};

Typebox.prototype.type = function (key) {
    this.contents.push(key);
    this.drawContents();
};

Typebox.prototype.backspace = function () {
    console.log('backspace.');
};

Typebox.prototype.enter = function () {
    console.log('enter.');
};

var typeChar = (event, typing) => {
    var character;
    character = characters[(shift ? '*' : '') + event.keyCode] || false;
    ctx.fillStyle = fontcolor;
    if (character && !typing) {
        ctx.fillRect(cursor.x, cursor.y, fontsize, fontsize);
        ctx.drawImage(character, cursor.x, cursor.y, fontsize, fontsize);
        cursor.x += fontsize * kerning;
    } else if (event.keyCode === 16) { // SHIFT
        shift = true;
    } else if (event.keyCode === 8) { // BACKSPACE
        if (typing) {
          typebox.backspace();
        }
        cursor.x -= fontsize * kerning;
    } else if (event.keyCode === 13) { // ENTER
        if (typing) {
          typebox.enter();
        }
        cursor.x = fontsize * kerning;
        cursor.y += fontsize * kerning;
    }
    if (typing) {
      return event.keyCode;
    }
}

var keyDown = (event) => {
    var characterKey;
    characterKey = typeChar(event, true);
    typebox.type(characterKey);
}

var keyUp = (event) => {
    if (event.keyCode === 16) {
        shift = false;
    }
}

var loadImages = (callback) => {
    var codes;
    var i;
    var interval;
    var image;
    var images = [];

    keymapKeys = Object.keys(keymap);
    for (i=0 ; i<keymapKeys.length ; i++) {
        image = document.createElement('img');
        image.src = './typer/alphabet/' + keymap[keymapKeys[i]] + '.png';
        characters[eventmap[keymap[keymapKeys[i]]]] = image;
    }

    interval = setInterval(() => {
      if (images.length === images.filter((im) => { return im.complete }).length) {
        setTimeout(callback, 100);
        clearInterval(interval);
      }
    }, 30);
}

var carriageReturn = () => {
  typeChar({keyCode: 13});
  typeChar({keyCode: 13});
  line++;
}

var drawString = (string, rightHand=35) => {
    var i;
    var k = 0;
    var keyLookup;
    var typed = '';
    var wordLength;

    carriageReturn();

    keyLookup = Object.keys(eventmap);
    keyLookup.forEach((code) => {
      if (typeof code === 'string' && code[0] === '*') {
        code = parseInt(code.slice(1, code.length));
      }
    });

    for (i=0 ; i<string.length ; i++) {
        var key;

        key = keyLookup.filter((code) => {
          return code === string[i];
        })[0];

        if (!key) {
          key = irregulars[string[i]];
        };

        typed += string[i];

        typeChar({
          keyCode: eventmap[key]
        });
        k += 1;

        wordLength = string.slice(typed.length, string.length).split(' ')[0].length;

        if (k + wordLength > rightHand) {
          k = 0;
          carriageReturn();
        }
    }
}

var irregulars = {
  'A': 'A_cap',
  'B': 'B_cap',
  'C': 'C_cap',
  'D': 'D_cap',
  'E': 'E_cap',
  'F': 'F_cap',
  'G': 'G_cap',
  'H': 'H_cap',
  'I': 'I_cap',
  'J': 'J_cap',
  'K': 'K_cap',
  'L': 'L_cap',
  'M': 'M_cap',
  'N': 'N_cap',
  'O': 'O_cap',
  'P': 'P_cap',
  'Q': 'Q_cap',
  'R': 'R_cap',
  'S': 'S_cap',
  'T': 'T_cap',
  'U': 'U_cap',
  'V': 'V_cap',
  'W': 'W_cap',
  'X': 'X_cap',
  'Y': 'Y_cap',
  'Z': 'Z_cap',
  '!': 'exclamation_point',
  '(': 'open_parenthesis',
  ')': 'close_parenthesis',
  '*': 'asterisk',
  ',': 'comma',
  '-': 'hyphen',
  '.': 'period',
  ':': 'colon',
  '?': 'question_mark',
  '+': 'plus',
  '+': 'plus',
  '|': 'bar',
  '\'': 'apostrophe',
  // '"': 'open_quote',
  '"': 'close_quote',
  ' ': 'space',
}

var eventmap = {
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
    'exclamation_point': '*49',
    'open_parenthesis': '*57',
    'close_parenthesis': '*48',
    'asterisk': '*56',
    'comma': 188,
    'hyphen': 189,
    'period': 190,
    'colon': '*186',
    'question_mark': '*191',
    'plus': '*187',
    'bar': '*220',
    'apostrophe': 222,
    // 'open_quote': '*222',
    'close_quote': '*222',
    'space': 32,
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    'A_cap': '*65',
    'B_cap': '*66',
    'C_cap': '*67',
    'D_cap': '*68',
    'E_cap': '*69',
    'F_cap': '*70',
    'G_cap': '*71',
    'H_cap': '*72',
    'I_cap': '*73',
    'J_cap': '*74',
    'K_cap': '*75',
    'L_cap': '*76',
    'M_cap': '*77',
    'N_cap': '*78',
    'O_cap': '*79',
    'P_cap': '*80',
    'Q_cap': '*81',
    'R_cap': '*82',
    'S_cap': '*83',
    'T_cap': '*84',
    'U_cap': '*85',
    'V_cap': '*86',
    'W_cap': '*87',
    'X_cap': '*88',
    'Y_cap': '*89',
    'Z_cap': '*90',
}

var characters = {};

var keymap = {
    32: 'space',
    33: 'exclamation_point',
    40: 'open_parenthesis',
    41: 'close_parenthesis',
    42: 'asterisk',
    44: 'comma',
    45: 'hyphen',
    46: 'period',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    58: 'colon',
    63: 'question_mark',
    65: 'A_cap',
    66: 'B_cap',
    67: 'C_cap',
    68: 'D_cap',
    69: 'E_cap',
    70: 'F_cap',
    71: 'G_cap',
    72: 'H_cap',
    73: 'I_cap',
    74: 'J_cap',
    75: 'K_cap',
    76: 'L_cap',
    77: 'M_cap',
    78: 'N_cap',
    79: 'O_cap',
    80: 'P_cap',
    81: 'Q_cap',
    82: 'R_cap',
    83: 'S_cap',
    84: 'T_cap',
    85: 'U_cap',
    86: 'V_cap',
    87: 'W_cap',
    88: 'X_cap',
    89: 'Y_cap',
    90: 'Z_cap',
    97: 'a',
    98: 'b',
    99: 'c',
    100: 'd',
    101: 'e',
    102: 'f',
    103: 'g',
    104: 'h',
    105: 'i',
    106: 'j',
    107: 'k',
    108: 'l',
    109: 'm',
    110: 'n',
    111: 'o',
    112: 'p',
    113: 'q',
    114: 'r',
    115: 's',
    116: 't',
    117: 'u',
    118: 'v',
    119: 'w',
    120: 'x',
    121: 'y',
    122: 'z',
    124: 'bar',
    187: 'plus',
    8217: 'apostrophe',
    8220: 'open_quote',
    8221: 'close_quote',
}

var literalMap = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e',
  f: 'f',
  g: 'g',
  h: 'h',
  i: 'i',
  j: 'j',
  k: 'k',
  l: 'l',
  m: 'm',
  n: 'n',
  o: 'o',
  p: 'p',
  q: 'q',
  r: 'r',
  s: 's',
  t: 't',
  u: 'u',
  v: 'v',
  w: 'w',
  x: 'x',
  y: 'y',
  z: 'z',
  'exclamation_point': '!',
  'open_parenthesis': '(',
  'close_parenthesis': ')',
  'asterisk': '*',
  'comma': ',',
  'hyphen': '-',
  'period': '.',
  'colon': ':',
  'question_mark': '?',
  'plus': '+',
  'bar': '|',
  'apostrophe': '\'',
  // 'open_quote': '"',
  'close_quote': '"',
  'space': ' ',
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  'A_cap': 'A',
  'B_cap': 'B',
  'C_cap': 'C',
  'D_cap': 'D',
  'E_cap': 'E',
  'F_cap': 'F',
  'G_cap': 'G',
  'H_cap': 'H',
  'I_cap': 'I',
  'J_cap': 'J',
  'K_cap': 'K',
  'L_cap': 'L',
  'M_cap': 'M',
  'N_cap': 'N',
  'O_cap': 'O',
  'P_cap': 'P',
  'Q_cap': 'Q',
  'R_cap': 'R',
  'S_cap': 'S',
  'T_cap': 'T',
  'U_cap': 'U',
  'V_cap': 'V',
  'W_cap': 'W',
  'X_cap': 'X',
  'Y_cap': 'Y',
  'Z_cap': 'Z',
}
