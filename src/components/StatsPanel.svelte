<script>
  export let unlockedFrames;
  export let savedCO2;
</script>

<section class="flex flex-row gap-3 mx-4">
  <!-- Unlocked Frames -->
  <article class="bg-primary text-black p-3 rounded-lg shadow-sm w-1/2">
    <div class="flex items-start gap-4">
      <!-- Frames Icon -->
      <div class="w-14 h-14 flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="40"
          height="60"
          viewBox="0,0,300,350"
        >
          <g
            fill="#000000"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
            ><g transform="scale(5.12,5.12)"
              ><path
                d="M22.78125,0c-1.17578,-0.00391 -2.375,0.16406 -3.5625,0.53125c-6.31641,1.96094 -9.92969,8.73828 -7.96875,15.0625v0.0625c0.25781,0.71094 0.94922,2.96094 1.375,4.34375h-3.625c-1.64453,0 -3,1.35547 -3,3v24c0,1.64453 1.35547,3 3,3h32c1.64453,0 3,-1.35547 3,-3v-24c0,-1.64453 -1.35547,-3 -3,-3h-26.25c-0.30859,-0.99219 -1.23828,-3.92578 -1.625,-5h0.03125c-1.63672,-5.27734 1.34375,-10.89062 6.625,-12.53125c5.26953,-1.63672 10.91406,1.32813 12.5625,6.59375c0,0.00391 0,0.02734 0,0.03125c0.22656,0.79297 1.3125,4.3125 1.3125,4.3125c0.08984,0.35938 0.37109,0.64453 0.73047,0.73047c0.36328,0.08984 0.74219,-0.02734 0.98828,-0.30469c0.24609,-0.28125 0.32031,-0.67187 0.1875,-1.01953c0,0 -1.12891,-3.64062 -1.3125,-4.28125v-0.03125c-1.46875,-4.73828 -5.64844,-7.95703 -10.3125,-8.4375c-0.38672,-0.03906 -0.76562,-0.0625 -1.15625,-0.0625zM9,22h32c0.55469,0 1,0.44531 1,1v24c0,0.55469 -0.44531,1 -1,1h-32c-0.55469,0 -1,-0.44531 -1,-1v-24c0,-0.55469 0.44531,-1 1,-1zM25,30c-1.69922,0 -3,1.30078 -3,3c0,0.89844 0.39844,1.6875 1,2.1875v2.8125c0,1.10156 0.89844,2 2,2c1.10156,0 2,-0.89844 2,-2v-2.8125c0.60156,-0.5 1,-1.28906 1,-2.1875c0,-1.69922 -1.30078,-3 -3,-3z"
              ></path></g
            ></g
          >
        </svg>
      </div>
      <div>
        <p class="text-lg">Unlocked</p>
      </div>
    </div>
    <div class="mt-4">
      <h2 class="text-3xl font-bold">{unlockedFrames} frames</h2>
    </div>
  </article>

  <!-- Saved CO2 -->
  <article
    class="bg-primary text-black p-3 rounded-lg shadow-sm w-1/2"
  >
    <div class="flex items-start gap-4">
      <!-- CO2 Icon -->
      <div class="w-14 h-14 flex justify-center items-center">
        <img
          width="40"
          height="30"
          src="https://img.icons8.com/ios/50/co2.png"
          alt="co2"
        />
      </div>
      <div>
        <p class="text-lg">Saved CO₂</p>
      </div>
    </div>
    <div class="mt-4">
      <h2 class="text-3xl font-bold">{savedCO2}kg</h2>
      <p class="text-xs">*0.5kg more than last week</p>
    </div>
  </article>
</section>
