<script>
  export let positionedImages = [];
  export let isEditingGallery = false;
</script>

<section class="relative overflow-x-auto w-full">
  <div
    class="relative flex justify-start items-start w-full"
    style="height: 60vh;"
  >
    <div class="flex justify-start items-start w-max h-full">
      <!-- Column 1 -->
      <section class="relative flex justify-center items-start w-[100vw] h-[60vh] px-2">
        <div class="absolute bottom-0 left-0 right-0 h-[27%] bg-secondary z-0"></div>

        <div class="w-full h-full p-4 rounded-lg relative">
          <div class="flex flex-col w-full h-full">
            <!-- Lamp -->
            <div class="h-[10%] flex justify-center items-center z-10">
              <img
                src="/images/lamp.png"
                alt="lamp"
                class="object-contain w-[90%] h-auto"
              />
            </div>
            <!-- Image -->
            <div class="h-[50%] flex justify-center items-center">
              <div
                class="w-[75vw] h-[100%] bg-gradient-to-br from-primary-light to-primary relative border-8 border-orange-200 rounded shadow-lg"
              ></div>
            </div>
            <!-- Rope -->
            <div class="h-[12%] flex justify-center items-center z-0">
              <img
                src="/images/rope.png"
                alt="rope"
                class="object-contain w-[75vw] h-auto"
              />
            </div>
            <!-- Bench -->
            <div class="h-[18%] flex justify-center items-center">
              <img
                src="/images/bench.png"
                alt="bench"
                class="object-contain w-[90%] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Column 2 -->
      <section class="relative flex justify-center items-start w-[100vw] h-[60vh] px-2">
        <div class="absolute bottom-0 left-0 right-0 h-[27%] bg-secondary z-0"></div>

        <div class="w-full h-full p-4 rounded-lg relative">
          <div class="flex flex-col w-full h-full">
            <!-- Lamp -->
            <div class="h-[10%] flex justify-center items-center z-10">
              <img
                src="/images/lamp.png"
                alt="lamp"
                class="object-contain w-[90%] h-auto"
              />
            </div>
            <!-- Image -->
            <div class="h-[50%] flex justify-center items-center">
              <div
                class="w-[75vw] h-[100%] bg-gradient-to-br from-primary-light to-primary relative border-8 border-orange-200 rounded shadow-lg"
              ></div>
            </div>
            <!-- Rope -->
            <div class="h-[12%] flex justify-center items-center z-0">
              <img
                src="/images/rope.png"
                alt="rope"
                class="object-contain w-[75vw] h-auto"
              />
            </div>
            <!-- Bench -->
            <div class="h-[18%] flex justify-center items-center">
              <img
                src="/images/bench.png"
                alt="bench"
                class="object-contain w-[90%] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Column 3 -->
      <section class="relative flex justify-center items-start w-[100vw] h-[60vh] px-2">
        
        <div class="absolute bottom-0 left-0 right-0 h-[27%] bg-secondary z-0"></div>

        <div class="w-full h-full p-4 rounded-lg relative">
          <div class="flex flex-col w-full h-full">
            <!-- Lamp -->
            <div class="h-[10%] flex justify-center items-center z-10">
              <img
                src="/images/lamp.png"
                alt="lamp"
                class="object-contain w-[90%] h-auto"
              />
            </div>
            <!-- Images -->
            <div class="pt-6 h-[50%] flex justify-center items-center flex-col">
              <div
                class="w-[75vw] h-[50%] bg-gradient-to-br from-primary-light to-primary border-8 border-orange-200 rounded shadow-lg"
              ></div>
              <div
                class="w-[75vw] h-[50%] bg-gradient-to-br from-primary-light to-primary border-8 border-orange-200 rounded shadow-lg mt-4"
              ></div>
            </div>
            <!-- Rope -->
            <div class="h-[12%] flex justify-center items-center z-0">
              <img
                src="/images/rope.png"
                alt="rope"
                class="object-contain w-[75vw] h-auto"
              />
            </div>
            <!-- Bench -->
            <div class="h-[18%] flex justify-center items-center">
              <img
                src="/images/bench.png"
                alt="bench"
                class="object-contain w-[90%] h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- Positioned Gallery Images -->
  {#each positionedImages as { src, text, position }}
    <div
      class="absolute {isEditingGallery
        ? 'border-2 border-yellow-500 shadow-lg'
        : ''}"
      style="top: {position.top}; left: {position.left}; width: {position.width}; height: {position.height}; z-index: 10;"
    >
      <img {src} alt="Gallery" class="object-cover w-full h-full rounded-md" />
      <div
        class="absolute text-white font-bold text-sm top-full left-0 transform translate-x-[-50%]"
      >
        {text}
      </div>
    </div>
  {/each}
</section>
