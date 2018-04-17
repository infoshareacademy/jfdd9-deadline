var gameBox = document.getElementById('game');
var mainNode = document.getElementById('main');
var pointsNode = document.getElementById('points');
var catsNode = document.getElementById('cats');
var foodNode = document.getElementById('food');
var handNode = document.getElementById('hand');
var brushNode = document.getElementById('brush');
var woolNode = document.getElementById('wool');
var needsNode = document.querySelector('.needs');
var needs = ['food', 'hand', 'brush', 'wool'];

var height = 2;
var width = 2;
var randomNeedIndex;
var timeNode = document.getElementById('timer');

//var needsTable = needsNode.appendChild(createNeedsTable(width,height));
//  var needsTd = needsTable.querySelectorAll('td');

/*licznik czasu */
var timeV = 0;


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
    randomNeedIndex = getNumberFromRange(4);
    needsNode.innerHTML = '<img src="img/item-' + needs[randomNeedIndex] + '.png" />';
    needsNode.classList.add(needs[randomNeedIndex]);
    console.log(needs[randomNeedIndex]);
    setTimeout(function () {
        needsNode.className = 'needs';
        needsNode.innerText = '';
    }, 8000);
    return randomNeedIndex;
}


function needRandomizer(tim) {
    setInterval(randomNeed, tim)
}

needRandomizer(5000);



// dodawanie eventlistenera do itemów
var needsClick = (function () {
    var itemsNode = document.getElementById('items');
    var points = 0;
    var clickedItemId;
    var activeItem = false;
// listener dla itemów
    function init () {
        var items = document.querySelectorAll('.item');
        items.forEach(function (item) {
            item.addEventListener('click', function (event) {
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
        needsNode.addEventListener('click', function () {
            console.log(clickedItemId);
            console.log(needs[randomNeedIndex] );
            if (activeItem === false){return}

            if(('needs '+ clickedItemId) === needsNode.className){
                console.log('success');
                activeItem.classList.remove('active_item');
                activeItem = false;
                clickedItemId = "";
                needsNode.className = 'needs';
                needsNode.innerText = '';
                points += 1;
                pointsNode.innerText = points;

            }else if(('needs '+clickedItemId) !== needsNode.className){
                console.log('fail');
                activeItem.classList.remove('active_item');
                console.log(activeItem);
                activeItem = false;
                needsNode.className = 'needs';

                points -= 1;
                pointsNode.innerText = points;
            }else{
                console.log('dun click me bro')
            }
        })
    }


    return {
        init: init
    }
})();


needsClick.init()
