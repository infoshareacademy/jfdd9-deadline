var gameBox = document.getElementById('game');
var pointsCat = document.getElementById('pointsImg');
var timerBar = document.getElementById('timerBar');
var catsNode = document.querySelectorAll('.cats');
var needsNode = document.querySelectorAll('.needs');
var timeOut = document.getElementById('time-out');
var win = document.getElementById('win');
var lose = document.getElementById('lose');
var board = document.getElementById('board');
var needs = ['food', 'hand', 'brush', 'wool'];
var points = 0;
var randomNeedIndex;
var catIndex;
var timeoutId;
var clickedItemId;
var activeItem = false;
var timeV = 0;
var timeEnd = 120;
var gameInterval;


function mediaQ(mediaq) {
    var cat = document.getElementById('cat4');
    var cat2 = document.getElementById('cat3');
    if (mediaq.matches) { //If media query matches
        console.log(catsNode);
        cat.style.display = 'none';
        cat2.style.display = 'none';
    }
    else {
        cat.style.display = 'block';
        cat2.style.display = 'block';
    }
}


var mediaq = window.matchMedia("(max-width: 550px)");
mediaQ(mediaq); // Call listener function at run time
mediaq.addListener(mediaQ); // Attach listener function on state changes


// kasowanie klas klikniętego targetu i ukrywanie całego diva

function removeClass(target) {

    activeItem.classList.remove('active_item');
    document.querySelectorAll('.needs').forEach(function (e) {
        e.className = 'needs';
    });
    activeItem = false;
    try {
        needsNode[catIndex].style.visibility = 'hidden';
    } catch (e) {
        // skip
    }

}

//przesuwanie kota po skali punktów

function countPoints() {
    console.log(points);
    pointsCat.style.marginLeft = (45 + points) + "%";
    endGame();
}

// dodawanie punktów
function addPoints() {
    points += 3;
    countPoints();
}

// odejmowanie punktów
function decreasePoints() {
    points -= 3;
    countPoints();
}

var timeInterval;
/*licznik czasu */
var time = function timer() {
    timeInterval = setInterval(function () {
        timeV += 1;
        timerBar.style.width = (9 + timeV * (91 / timeEnd)) + "%";
        if (timeV === timeEnd + 1) {
            // timeV = 0;
            endGame();
            clearInterval(timeInterval)
        }

        }, 1000);
        return timeV;
    };
var theme = new Audio('mp3/mruczenie kota.mp3');
var theme1 = new Audio('mp3/Cute KITTENS Sing In AUTOTUNE.mp3');
function endGame() {
        //stopTime() {
        //    albo max time === 120s
        //    albo |points| = 45
   // }
    if (points === 45) {
        // gameBox.innerHTML = "You WON!"
        win.style.display = 'flex';
        board.style.display = 'none';
        clearInterval(gameInterval);
        clearInterval(timeInterval);
        clearTimeout(timeoutId);
        theme.play();
    }
    if (points === -45) {
        //  gameBox.innerHTML = "You LOSE!";
        lose.style.display = 'flex';
        board.style.display = 'none';
        clearInterval(gameInterval);
        clearInterval(timeInterval);
        clearTimeout(timeoutId);
        theme1.play();
    }

    if (timeV === timeEnd + 1) {
        //gameBox.innerHTML = "Time OUT!"
        timeOut.style.display = 'flex';
        board.style.display = 'none';
        clearInterval(gameInterval);
        clearInterval(timeInterval);
        clearTimeout(timeoutId);
        theme1.play();
    }

}

/* losowanie liczb z zakresu range*/
function getNumberFromRange(range) {
    return Math.floor(Math.random() * range);
}

/* losowanie potrzeby*/
function randomNeed() {
    catIndex = getNumberFromRange(4);
    randomNeedIndex = getNumberFromRange(4);
    needsNode[catIndex].innerHTML = '<img src="img/item-' + needs[randomNeedIndex] + '.png" draggable="false" />';
    needsNode[catIndex].classList.add(needs[randomNeedIndex]);
    needsNode[catIndex].style.visibility = 'visible';
    timeoutId = setTimeout(function () {
        needsNode[catIndex].className = 'needs';
        needsNode[catIndex].innerText = '';
        needsNode[catIndex].style.visibility = 'hidden';
        decreasePoints();

    }, 2500); //czas wyświetlania potrzeby
    return randomNeedIndex;
}

function needRandomizer(tim) {
    gameInterval = setInterval(randomNeed, tim)
}


var itemClickFunction = function (event) {
    var clickedElement = event.currentTarget;
    if (activeItem !== false) {
        if (activeItem !== clickedElement) {
            return
        }
    }
    if (clickedElement.classList.contains('item')) {
        if (!clickedElement.classList.contains('active_item')) {
            clickedElement.classList.add('active_item');
            activeItem = clickedElement;
            clickedItemId = activeItem.getAttribute('id');


        } else {
            clickedElement.classList.remove('active_item');
            activeItem = false;
            clickedItemId = "";

        }
    }
};
var catClickFunction = function () {
    var needsElement = this.parentNode.querySelector('.needs');
    console.log(clickedItemId);
    console.log(needs[randomNeedIndex]);
    if (activeItem === false) {
        return
    }

    if (('needs ' + clickedItemId) === needsElement.className) {
        console.log('success');
        removeClass(needsElement);
        clickedItemId = "";
        addPoints();
        clearTimeout(timeoutId);

    } else if (('needs ' + clickedItemId) !== needsElement.className) {
        console.log('fail');
        removeClass(needsElement);
        decreasePoints();
        clearTimeout(timeoutId);

    } else {
        console.log('dun click me bro')
    }
};

// dodawanie eventlistenera do itemów
var needsClick = (function () {


// listener dla itemów
    function init(catIndex, reset) {
        var items = document.querySelectorAll('.item');
        items.forEach(function (item) {
            if (reset) {
                item.removeEventListener('click', itemClickFunction)
            }
            item.addEventListener('click', itemClickFunction)
        });
// listener dla potrzeb
        Object.values(catsNode).map(function (e) {
            if (reset) {
                e.removeEventListener('click', catClickFunction)
            }
            e.addEventListener('click', catClickFunction)
        })

    }


    return {
        init: init
    }
})();

function reset() {
    clearInterval(timeInterval);
    clearInterval(gameInterval);
    clearTimeout(timeoutId);
    points = 0;
    timeV = 0;
    startGame(true);
    countPoints();

    timerBar.style.width = (9 + timeV * (91 / timeEnd)) + "%";
    try {
        needsNode[catIndex].style.visibility = 'hidden';
        needsNode[catIndex].className = 'needs';
    } catch (e) {
        // skip
    }
    btnPause.innerHTML = '<i class="fas fa-pause"></i>';
    btnPause.classList.remove('start');
    btnPause.classList.add('stop');
    board.style.display = 'block';
    lose.style.display = 'none';
    timeOut.style.display = 'none';
    win.style.display = 'none';
    board.style.pointerEvents = '';

}

function startGame(reset) {
    countPoints(); //zliczanie punktów
    needRandomizer(4000); //włączanie losowania, co ile czasu losujemy
    time(); //włączanie czasu
    needsClick.init(null, reset);
}

var btnPause = document.getElementById('btn-stop-start-game');

btnPause.addEventListener('click', function (e) {

    if (btnPause.classList.contains('stop')) {
        this.innerHTML = '<i class="fas fa-play"></i>';
        this.classList.remove('stop');
        this.classList.add('start');
        board.style.pointerEvents = 'none';
        pauseGame();

    }
    else {
        this.innerHTML = '<i class="fas fa-pause"></i>';
        this.classList.remove('start');
        this.classList.add('stop');
        try {
            needsNode[catIndex].style.visibility = 'hidden';
            needsNode[catIndex].className = 'needs';
        } catch (e) {
            // skip
        }
        board.style.pointerEvents = '';
        startGame(false);
    }
});

function pauseGame() {
    clearInterval(timeInterval); // główny licznik czasu trwania gry
    clearInterval(timeoutId); //czas trwania potrzeby
    clearInterval(gameInterval); // pojawianie się potrzeb
}

var btnRestart = document.getElementById('btn-restart-game');

btnRestart.addEventListener('click', function () {
    reset();
});
startGame(false);

