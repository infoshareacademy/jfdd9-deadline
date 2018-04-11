

    var gameBox = document.getElementById('game');
    var mainNode = document.getElementById('main');
    var needsNode = document.getElementById('needs');
    var pointsNode = document.getElementById('points');
    var catsNode = document.getElementById('cats');
    var itemsNode = document.getElementById('items');
    var height = 2;
    var width = 2;
    var createNeed = document.createElement('img');

    function createNeedsTable(width, height) {
        var table = document.createElement('table');
        var tbody = document.createElement('tbody');
        var tr, td, x, y;

        for (y = 0; y < height; y += 1) {
            tr = document.createElement('tr');
            for (x = 0; x < width; x += 1) {
                td = document.createElement('td');
                tr.appendChild(td)
            }
            tbody.appendChild(tr)
        }

        table.appendChild(tbody);
        return table;
    }

   var needsTable = needsNode.appendChild(createNeedsTable(width,height));
    needRandomizer();
    function needRandomizer(){

    }




