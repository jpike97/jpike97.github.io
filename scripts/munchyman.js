document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('.reveal-data')) return;

	// Don't follow the link
	event.preventDefault();
    move();
    document.getElementById('myProgress').classList.add('reveal');
    document.querySelector('.text').classList.add('reveal');
    setTimeout(doMunchy, 1000);
	// Log the clicked element in the console


}, false);


function doMunchy() { 
    document.getElementById('myProgress').classList.remove('reveal');
    document.querySelector('.text').innerHTML = "With 94.3% certainty, current bird is..";
    setTimeout(revealMunchy, 2000);
}

function revealMunchy() { 
    document.querySelector('.text').innerHTML = "With 94.3% certainty, current bird is MUNCHY MAN";
    document.querySelector('.munchy-man').classList.add('reveal');
}

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}