

    var gameBox = document.getElementById('game');
    var mainNode = document.getElementById('main');
    var needsNode = document.getElementById('needs');
    var pointsNode = document.getElementById('points');
    var catsNode = document.getElementById('cats');
    var itemsNode = document.getElementById('items');
    var height = 2;
    var width = 2;
    var randomNeedIndex;
    var timeNode = document.getElementById('timer');
    //var needsTable = needsNode.appendChild(createNeedsTable(width,height));
  //  var needsTd = needsTable.querySelectorAll('td');
    var timeV = 0;


   var time =  (function timer(){
        setInterval(function(){
            timeV+=1;
            timeNode.innerHTML = timeV + 'seconds';
            console.log(timeV);
            if(timeV === 5){
                timeV = 0;
            }

        },1000)
            return timeV;

    })();

    function getNumberFromRange(range) {
        return Math.floor(Math.random() * range);
    }

function randomNeed(){
        randomNeedIndex = getNumberFromRange(4);
        needsNode.innerText = 'Need index' + randomNeedIndex;
    console.log(randomNeedIndex);
    if(randomNeedIndex === 0){
        needsNode.classList.add('food')

    }
    if(randomNeedIndex === 1){
        needsNode.classList.add('hand')

    }
    if(randomNeedIndex === 2){
        needsNode.classList.add('brush')

    }
    if(randomNeedIndex === 3){
        needsNode.classList.add('wool')
    }

    setTimeout(function(){
        needsNode.className = '';



    },3000);
    return randomNeedIndex;
}

function needRandomizer(tim) {setInterval(randomNeed,tim)
}

needRandomizer(5000);
needRandomizer(1500);
needRandomizer(1000);
needRandomizer(800);





/*
    function createNeedsTable(width, height) {
        var table = document.createElement('table');
        var tbody = document.createElement('tbody');
        var tr, td, x, y;

        for (y = 0; y < height; y += 1) {
            tr = document.createElement('tr');
            for (x = 0; x < width; x += 1) {
                td = document.createElement('td');
                tr.appendChild(td)
                td.innerText = '0';
            }
            tbody.appendChild(tr)
        }

        table.appendChild(tbody);
        return table;
    }



    function needTimer() {

        setInterval(function (){
            randomNeed = getNumberFromRange(needsTd.length);
            console.log(randomNeed)
        }, 400);
    }

    function showFood(){
        var foodImage = document.createElement("img");
         var addFoodImage = document.getElementsByTagName('td').appendChild(foodImage);
         addFoodImage.classList.add('.food')

    }
    function showHand(){
        var handImage = document.createElement("img");
        var addHandImage =  document.getElementsByTagName('td').appendChild(handImage);
        addHandImage.classList.add('.hand')

    }
    function showBrush(){
        var brushImage = document.createElement("img");
         var addBrushImage = document.getElementsByTagName('td').appendChild(brushImage);
        addBrushImage.classList.add('.brush')

    }
    function showWool(){
        var woolImage = document.createElement("img");
         var addWoolImage = document.getElementsByTagName('td').appendChild(woolImage);
        addWoolImage.classList.add('.wool')

    }

    function needRandomizer(){
        setInterval(function(){
        needTimer();


        if(randomNeed === 0){
            showFood();
            needsTd[randomNeed].innerHTML = '1';
        }
        if(randomNeed === 1){
            showHand();
            needsTd[randomNeed].innerText = '2';

        }
        if(randomNeed === 2){
            showBrush();
            needsTd[randomNeed].innerText = '3';
        }
        if(randomNeed === 3){
            showWool();
            needsTd[randomNeed].innerText = '4';
        }
        setTimeout(function(){
            if (!(needsTd[randomNeed].textContent === '0')) {
    needsTd[randomNeed].innerText = '0';
}
        },3000)},5000)


    }

    needRandomizer();

*/


