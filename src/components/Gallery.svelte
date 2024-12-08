<script>
  export let positionedImages = [];
  // export let placeholders = [];
  export let isEditingGallery = false;
</script>

<section class="relative overflow-x-auto w-full mt-5">
  <div class="relative flex justify-center items-center w-full">
    <div class="flex justify-center items-center w-[200vw] z-0">
      <section
        class="bg-gradient-to-b from-secondary-light to-secondary flex justify-center items-center"
      >
        <div class="w-[1200px] p-16 rounded-lg relative">
          <!-- Lamps -->
          <div class="absolute top-0 left-20">
            <img
              src="/images/lamp.png"
              alt="lamp"
              class="object-contain w-[15%] h-auto"
            />
          </div>
          <div class="absolute top-0 left-[460px]">
            <img
              src="/images/lamp.png"
              alt="lamp"
              class="object-contain w-[15%] h-auto"
            />
          </div>
          <div class="absolute top-0 left-[880px]">
            <img
              src="/images/lamp.png"
              alt="lamp"
              class="object-contain w-[15%] h-auto"
            />
          </div>

          <!-- Wall Columns -->
          <div class="grid grid-cols-3 gap-12 mt-16">
            <!-- Column 1 -->
            <div class="flex flex-col items-center">
              <!-- Artwork -->
              <div
                class="w-[180px] h-[260px] bg-gradient-to-br from-orange-400 via-orange-300 to-orange-500 relative border-8 border-orange-200 rounded shadow-lg"
              ></div>
              <!-- Rope Divider -->
              <div class="flex items-center space-x-2 mt-8">
                <img
                  src="/images/rope.png"
                  alt="rope"
                  class="object-contain w-[55%] h-auto"
                />
              </div>
            </div>

            <!-- Column 2 -->
            <div class="flex flex-col items-center">
              <!-- Artwork -->
              <div
                class="w-[240px] h-[180px] bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 relative border-8 border-orange-200 rounded shadow-lg"
              ></div>
              <!-- Rope Divider -->
              <div class="flex items-center space-x-2 mt-8">
                <img
                  src="/images/rope.png"
                  alt="rope"
                  class="object-contain w-[55%] h-auto"
                />
              </div>
            </div>

            <!-- Column 3 -->
            <div class="flex flex-col items-center space-y-8">
              <!-- Top Artwork -->
              <div
                class="w-[140px] h-[140px] bg-gradient-to-br from-blue-500 to-blue-300 relative border-8 border-orange-200 rounded shadow-lg"
              ></div>
              <!-- Bottom Artwork -->
              <div
                class="w-[140px] h-[140px] bg-gradient-to-br from-red-500 to-red-300 relative border-8 border-orange-200 rounded shadow-lg"
              ></div>
              <!-- Rope Divider -->
              <div class="flex items-center space-x-2">
                <img
                  src="/images/rope.png"
                  alt="rope"
                  class="object-contain w-[55%] h-auto"
                />
              </div>
            </div>
          </div>

          <!-- Benches -->
          <div class="flex justify-between items-center mt-16 px-12">
            <div class="w-[140px] h-[30px]">
              <img
                src="/images/bench.png"
                alt="rope"
                class="object-contain w-[55%] h-auto"
              />
            </div>
            <div class="w-[140px] h-[30px]">
              <img
                src="/images/bench.png"
                alt="rope"
                class="object-contain w-[55%] h-auto"
              />
            </div>
          </div>
          <!-- <img src="/images/gallery.png" alt="Gallery" class="object-contain" /> -->
        </div>
      </section>
    </div>

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
  </div>
</section>
