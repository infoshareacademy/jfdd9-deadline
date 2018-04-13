

    var gameBox = document.getElementById('game');
    var mainNode = document.getElementById('main');
    var needsNode = document.getElementById('needs');
    var pointsNode = document.getElementById('points');
    var catsNode = document.getElementById('cats');
    var itemsNode = document.getElementById('items');
    var foodNode = document.getElementById('food');
    var handNode = document.getElementById('hand');
    var brushNode = document.getElementById('brush');
    var woolNode = document.getElementById('wool');
    var height = 2;
    var width = 2;
    var randomNeedIndex;
    var timeNode = document.getElementById('timer');
    //var needsTable = needsNode.appendChild(createNeedsTable(width,height));
  //  var needsTd = needsTable.querySelectorAll('td');

    /*licznik czasu */
    var timeV = 0;


   var time =  (function timer(){
        setInterval(function(){
            timeV+=1;
            timeNode.innerHTML = timeV + 'seconds';
            if(timeV === 10){
                timeV = 0;
            }

        },1000)
            return timeV;

    })();
/* losowanie liczb z zakresu range*/
    function getNumberFromRange(range) {
        return Math.floor(Math.random() * range);
    }
/* losowanie potrzeby*/
function randomNeed(){
        randomNeedIndex = getNumberFromRange(4);
        needsNode.innerText = 'Need index ' + randomNeedIndex;
    var needs = ['food', 'hand', 'brush', 'wool'];
    needsNode.classList.add(needs[randomNeedIndex]);


    setTimeout(function(){
        needsNode.className = '';
        needsNode.innerHTML = '';
    },3000);
    return randomNeedIndex;
}

function needRandomizer(tim) {setInterval(randomNeed,tim)
}
needRandomizer((getNumberFromRange(4000)));
    var item = itemsNode.querySelectorAll('div');
var clickedItem;
var activeItem = false;
 // dodawanie eventlistenera do itemów
    itemsNode.addEventListener('click',function (event) {
        var clickedElement = event.target;
        if (activeItem !== false){
            if( activeItem !== clickedElement){
                return
            }
        }
        if (clickedElement.classList.contains('item')){
            if (!clickedElement.classList.contains('active_item')) {
                clickedElement.classList.add('active_item');
                activeItem = clickedElement;


            } else {
                clickedElement.classList.remove('active_item')
                activeItem = false;

            }
            console.log(clickedElement);
            clickedItem = clickedElement;

        }
    });

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


