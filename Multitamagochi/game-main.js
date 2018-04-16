var gameBox = document.getElementById('game');
var mainNode = document.getElementById('main');
var pointsNode = document.getElementById('points');
var catsNode = document.getElementById('cats');
var foodNode = document.getElementById('food');
var handNode = document.getElementById('hand');
var brushNode = document.getElementById('brush');
var woolNode = document.getElementById('wool');
var needsNode = document.getElementById('needs');
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
    needsNode.innerText = needs[randomNeedIndex];
    needsNode.classList.add(needs[randomNeedIndex]);
    setTimeout(function () {
        needsNode.className = '';
        needsNode.innerText = '';
    }, 8000);
    return randomNeedIndex;
}

function needRandomizer(tim) {
    setInterval(randomNeed, tim)
}

needRandomizer(10000);



// dodawanie eventlistenera do itemów
var needsClick = (function () {
    var itemsNode = document.getElementById('items');
    var points = 0;
    var clickedItemId;
    var activeItem = false;

    function init () {
        itemsNode.addEventListener('click', function (event) {

            var clickedElement = event.target;
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
                    clickedElement.classList.remove('active_item')
                    activeItem = false;
                    clickedItemId = "";

                }
            }

        });

        needsNode.addEventListener('click', function () {
            console.log(clickedItemId);
            console.log(needs[randomNeedIndex] );
            if (activeItem === false){return}

            if(clickedItemId === needsNode.className){
                console.log('success');
                activeItem.classList.remove('active_item');
                activeItem = false;
                clickedItemId = "";
                needsNode.className = '';
                needsNode.innerText = '';
                points += 1;
                pointsNode.innerText = points;

            }else if(clickedItemId !== needsNode.className){
                console.log('fail');
                activeItem.classList.remove('active_item');
                console.log(activeItem);
                activeItem = false;
                needsNode.className = '';

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

// for(var i=0;i < item.length; i++){
//      item[i].addEventListener('click',function(){
//       item[element].classList.add('active_item');
//          console.log('lol')
//
//  })}
/*
//food
   item[0].addEventListener('click',function(){
       if (item[0].classList.contains('active_item')) {
           item[0].classList.remove('active_item');
           console.log('lol')
       } else {
           item[3].classList.add('active_item');
           console.log(' trol')
       }

       //hand
   item[1].addEventListener('click',function(){
       if (item[1].classList.contains('active_item')) {
           item[1].classList.remove('active_item');
           console.log('lol')
       } else {
           item[1].classList.add('active_item');
           console.log(' trol')
       }

       //brush
   item[2].addEventListener('click',function(){
       if (item[2].classList.contains('active_item')) {
           item[2].classList.remove('active_item');
           console.log('lol')
       } else {
           item[2].classList.add('active_item');
           console.log(' trol')
       }

       //wool
   item[3].addEventListener('click',function(){
       if (item[3].classList.contains('active_item')) {
           item[3].classList.remove('active_item');
           console.log('lol')
       } else {
           item[3].classList.add('active_item');
           console.log(' trol')
       }})

       */


