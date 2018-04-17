var gameBox = document.getElementById('game');
var mainNode = document.getElementById('main');
var pointsNode = document.getElementById('points');
var pointsCat = document.getElementById('pointsImg');
var timerBar = document.getElementById('timerBar')
var catsNode = document.getElementById('cats');
var foodNode = document.getElementById('food');
var handNode = document.getElementById('hand');
var brushNode = document.getElementById('brush');
var woolNode = document.getElementById('wool');
var needsNode = document.querySelectorAll('.needs');
var needs = ['food', 'hand', 'brush', 'wool'];
var points = 0;

var height = 2;
var width = 2;
var randomNeedIndex;
var timeNode = document.getElementById('timer');
var catIndex;
/*licznik czasu */

var timeV = 0;
var timeoutId;
var itemsNode = document.getElementById('items');
var clickedItemId;
var activeItem = false;


function removeClass(){

    activeItem.classList.remove('active_item');
    console.log(activeItem);
    activeItem = false;
    this.className = 'needs';
    this.innerText = "";
}

function countPoints(){
    pointsNode.innerText = points;
    pointsCat.style.marginleft = (50 + points)+"%"
}
function addPoints(){
    points +=1;
    countPoints() ;
}
function decreasePoints(){
    points -=1;
    countPoints();
}

var time = (function timer() {
    setInterval(function () {
        timeV += 1;
        timeNode.innerHTML = timeV + 'seconds';
        if (timeV === 10) {
            timeV = 0;
        }

    }, 1000);
    return timeV;

})();

/* losowanie liczb z zakresu range*/
function getNumberFromRange(range) {
    return Math.floor(Math.random() * range);
}

/* losowanie potrzeby*/
function randomNeed() {
    catIndex = getNumberFromRange(4);
    randomNeedIndex = getNumberFromRange(4);
    needsNode[catIndex].innerText = needs[randomNeedIndex];
    needsNode[catIndex].classList.add(needs[randomNeedIndex]);
    timeoutId = setTimeout(function () {
        needsNode[catIndex].className = 'needs';
        needsNode[catIndex].innerText = '';
        decreasePoints();

    }, 4000);
    return randomNeedIndex;
}

function needRandomizer(tim) {
    setInterval(randomNeed, tim)
}

needRandomizer(5000);



// dodawanie eventlistenera do itemów
var needsClick = (function () {


// listener dla itemów
    function init (catIndex) {
        var items = document.querySelectorAll('.item');
        items.forEach(function (item) {
            item.addEventListener('click', function (event){
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
            })
        });
// listener dla potrzeb
        Object.values(needsNode).map( function(e){ e.addEventListener('click', function () {
            console.log(clickedItemId);
            console.log(needs[randomNeedIndex]);
            if (activeItem === false) {
                return
            }

            if (('needs ' + clickedItemId) === this.className) {
                console.log('success');
                removeClass();
                clickedItemId = "";
                addPoints();
                clearTimeout(timeoutId);

            } else if (('needs ' + clickedItemId) !== this.className) {
                console.log('fail');
                removeClass();
                decreasePoints();
                clearTimeout(timeoutId);
            } else {
                console.log('dun click me bro')
            }
        })
    })

    }


    return {
        init: init
    }
})();


needsClick.init(3);
