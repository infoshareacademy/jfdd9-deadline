//smooth scrollto
$('.nav-link').click(function(event){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 500, 'linear');
});


var links = document.querySelectorAll('.nav-link');
var menu = document.querySelector('nav');
var hero = document.querySelector('header.hero');

window.addEventListener('scroll', function (event) {
    var currentPosition = window.pageYOffset;
    Array.prototype.map.call(links, function (link) {
        return document.querySelector(
            link.getAttribute('href')
        )
    }).forEach(function (element, index) {
        var pos = currentPosition + menu.offsetHeight + 1;
        if (
            pos > element.offsetTop &&
            pos < element.offsetHeight + element.offsetTop) {
            links.forEach(function (link) {
                link.parentNode.classList.remove('active')
            });
            links[index].parentNode.classList.add('active')
        }


        console.log(hero.offsetHeight);
        if (currentPosition < hero.offsetHeight){
            links.forEach(function (link) {
                link.parentNode.classList.remove('active')
            });
        }
    })
});

