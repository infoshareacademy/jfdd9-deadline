var gameBox = document.getElementById('game');
var mainNode = document.getElementById('main');
var pointsNode = document.getElementById('points');
var pointsCat = document.getElementById('pointsImg');
var timerBar = document.getElementById('timerBar');
var catsNode = document.querySelectorAll('.cats');
var needsNode = document.querySelectorAll('.needs');
var needs = ['food', 'hand', 'brush', 'wool'];
var points = 0;
var height = 2;
var width = 2;
var randomNeedIndex;
var timeNode = document.getElementById('timer');
var catIndex;
var timeoutId;
var itemsNode = document.getElementById('items');
var clickedItemId;
var activeItem = false;
var timeV = 0;




function mediaQ(mediaq){
    var cat = document.getElementById('cat4');
    var cat2 = document.getElementById('cat3')
    if (mediaq.matches){ //If media query matches
        console.log(catsNode);
        cat.style.display = 'none';
        cat2.style.display = 'none';
    }
    else{
        cat1.style.display = 'block';
        cat2.style.display = 'block';
    }
}

var mediaq = window.matchMedia("(max-width: 550px)");
mediaQ(mediaq); // Call listener function at run time
mediaq.addListener(mediaQ); // Attach listener function on state changes


countPoints();

// kasowanie klas klikniętego targetu i ukrywanie całego diva

function removeClass(target){

    activeItem.classList.remove('active_item');
    document.querySelectorAll('.needs').forEach( function(e){
        e.className = 'needs';
    });
    activeItem = false;
    needsNode[catIndex].style.visibility ='hidden';

}
//przesuwanie kota po skali punktów

function countPoints(){
    console.log(points);
    pointsCat.style.marginLeft= (45 + points)+"%"

}
// dodawanie punktów
function addPoints(){
    points +=1;
    countPoints() ;
}
// odejmowanie punktów
function decreasePoints(){
    points -=1;
    countPoints();
}
/*licznik czasu */
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
    needsNode[catIndex].innerHTML = '<img src="img/item-' + needs[randomNeedIndex] + '.png" draggable="false" />';
    needsNode[catIndex].classList.add(needs[randomNeedIndex]);
    needsNode[catIndex].style.visibility ='visible';
    timeoutId = setTimeout(function () {
        needsNode[catIndex].className = 'needs';
        needsNode[catIndex].innerText = '';
        needsNode[catIndex].style.visibility ='hidden';
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
        Object.values(catsNode).map( function(e){ e.addEventListener('click', function () {
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
        })
    })

    }


    return {
        init: init
    }
})();


needsClick.init();

