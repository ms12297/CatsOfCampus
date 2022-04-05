////

var overlay = document.querySelector('.overlay');
var popup = document.getElementById('popup');

popup.addEventListener('click', function(e){
  overlay.style.display = "flex"; //to make sure menu of contents is always centered
});

overlay.addEventListener('click', function(){
  overlay.style.display = "none";
});


//Colour change with scrolling

function getScrollPercent()
{
  let scrollRange = document.body.offsetHeight - window.innerHeight;
  return window.scrollY / scrollRange;
}

window.addEventListener('scroll', function(e){
  //console.log(window.scrollY, getScrollPercent());
  let percent = getScrollPercent();
  document.body.style.backgroundColor = 'rgb('+ 255 * percent +', '+ 255 * (1.0 - percent) +', 255)';
});


//Mouse Interaction

//Function to get Mouse Coordinates

function getRelativeCoordinates(mouse, element){
  let rect = element.getBoundingClientRect();
  return {
    x: mouse.clientX - rect.left,
    y: mouse.clientY - rect.top
  };
}

//To change colour when mouse is hovering over section divs

var sections = document.getElementsByClassName('section');
//sections = document.querySelectorAll('.section');
for(let i = 0; i < sections.length; i++)
{
  sections[i].addEventListener('mousemove', function(mouse){
    coords = getRelativeCoordinates(mouse, sections[i]);
    coords.x /= sections[i].clientWidth;
    coords.y /= sections[i].clientHeight;
    sections[i].style.backgroundColor = 'rgb(255, '+ 255 * coords.x +', '+ 255 * coords.y +')';
  });

  //background colour reverts to bisque when mouse leaves
  sections[i].addEventListener('mouseleave', function(){
    sections[i].style.backgroundColor = 'bisque';
  });
}

//Doing the same colour variation effect for section2 div
var section2 = document.getElementsByClassName('section2');
for(let i = 0; i < section2.length; i++)
{
  section2[i].addEventListener('mousemove', function(mouse){
    coords = getRelativeCoordinates(mouse, section2[i]);
    coords.x /= section2[i].clientWidth;
    coords.y /= section2[i].clientHeight;
    section2[i].style.backgroundColor = 'rgb(255, '+ 255 * coords.x +', '+ 255 * coords.y +')';
  });

  //background colour reverts to bisque when mouse leaves
  section2[i].addEventListener('mouseleave', function(){
    section2[i].style.backgroundColor = 'bisque';
  });
}

var sound = new Howl({
      src: ['meow.mp3']
    });

$('#main .section').each(function(index, element) {
  element = $(element);
  //console.log("index:", index, element);
  index += 1;
  //console.log(index);

  element.click(function (){

    sound.play();
  })

  if (index % 2 == 0){
    element.attr("data-aos", "fade-right");
  }
  else {
    element.attr("data-aos", "fade-left");
  }
});

$('#main .section2').each(function(index, element) {
  element = $(element);
  element.attr("data-aos", "fade-right");
});

AOS.init();


//Interactive Sounds

var drums = document.getElementById("drums");
var intro = document.querySelector('.overlay');

intro.addEventListener('click', function(){
  intro.classList.add('hidden');
  drums.play();
});

//drums.play(); //wont work because interaction required
const autoWah = new Tone.AutoWah(50, 6, -30).toDestination();
autoWah.Q.value = 6;
const synth = new Tone.Synth().connect(autoWah);

//sections = document.querySelectorAll('.section');
const arr = ["C4", "D4", "E4"];
for(let i = 0; i < sections.length; i++)
{
  //background colour reverts to bisque when mouse leaves
  sections[i].addEventListener('mouseenter', function(){
    synth.triggerAttackRelease(arr[i], "8n");
  });
}

//Doing the same colour variation effect for section2 div
for(let i = 0; i < section2.length; i++)
{
  //background colour reverts to bisque when mouse leaves
  section2[i].addEventListener('mouseenter', function(){
    synth.triggerAttackRelease("C5", "8n");
  });
}

