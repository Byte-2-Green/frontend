<script>
  export let positionedImages = [];
  export let isEditingGallery = false;
</script>

<section class="relative overflow-x-auto w-full mt-5">
  <div class="relative flex justify-start items-start w-full" style="height: 57vh;">
    <div class="flex justify-start items-start w-max h-full">
      <!-- Column 1 -->
      <section class="flex justify-center items-start w-[100vw] h-[50vh] px-2">
        <div class="w-full h-full p-4 rounded-lg relative">
          <div class="flex flex-col w-full h-full">
            <!-- Lamp -->
            <div class="h-[10%] flex justify-center items-center">
              <img src="/images/lamp.png" alt="lamp" class="object-contain w-[90%] h-auto" />
            </div>
            <!-- Image -->
            <div class="h-[50%] flex justify-center items-center">
              <div class="w-[75vw] h-[100%] bg-gradient-to-br from-orange-400 via-orange-300 to-orange-500 relative border-8 border-orange-200 rounded shadow-lg"></div>
            </div>
            <!-- Rope -->
            <div class="h-[20%] flex justify-center items-center z-0">
              <img src="/images/rope.png" alt="rope" class="object-contain w-[75vw] h-auto" />
            </div>
            <!-- Bench -->
            <div class="h-[20%] flex justify-center items-center">
              <img src="/images/bench.png" alt="bench" class="object-contain w-[90%] h-auto" />
            </div>
          </div>
        </div>
      </section>

      <!-- Column 2 -->
      <section class="flex justify-center items-start w-[100vw] h-[50vh] px-2">
        <div class="w-full h-full p-4 rounded-lg relative">
          <div class="flex flex-col w-full h-full">
            <!-- Lamp -->
            <div class="h-[10%] flex justify-center items-center">
              <img src="/images/lamp.png" alt="lamp" class="object-contain w-[90%] h-auto" />
            </div>
            <!-- Image -->
            <div class="h-[50%] flex justify-center items-center">
              <div class="w-[75vw] h-[100%] bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 relative border-8 border-orange-200 rounded shadow-lg"></div>
            </div>
            <!-- Rope -->
            <div class="h-[20%] flex justify-center items-center z-0">
              <img src="/images/rope.png" alt="rope" class="object-contain w-[75vw] h-auto" />
            </div>
            <!-- Bench -->
            <div class="h-[20%] flex justify-center items-center">
              <img src="/images/bench.png" alt="bench" class="object-contain w-[90%] h-auto" />
            </div>
          </div>
        </div>
      </section>

      <!-- Column 3 -->
      <section class="flex justify-center items-start w-[100vw] h-[50vh] px-2">
        <div class="w-full h-full p-4 rounded-lg relative">
          <div class="flex flex-col w-full h-full">
            <!-- Lamp -->
            <div class="h-[10%] flex justify-center items-center">
              <img src="/images/lamp.png" alt="lamp" class="object-contain w-[90%] h-auto" />
            </div>
            <!-- Images -->
            <div class="h-[50%] flex justify-center items-center flex-col">
              <div class="w-[75vw] h-[50%] bg-gradient-to-br from-blue-500 to-blue-300 relative border-8 border-orange-200 rounded shadow-lg"></div>
              <div class="w-[75vw] h-[50%] bg-gradient-to-br from-red-500 to-red-300 relative border-8 border-orange-200 rounded shadow-lg mt-4"></div>
            </div>
            <!-- Rope -->
            <div class="h-[20%] flex justify-center items-center z-0">
              <img src="/images/rope.png" alt="rope" class="object-contain w-[75vw] h-auto" />
            </div>
            <!-- Bench -->
            <div class="h-[20%] flex justify-center items-center">
              <img src="/images/bench.png" alt="bench" class="object-contain w-[90%] h-auto" />
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
      <img
        {src}
        alt="Gallery"
        class="object-cover w-full h-full rounded-md"
      />
      <div
        class="absolute text-white font-bold text-sm top-full left-0 transform translate-x-[-50%]"
      >
        {text}
      </div>
    </div>
  {/each}
</section>
