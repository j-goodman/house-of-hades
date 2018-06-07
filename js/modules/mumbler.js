String.prototype.code = function () {
	return this.charCodeAt('0');
}

String.prototype.map = function (funct, index) {
  var i;
  for (i=0; i<this.length ; i++) {
    funct(this[i], i);
  }
}

var Cell = function () {
	this.letters = {};
}

var Letter = function (char, weight) {
	this.char = char;
	this.weight = weight;
}

var CharMemory = function (char, magnitude) {
  this.char = char;
  this.next = [];
  var i;
  for (i=0; i<magnitude; i++) {
    this.next.push(new Cell ());
  }
}

var Talker = function (magnitude) {
  this.magnitude = magnitude;
  this.memory = {};
};

Talker.prototype.read = function (string) {
  string.map((char, index) => {
    var charMemory;
    var i;
    if (this.memory[char.code()]) {
      charMemory = this.memory[char.code()];
    } else {
      charMemory = new CharMemory (char.code(), this.magnitude);
      this.memory[char.code()] = charMemory;
    }
    for (i=1 ; i<this.magnitude ; i++) {
      if (string[i + index]) {
        if (charMemory.next[i].letters[string[i + index].code()]) {
          charMemory.next[i].letters[string[i + index].code()] += Math.pow(this.magnitude - i, 4);
        } else {
          charMemory.next[i].letters[string[i + index].code()] = Math.pow(this.magnitude - i, 4);
        }
      }
    }
  });
};

Talker.prototype.write = function (base) {
  var sentence = [];
  var string = '';
  base.map(() => {
		console.log('*1')
    sentence.push(new Cell ());
  });
  string = base[0];

  sentence.map((cell, index) => {
		console.log('*2')
		if (!string[index]) {
				return ''
		}
		if (!this.memory[string[index].code()]) {
				return undefined
		}
    this.memory[string[index].code()].next.map((nextCell, nextIndex) => {
			console.log('*3')
      if (index + nextIndex < sentence.length) {
        sentence[index + nextIndex].letters = Object.assign(sentence[index + nextIndex].letters, nextCell.letters);
      }
    });
		console.log('*4')
    if (string.length < sentence.length) {
			console.log('*4.1')
			Math.floor(Math.random() * 1.5) ?
			string += String.fromCharCode(this.chooseCharDeterm(sentence[string.length])):
      string += String.fromCharCode(this.chooseCharRand(sentence[string.length]));
    }
  });
	console.log('*1')
  return string;
}

Talker.prototype.chooseCharRand = function (cell) {
  var allChoices;
  var choiceList = {};
  var choiceInd;
  var total = 0;
	console.log('*7.1')
  allChoices = Object.keys(cell.letters);
  allChoices.map((letter) => {
		console.log('*7.1')
    choiceList[total] = letter;
    total += cell.letters[letter];
  });
  choiceInd = Math.floor(Math.random() * total);
  while (!choiceList[choiceInd]) {
    choiceInd -= 1;
  }
  return choiceList[choiceInd];
}

Talker.prototype.chooseCharDeterm = function (cell) {
  var allChoices;
  var choiceWeight = 0;
  var validChoices;
	console.log('*6')
  allChoices = Object.keys(cell.letters);
  allChoices.map((letter) => {
		console.log('*6.1')
    if (cell.letters[letter] > choiceWeight) {
      validChoices = [letter]; choiceWeight = cell.letters[letter];
    } else if (cell.letters[letter] === choiceWeight) {
      validChoices.push(letter);
    }
  });
	if (validChoices) {
		return(validChoices[Math.floor(Math.random() * validChoices.length)]);
	}
}

var doorMumbler = new Talker (2);
var nameMumbler = new Talker (2);
laterDoorColors.map((list) => {
  list.map((item) => {
    doorMumbler.read(item);
  });
});
doorColors.map((item) => {
  doorMumbler.read(item);
})

nameMumbler.names = ['Arturo', 'Malinche', 'Joseph', 'Annabel', 'Epimetheus']
nameMumbler.names.map((item) => {
  nameMumbler.read(item)
})


doorMumbler.mumbleDoor = () => {
  return doorMumbler.write(pick(doorColors));
}

nameMumbler.mumble = () => {
  return nameMumbler.write(pick(nameMumbler.names));
}
