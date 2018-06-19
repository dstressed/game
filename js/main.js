class Game {

    constructor() {}

    begin() {
        game.menu = new Menu().add().addListeners();
        return this;
    }

    end() {

    }
}

class Menu {

    constructor() {
        this._div = document.createElement('div');
    }

    add() {
        this._div.className = 'game-menu';
        this._div.innerHTML = '<div class="menu-image"></div><h1>Start</h1><h1>Options</h1><h1>Exit</h1>';
        game.game._div.appendChild(this._div);
        return this;
    }

    addListeners() {
        this._div.addEventListener('click', this._splitter);
        return this;
    }

    _splitter(event) {
        switch (event.target.innerHTML) {
            case 'Start':
                game.prologue = new Prologue().removeMenu().add().addContinue();
                break;
            case 'Options':
                if (!game.options) {
                    game.options = new Options().add().addListeners();
                } else {
                    game.options._div.classList.remove('-hidden');
                }
                break;
            case 'Exit':
                if (!game.exit) {
                    game.exit = new Exit().add().addListeners();
                } else {
                    game.exit._div.classList.remove('-hidden');
                }
        }
    }
}

class Options {

    constructor() {
        this._div = document.createElement('div');
    }

    add() {
        this._div.className = 'game-options';
        this._div.innerHTML = '<div class="options-window"><h1>OPTIONS</h1><div class="options-sound"><p>Sound</p><span class="checkbox -checked"></span></div><span class="button-back">BACK</span></div>';
        document.body.appendChild(this._div);
        return this;
    }

    addListeners() {
        this._div.querySelector('.checkbox').addEventListener('click', this._toggleSound);
        this._div.querySelector('.button-back').addEventListener('click', this._hideOptions);
        return this;
    }

    _toggleSound(event) {
        event.target.classList.toggle('-checked');
        game.sound = !game.sound;
    }

    _hideOptions(event) {
        game.options._div.classList.add('-hidden');
    }
}

class Exit {

    constructor() {
        this._div = document.createElement('div');
    }

    add() {
        this._div.className = 'game-exit';
        this._div.innerHTML = '<div class="exit-window"><p>ARE YOU SURE YOU WANT TO QUIT?</p><div class="exit-buttons"><span>YES</span><span>NO</span></div></div>';
        document.body.appendChild(this._div);
        return this;
    }

    addListeners() {
        this._div.addEventListener('click', this._splitter);
        return this;
    }

    _splitter(event) {
        switch (event.target.innerHTML) {
            case 'YES':
                window.close();
                break;
            case 'NO':
                game.exit._div.classList.add('-hidden');
        }
    }
}

class Prologue {

    constructor(i = 0) {
        this._div = document.createElement('div');
        this._i = i;
        this._cues = [
            'This is the story about shapes and their kingdom where they lived happily until the day a new ruler came to power.',
            'They called themselves the Perfect Trinity and declared war to all the shapes that bore any difference from themselves.',
            'Claiming the war was the dawn of a brighter future, The Trinity turned thousands of shapes into their followers and made them put a fight against whom they believed were &ldquo;imperfect.&rdquo;',
        ];
    }

    removeMenu() {
        game.menu._div.classList.add('-removed');
        return this;
    }

    add() {
        this._div.className = 'prologue';
        this._div.innerHTML = `<div class="prologue-image-0${this._i}"></div><p>${this._cues[this._i]}</p>`;
        game.game._div.appendChild(this._div);
        return this;
    }

    addContinue() {
        setTimeout(() => new PrologueContinue().add().addListeners(), 2500);
        return this;
    }

}

class PrologueContinue {

    constructor() {
        this._span = document.createElement('span');
    }

    add() {
        this._span.className = 'prologue-continue';
        this._span.innerHTML = 'CLICK TO CONTINUE';
        game.prologue._div.appendChild(this._span);
        return this;
    }

    addListeners() {
        document.body.addEventListener('click', this._continue);
    }

    _continue() {
        document.body.removeEventListener('click', PrologueContinue.prototype._continue);
        if (game.prologue._i === game.prologue._cues.length - 1) {
            game.room = new Room().removePrologue().add();
            game.health = {
                enemy: new Health('Sarge Peterson').add().hide(),
                character: new Health('You').add().hide()
            };
            game.enemy = new Teacher().add();
            game.character = new Character().add();
            game.inventory = new Inventory().add().addListeners();
            game.cues = new Cues().add();
            game.cue = new Cue().add().addContinue();
            return;
        }
        game.prologue._div.classList.add('-removed');
        game.prologue = new Prologue(game.prologue._i + 1).add().addContinue();

    }
}

class Room {
    constructor() {
        this._div = document.createElement('div')
    }

    removePrologue() {
        game.game._div.innerHTML = '';
        return this;
    }

    add() {
        this._div.className = 'room';
        game.game._div.appendChild(this._div);
        return this;
    }
}

class Teacher {

    constructor() {
        this._div = document.createElement('div');
    }

    add() {
        this._div.className = 'teacher';
        game.room._div.appendChild(this._div);
        return this;
    }

    hit() {
        this._div.classList.add('hit');
        setTimeout(() => this._div.classList.remove('hit'), 500);
    }
}

class Character {

    constructor() {
        this._div = document.createElement('div');
    }

    add() {
        this._div.className = 'character';
        game.room._div.appendChild(this._div);
        return this;
    }

    hit() {
        this._div.classList.add('hit');
        setTimeout(() => this._div.classList.remove('hit'), 500);
    }
}

class Inventory {

    constructor() {
        this._div = document.createElement('div');
    }

    add() {
        const items = `<div><p>Inventory</p><div class="inventory-items"><div class="items-button"></div>${new Array(5).join('<div></div>')}<div class="items-button"></div></div></div>`;
        const artifacts = `<div><p>Artifacts</p>\<div class="inventory-artifacts">${new Array(4).join('<div></div>')}</div></div>`;
        const menu = '<div class="inventory-menu"><span>Options</span><span>Exit</span></div>';
        this._div.className = 'inventory';
        this._div.innerHTML = items + artifacts + menu;
        game.room._div.appendChild(this._div);
        return this;
    }

    addListeners() {
        this._div.querySelector('.inventory-menu').addEventListener('click', Menu.prototype._splitter);
        return this;
    }
}

class Cues {

    constructor() {
        this._div = document.createElement('div');
    }

    add() {
        this._div.className = 'cues';
        game.game._div.appendChild(this._div);
        return this;
    }
}

class Cue {

    constructor(i = 0) {
        this._div = document.createElement('div');
        this._i = i;
        this._cues = [
            { role: 'enemy', cue: 'Welcome to the training facility, son!' },
            { role: 'enemy', cue: 'Name&rsquo;s Sergeant Peterson, and I&rsquo;m here to see what you&rsquo;ve learnt in the Academy so far.' },
            { role: 'enemy', cue: 'First, you&rsquo;ll use me as a target and then you&rsquo;ll show those ugly ones what you&rsquo;ve got.' },
            { role: 'enemy', cue: 'Pick a move, get through the challenge and hit the bastard! Go on!' },
        ];
    }

    add() {
        const role = this._cues[this._i].role;
        this._div.className = `${role}-cue`;
        this._div.innerHTML = `<p>${game.health[role]._name}</p><p>${this._cues[this._i].cue}</p>`;
        game.cues._div.appendChild(this._div);
        return this;
    }

    addContinue() {
        setTimeout(() => new CueContinue().add().addListeners(), 2500);
        return this;
    }

}

class CueContinue {

    constructor() {
        this._span = document.createElement('span');
    }

    add() {
        this._span.className = 'cue-continue';
        this._span.innerHTML = 'CLICK TO CONTINUE';
        game.cue._div.appendChild(this._span);
        return this;
    }

    addListeners() {
        document.body.addEventListener('click', this._continue);
    }

    _continue() {
        document.body.removeEventListener('click', CueContinue.prototype._continue);
        game.cue._div.classList.add('-removed');
        switch (game.cue._i) {
            case 2: {
                game.spells = new Spells().add(3).addListeners();
                game.cue = new Cue(game.cue._i + 1).add().addContinue();
                game.health.enemy._div.classList.remove('-hidden');
                game.health.character._div.classList.remove('-hidden');
                return;
            }
            case 3: {
                return;
            }
        }
        game.cue = new Cue(game.cue._i + 1).add().addContinue();
    }
}

class Health {

    constructor(name) {
        this._div = document.createElement('div');
        this._name = name;
        this._points = 100;
    }

    add() {
        this._div.className = 'health';
        this._div.innerHTML = `<p>${this._name}</p><div class="health-bar"></div>`;
        game.room._div.appendChild(this._div);
        return this;
    }

    hide() {
        this._div.classList.add('-hidden');
        return this;
    }

    replace() {
        game.health.enemy._div.parentElement.replaceChild(this._div, game.health.enemy._div);
        return this;
    }

    take(points) {
        this._points -= points;
        if (this._points < 1) {
            if (this._div === game.health.character._div) {
                new Score().add().addListeners();
                return;
            } else {
                game.enemy = new Enemy().add().replace();
                game.health.enemy = new Health(`${names[0][Problem.random(names[0].length - 1)]} ${names[1][Problem.random(names[1].length - 1)]}`).add().replace();
            }
        }
        this._div.lastElementChild.style.background = `linear-gradient(to right, #EF5350 ${this._points}%, transparent 1%)`;
        game.spells._div.classList.remove('-hidden');
    }
}

class Spells {

    constructor() {
        this._div = document.createElement('div');
        this._spells = [
            'Mighty Roar',
            'Pesky Sting',
            'Vicious Desolation',
        ];
    }

    add(i) {
        this._div.className = 'spells';
        this._div.innerHTML = new Array(i).fill(0).map((v, i) => `<div class="spell"><div class="spell-image-0${i}"></div><p>${this._spells[i]}</p></div>`).join('');
        game.game._div.appendChild(this._div);
        return this;
    }

    addListeners() {
        this._div.addEventListener('click', this._addChallenge);
        return this;
    }

    _addChallenge(event) {
        if (event.target.parentElement.classList.contains('spell')) {
            game.spells._div.classList.add('-hidden');
            if (!game.challenges) {
                game.challenges = new Challenges().add();
            }
            game.challenge = new challenges[Problem.random(challenges.length - 1)]().add().addListeners();
        }
    }
}

class Challenges {

    constructor() {
        this._div = document.createElement('div');
    }

    add() {
        this._div.className = 'challenges';
        game.game._div.appendChild(this._div);
        return this;
    }
}

class Problem {

    constructor(limit = 10) {
        this._div = document.createElement('div');
        this._limit = limit;
        this._operations = [
            ['plus', '+'],
            ['minus', '−'],
            ['multiplied by', '×'],
            ['divided by', '÷'],
        ];
    }

    add() {
        const operation = this._operations[Problem.random(3)];
        const numbers = this._random.call(this, operation[1]);
        this._answer = this._solve(operation[1], numbers);
        this._div.className = 'challenge challenge-problem';
        this._div.innerHTML = `<p>What&rsquo;s ${numbers[0]} ${operation[0]} ${numbers[1]}?</p><div><span>${numbers[0]}</span><span>${operation[1]}</span><span>${numbers[1]}</span><span>=</span><input type="text" placeholder="?"></div><span class="challenge-submit">OK</span>`;
        game.challenges._div.appendChild(this._div);
        return this;
    }

    addListeners() {
        this._div.querySelector('.challenge-submit').addEventListener('click', this._submit);
        return this;
    }

    _submit() {
        event.target.removeEventListener('click', Problem.prototype._submit);
        const answer = game.challenge._div.querySelector('input').value;
        if (game.challenge._answer === Number(answer)) {
            game.health.enemy.take(20);
            game.enemy.hit();
            game.score += 20;
        } else {
            game.health.character.take(20);
            game.character.hit();
        }
        game.challenge._div.classList.add('-removed');
    }

    _solve(operation, numbers) {
        switch (operation) {
            case '+':
                return numbers[0] + numbers[1];
            case '−':
                return numbers[0] - numbers[1];
            case '×':
                return numbers[0] * numbers[1];
            case '÷':
                return numbers[0] / numbers[1];
        }
    }

    _random(operation) {
        if (operation === '÷') {
            const number = Problem.random(this._limit, 4);
            const divisors = this._factorize(number);
            return (divisors.length) ? [number, divisors[Problem.random(divisors.length - 1)]] : this._random.call(this, operation);
        }
        return [Problem.random(this._limit, 1), Problem.random(this._limit, 1)];
    }

    _factorize(n) {
        return new Array(n).fill(0).map((v, i) => (i > 1 && !(n % i)) ? i : 0).filter(v => !!v);
    }

    static random(b, a = 0) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }
}

class Translation {

    constructor() {
        this._div = document.createElement('div');
        this._word = dictionary[Problem.random(dictionary.length - 1)];
    }

    add() {
        this._div.className = 'challenge challenge-translation';
        this._div.innerHTML = `<p>What's <span>${this._word[0].toUpperCase()}</span> in Russian?</p><input type="text" placeholder="?"><div class="challenge-submit">OK</div>`;
        game.challenges._div.appendChild(this._div);
        return this;
    }

    addListeners() {
        this._div.querySelector('.challenge-submit').addEventListener('click', this._submit);
        return this;
    }

    _submit(event) {
        event.target.removeEventListener('click', Problem.prototype._submit);
        const answer = game.challenge._div.querySelector('input').value.toLowerCase();
        if (~game.challenge._word[1].indexOf(answer)) {
            game.health.enemy.take(20);
            game.enemy.hit();
            game.score += 20;
        } else {
            game.health.character.take(20);
            game.character.hit();
        }
        game.challenge._div.classList.add('-removed');
    }
}

// http://shtooka.net
class Listening {

    constructor() {
        this._div = document.createElement('div');
        this._word = dictionary[Problem.random(dictionary.length - 1)];
        this._audio = new Audio();
    }

    add() {
        this._div.className = 'challenge challenge-listening';
        this._div.innerHTML ='<p>Write down what you hear (without the article):</p><div><div class="listening-play"></div><input type="text"></div><span class="challenge-submit">OK</span>';
        this._audio.src = `audio/${this._word[0]}.ogg`;
        game.challenges._div.appendChild(this._div);
        return this;
    }

    addListeners() {
        this._div.querySelector('.listening-play').addEventListener('click', this._play);
        this._div.querySelector('.challenge-submit').addEventListener('click', this._submit);
        return this;
    }

    _submit(event) {
        event.target.removeEventListener('click', Problem.prototype._submit);
        const answer = game.challenge._div.querySelector('input').value.toLowerCase();
        if (game.challenge._word[0] === answer) {
            game.health.enemy.take(20);
            game.enemy.hit();
            game.score += 20;
        } else {
            game.health.character.take(20);
            game.character.hit();
        }
        game.challenge._div.classList.add('-removed');
    }

    _play() {
        game.challenge._audio.play();
    }
}

class Sorting {

    constructor() {
        this._div = document.createElement('div');
        this._word = dictionary[Problem.random(dictionary.length - 1)];
    }

    add() {
        this._div.className = 'challenge challenge-sorting';
        this._div.innerHTML = `<p>Make a word from the following letters:</p><div class="letters">${this._word[0].split('').map(v => `<span>${v}</span>`).sort(() => Math.random() - Math.random()).join('')}</div><span class=challenge-submit>OK</span>`;
        game.challenges._div.appendChild(this._div);
        return this;
    }

    addListeners() {
        this._div.querySelector('div').addEventListener('mousedown', this._mouseDown);
        this._div.querySelector('.challenge-submit').addEventListener('click', this._submit);
        return this;
    }

    _mouseDown(event) {
        if (event.target.tagName === 'DIV') return;
        const target = event.target;
        const offsetX = event.pageX - target.getBoundingClientRect().left;
        const placeholder = new Placeholder().add(target);
        target.style.position = 'absolute';
        move(event.pageX);
        addListeners();

        function move(pageX) {
            const left = pageX - target.parentElement.getBoundingClientRect().left - offsetX;
            const right = target.parentElement.offsetWidth - target.offsetWidth;
            target.style.left = (left < 0) ? 0 : ((left > right) ? right : left) + 'px';
        }

        function addListeners() {
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
            target.addEventListener('dragstart', dragStart);
        }

        function mouseMove(event) {
            event.preventDefault();
            move(event.pageX);
            offset();
        }

        function mouseUp() {
            removeListeners();
            replace();
        }

        function dragStart(event) {
            event.preventDefault();
        }

        function offset() {
            if (target.getBoundingClientRect().left > placeholder.getBoundingClientRect().right) {
                target.parentElement.insertBefore(placeholder, placeholder.nextElementSibling.nextElementSibling);
            }
            if (target.getBoundingClientRect().right < placeholder.getBoundingClientRect().left) {
                target.parentElement.insertBefore(placeholder, placeholder.previousElementSibling);
            }
        }

        function removeListeners() {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            target.removeEventListener('dragstart', dragStart);
        }

        function replace() {
            target.style.position = '';
            placeholder.parentElement.replaceChild(target, placeholder);
        }
    }

    _submit() {
        event.target.removeEventListener('click', Problem.prototype._submit);
        const letters = game.challenge._div.querySelector('.letters').children;
        let answer = '';
        for (let span of letters) {
            answer += span.innerHTML;
        }
        if (game.challenge._word[0] === answer) {
            game.health.enemy.take(20);
            game.enemy.hit();
            game.score += 20;
        } else {
            game.health.character.take(20);
            game.character.hit();
        }
        game.challenge._div.classList.add('-removed');
    }
}

class Placeholder {

    constructor() {
        this._span = document.createElement('span');
    }

    add(element) {
        this._span.className = 'placeholder';
        element.parentElement.insertBefore(this._span, element);
        return this._span;
    }
}

class Enemy {

    constructor() {
        this._div = document.createElement('div');
        this._shapes = [
            'square',
            'circle',
            'triangle',
        ]
    }

    add() {
        const shape = this._shapes[Problem.random(2)];
        this._div.className = `enemy enemy-${shape}`;
        this._div.innerHTML = `<div class="${shape}-top-0${Problem.random(3)}"></div><div class="${shape}-middle-0${Problem.random(3)}"></div><div class="${shape}-bottom-0${Problem.random(3)}"></div>`;
        game.room._div.appendChild(this._div);
        return this;
    }

    replace() {
        game.enemy._div.parentElement.replaceChild(this._div, game.enemy._div);
        return this;
    }

    hit() {
        this._div.classList.add('hit');
        setTimeout(() => this._div.classList.remove('hit'), 500);
    }
}

class Score {

    constructor() {
        this._div = document.createElement('div');
    }

    add() {
        this._div.className = 'score';
        this._div.innerHTML = `<div class="score-window"><p>All right, that&rsquo;s it for today!</p><p>Nice job! Your score is ${game.score}. We&rsquo;ll continue tomorrow.</p><span class="score-begin">NEW GAME</span></div>`;
        game.game._div.appendChild(this._div);
        return this;
    }

    addListeners() {
        this._div.querySelector('.score-begin').addEventListener('click', this._begin);
    }

    _begin() {
        game.game._div.innerHTML = '';
        new Game().begin();
    }
}

const game = {
    sound: true,
    score: 0,
    game: { _div: document.body.querySelector('.game') }
};

const challenges = [
    Problem,
    Translation,
    Listening,
    Sorting,
];

const names = [
    ['Pesky', 'Fine', 'Meticulous', 'Greedy', 'Soggy', 'Greasy', 'Fictive'],
    ['Circleman', 'Shape', 'Squareman', 'Conehead', 'Troublemaker', 'Frankenstein'],
];

const dictionary = [
    ['yellow', ['жёлтый', 'жёлтенький', 'желтый', 'желтенький', 'желтоватый']],
    ['autumn', ['осень']],
    ['dog', ['собака', 'собачка', 'щенок', 'щеночек']],
    ['spring', ['весна']],
    ['cat', ['кот', 'котик', 'котёнок', 'котенок', 'кошка', 'кошечка']],
    ['kitchen', ['кухня', 'кухонька']],
    ['orange', ['апельсин', 'апельсинчик']],
    ['summer', ['лето']],
    ['winter', ['зима']],
    ['red', ['красный', 'красненький', 'красноватый']],
    ['toy', ['игрушка', 'игрушечка']],
    ['mother', ['мама', 'мамочка']],
    ['father', ['папа', 'папочка']],
    ['sport', ['спорт']],
    ['food', ['еда']],
    ['apple', ['яблоко']],
];

new Game().begin();
