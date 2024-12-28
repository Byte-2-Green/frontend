<script>
// https://codepen.io/Anemolo/pen/ERPvZV
// width - padding = min
// padding = max
const padding = 200;
const slidesCount = 3 - 1;
// @ts-ignore
function map(x, in_min, in_max, out_min, out_max)
    {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
document.addEventListener('mousemove', (e)=>{
  // Change to bodywidth
  const wrapper = document.getElementById('wrapper')
  // @ts-ignore
  const rect = wrapper.getBoundingClientRect();
  // Mouse position in between padding
  const mouseX = Math.min(Math.max(e.clientX - padding,0),rect.width - padding * 2);
  const rawPercent = map(mouseX, 0, rect.width - padding * 2, 100 - 100 * slidesCount, 100);
  const percent = Math.round(rawPercent)
  const left = document.getElementById('left');
  const center = document.getElementById('center');
  const right = document.getElementById('right');
  // @ts-ignore
  left.style.transform = `translateX(${percent}%)`;
  // @ts-ignore
  center.style.transform = `translateX(${percent - 100}%)`;
  // @ts-ignore
  right.style.transform = `translateX(${percent - 200}%)`;
  //debug
  const paragraph = document.getElementById('t');
  // @ts-ignore
  paragraph.innerHTML = percent;
})
</script>

<div class='wrapper' id='wrapper'>
    <div class='wrapper-3d'>
      <div class='carousel-wrapper center-3d'>
        <div class='carousel-container' id='center'>
          <div class='slide first'></div>
          <div class='slide second'></div>
          <div class='slide third'></div>
        </div>
        <div class='first image' id='img'></div>
      </div>
      <div class='carousel-wrapper left-3d center-3d'>
        <div class='carousel-container' id='left'>
          <div class='slide first'></div>
          <div class='slide second'></div>
          <div class='slide third'></div>
        </div>
      </div>
      <div class='carousel-wrapper right-3d center-3d'>
        <div class='carousel-container' id='right'>
          <div class='slide first'></div>
          <div class='slide second'></div>
          <div class='slide third'></div>
        </div>
      </div>
    </div>
  </div>
  
  <p class='debug debug-top' id='t'>0</p>
  <p class='debug debug-bot'>
    <br/>
     Move your mouse horizontally
  </p>

<style>
 .wrapper {
	 position: absolute;
	 top: 0;
	 left: 0;
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 width: 100%;
	 height: 100%;
}
 .wrapper-3d {
	 position: relative;
	 perspective: 250px;
	 transform-style: preserve-3d;
}
 .image {
	 height: 175px;
	 width: 300px;
}
 .carousel-wrapper {
	 overflow: hidden;
	 width: 60vw;
	 height: 80vh;
}
 .carousel-container {
	 display: flex;
	 flex-direction: row;
	 width: 100%;
	 height: 100%;
	 transition: all 0.5s ease-out;
}
 .slide {
	 flex-shrink: 0;
	 width: 100%;
	 height: 100%;
}
/* The trick is to position them on their respective side Then set transform-origin to that siede And put desired angle */
 .left-3d {
	 position: absolute;
	 transform-origin: right center;
	 transform: rotateY(100deg);
	 top: 0;
	 bottom: 0;
	 right: calc(100%);
}
 #left {
	 transform: translateX(0%);
}
 #center {
	 transform: translateX(-100%);
}
 .right-3d {
	 position: absolute;
	 transform-origin: left center;
	 transform: rotateY(-100deg);
	 top: 0;
	 bottom: 0;
	 left: calc(100%);
}
 #right {
	 transform: translateX(-200%);
}
 .first, .second, .third {
	 background-size: cover;
}
 .first {
	 background-image: url("https://images.unsplash.com/photo-1492970471430-bc6bd7eb2b13?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9893bc89e46e2b77a5d8c091fbba04e9&auto=format&fit=crop&w=1355&q=80");
}
 .second {
	 background-image: url("https://images.unsplash.com/photo-1501707305551-9b2adda5e527?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0cf5887247e17503ce4e542d00d86b9d&auto=format&fit=crop&w=1335&q=80");
	 background-position-y: 50%;
}
 .third {
	 background-image: url("https://images.unsplash.com/photo-1496749843252-699a989877a1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fe5da9650707e5a93c8c3cf164c2e74b&auto=format&fit=crop&w=1375&q=80");
	 background-position-y: 50%;
}
 .debug {
	 position: absolute;
	 text-align: center;
	 width: 100%;
	 font-size: 1.1em;
	 font-family: sans-serif;
	 letter-spacing: 0.1em;
	 font-weight: 200;
	 margin: 0;
	 margin-top: 10px;
	 color: #fafafa ee;
}
 .debug-top {
	 top: 2vh;
}
 .debug-bot {
	 bottom: 2vh;
}
 @media only screen and (min-width: 1600px) {
	 .right-3d {
		 transform: none;
		 transform: rotateY(-120deg);
	}
	 .left-3d {
		 transform: none;
		 transform: rotateY(120deg);
	}
}
</style>