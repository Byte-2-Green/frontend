<script>
  // @ts-ignore
  import { onMount } from "svelte";

  // @ts-ignore
  export let positionedImages = [];

  // Function to position images inside the selected placeholder
  // @ts-ignore
  function positionImage(src, text) {
    let placeholder;
    let placeholderId;

    do {
      placeholderId = `placeholder${Math.floor(Math.random() * 4) + 1}`;
      placeholder = document.getElementById(placeholderId);
    } while (placeholder && placeholder.querySelector('img'));

    if (placeholder) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = text;
      img.classList.add('object-contain', 'w-full', 'h-full', 'rounded-lg', 'shadow-lg');
      
      placeholder.appendChild(img);
      console.log(`Image added to ${placeholderId}`);
    } else {
      console.log('No empty placeholder found');
    }
  }

   $: {
    // @ts-ignore
    positionedImages.forEach(({ src, text }) => {
      // Ensure image is not already added
      const isImageAlreadyAdded = document.querySelector(`img[src="${src}"]`);
      if (!isImageAlreadyAdded) {
        positionImage(src, text);
      }
    });
  }
</script>

<section class="relative overflow-x-auto w-full">
  <div
    class="relative flex justify-start items-start w-full"
    style="height: 60vh;"
  >
    <div class="flex justify-start items-start w-max h-full">
      <!-- Column 1 -->
      <section
        class="relative flex justify-center items-start w-[100vw] h-[60vh] px-2"
      >
        <div
          class="absolute bottom-0 left-0 right-0 h-[27%] bg-secondary z-0"
        ></div>

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
            <!-- Placeholder 1 -->
            <div class="h-[50%] flex justify-center items-center">
              <div
                class="w-[75vw] h-[100%] bg-gradient-to-br from-primary-light to-primary relative border-8 border-orange-200 rounded shadow-lg"
                id="placeholder1"
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
      <section
        class="relative flex justify-center items-start w-[100vw] h-[60vh] px-2"
      >
        <div
          class="absolute bottom-0 left-0 right-0 h-[27%] bg-secondary z-0"
        ></div>

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
            <!-- Placeholder 2 -->
            <div class="h-[50%] flex justify-center items-center">
              <div
                class="w-[75vw] h-[100%] bg-gradient-to-br from-primary-light to-primary relative border-8 border-orange-200 rounded shadow-lg"
                id="placeholder2"
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
      <section
        class="relative flex justify-center items-start w-[100vw] h-[60vh] px-2"
      >
        <div
          class="absolute bottom-0 left-0 right-0 h-[27%] bg-secondary z-0"
        ></div>

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
            <!-- Placeholder 3 -->
            <div class="h-[50%] flex justify-center items-center">
              <div
                class="w-[75vw] h-[100%] bg-gradient-to-br from-primary-light to-primary relative border-8 border-orange-200 rounded shadow-lg"
                id="placeholder3"
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

      <!-- Column 4 -->
      <section
        class="relative flex justify-center items-start w-[100vw] h-[60vh] px-2"
      >
        <div
          class="absolute bottom-0 left-0 right-0 h-[27%] bg-secondary z-0"
        ></div>

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
            <!-- Placeholder 4 -->
            <div
              class="h-[50%] flex justify-center items-center"
              id="placeholder4"
            >
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
    </div>
  </div>
</section>
