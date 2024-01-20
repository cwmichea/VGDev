console.log('teeeeeeeeeeest!')
// console.log(track);
// console.log(slides);
// console.log(slideSize);
// console.log(slideWidth);


const track = document.querySelector('.c-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.c-button--right');
const prevButton = document.querySelector('.c-button--left');
const dotsNav = document.querySelector('.c-nav');
const dots =  Array.from(dotsNav.children);

const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;

// arrange slides next to one another //

// slides[0].style.left = 0 ;
// slides[1].style.left = slideWidth +'px';
// slides[2].style.left = slideWidth * 2 +'px';
//console.log(slideWidth);



// 1 function place slide
const setSlidePosition = (slide, index) => 
{
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);
// slides.forEach((slide, index) => {
//     slide.style.left = slideWidth * index + 'px';
// })
// console.log(slides[0].style);

//2 function move slides

const moveSlide = (track, currentSlide, targetSlide) => 
{
    track.style.transform = 'translateX(-'+targetSlide.style.left+')';
    currentSlide.classList.remove('current');
    targetSlide.classList.add('current');
}

//3 function update dots

const updateDots = (currentDot, targetDot) =>
{
    currentDot.classList.remove('current');
    targetDot.classList.add('current');
}


// when i click left, move left  //
prevButton.addEventListener('click', e =>
{   //identify into the right scope
    const currentSlide = track.querySelector('.current');
    const prevSlide = currentSlide.previousElementSibling;
    //recollect data to update
    const currentDot = dotsNav.querySelector('.current');
    const prevDot = currentDot.previousElementSibling;
    //update
    updateDots(currentDot, prevDot);
    //move
    moveSlide(track, currentSlide, prevSlide);
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    updateArrows(slides, prevButton, nextButton, prevIndex);
}
)
// when i click right, move right //
nextButton.addEventListener('click', e => 
{   //recollect data 2 move into the right scope
// console.log(currentSlide.nextElementSibling);
    const currentSlide = track.querySelector('.current');
    const nextSlide = currentSlide.nextElementSibling;
    // const amountToMove = nextSlide.style.left;

    //recollect data to update
    const currentDot = dotsNav.querySelector('.current');
    const nextDot = currentDot.nextElementSibling;

    //move
    moveSlide(track, currentSlide, nextSlide);
    //update
    updateDots(currentDot, nextDot);
    // track.style.transform = 'translateX(-'+amountToMove+')';
    // currentSlide.classList.remove('current');
    // nextSlide.classList.add('current')
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    updateArrows(slides, prevButton, nextButton, nextIndex);

}
)
// when i click on one dot, move to the right one //
dotsNav.addEventListener('click', e =>
{
    const targetDot =e.target.closest('button');
    // console.log('test1');
    // if (!targetDot) return;
    // console.log('test2');
    if (!targetDot) return;
    const currentSlide = track.querySelector('.current');
    const currentDot = dotsNav.querySelector('.current');
    //it works like a foreach and dot is a given name, we are comparing a thing with an index here
    const targetIndex = dots.findIndex(dotIndex => dotIndex === targetDot);
    // console.log(targetDot);
    // console.log(targetIndex);
    const targetSlide = slides[targetIndex];
    moveSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);

    updateArrows(slides, prevButton, nextButton, targetIndex);
}
)

//4 function update arrows button
const updateArrows = (slides, prevButton, nextButton, targetIndex) =>
{
    if (targetIndex===0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length -1)
    {
        nextButton.classList.add('is-hidden');
        prevButton.classList.remove('is-hidden');
    }else{
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}


