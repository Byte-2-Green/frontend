<script>
  // @ts-ignore
  export let positionedImages = [];
  // @ts-ignore
  export let onImageClick;

  // @ts-ignore
  let selectedImage = null;
  let isEditMode = false;

  // Function to handle image clicks
  // @ts-ignore
  function handleImageClick(image) {
    if (!isEditMode) {
      // Enter edit mode when an image is clicked
      isEditMode = true;
      selectedImage = image;
      image.classList.add('opacity-50');  // Adding opacity to indicate edit mode
      // @ts-ignore
      if (onImageClick) {
        onImageClick(image);
      }
    } else {
      // If in edit mode, allow the user to move the image
      image.classList.remove('opacity-50');
      // @ts-ignore
      if (onImageClick) {
        onImageClick(image);
      }
      // Reset edit mode after moving
      isEditMode = false;
      selectedImage = null;
    }
  }

  // Function to handle placeholder clicks
  // @ts-ignore
  function handlePlaceholderClick(placeholderId) {
    const placeholder = document.getElementById(`placeholder${placeholderId}`);
    // @ts-ignore
    if (isEditMode && selectedImage) {
      // @ts-ignore
      const existingImage = placeholder.querySelector('img');
      if (existingImage) {
        // If the placeholder already has an image, swap positions
        const currentImage = existingImage;
        // @ts-ignore
        placeholder.appendChild(selectedImage);
        selectedImage.classList.remove('opacity-50');
        currentImage.classList.add('opacity-50');
      } else {
        // If the placeholder is empty, move the selected image there
        // @ts-ignore
        placeholder.appendChild(selectedImage);
        selectedImage.classList.remove('opacity-50');
      }
    }
  }

  // Automatically position images inside placeholders when positionedImages changes
 // @ts-ignore
   $: {
    // @ts-ignore
    positionedImages.forEach(({ src, text }, index) => {
      const placeholder = document.getElementById(`placeholder${index + 1}`);
      if (placeholder && !placeholder.querySelector("img")) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = text;
        img.classList.add(
          "object-cover",
          "w-[75vw]",
          "h-[100%]",
          "rounded-lg",
          "shadow-lg"
        );
        img.onclick = () => handleImageClick(img);  // Adding click handler for each image
        placeholder.appendChild(img);
      }
    });
  }
</script>

<section class="relative overflow-x-auto w-full">
  <div class="relative flex justify-start items-start w-full" style="height: 60vh;">
    <div class="flex justify-start items-start w-max h-full">
      <!-- Column 1 -->
      <section class="relative flex justify-center items-start w-[100vw] h-[60vh] px-2">
        <div class="absolute bottom-0 left-0 right-0 h-[27%] bg-secondary z-0"></div>
        <div class="w-full h-full p-4 rounded-lg relative">
          <div class="flex flex-col w-full h-full">
            <!-- Lamp -->
            <div class="h-[10%] flex justify-center items-center z-10">
              <img src="/images/lamp.png" alt="lamp" class="object-contain w-[90%] h-auto" />
            </div>
            <!-- Placeholder 1 -->
            <div
              class="h-[50%] flex justify-center items-center"
              role="button"
              tabindex="0"
              on:click={() => handlePlaceholderClick(1)}
              on:keydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handlePlaceholderClick(1);
                }
              }}
              aria-label="Placeholder 1"
            >
              <div
                class="w-[75vw] h-[100%] bg-gradient-to-br from-primary-light to-primary relative border-8 border-orange-200 rounded shadow-lg"
                id="placeholder1"
              ></div>
            </div>
            <!-- Rope -->
            <div class="h-[12%] flex justify-center items-center z-0">
              <img src="/images/rope.png" alt="rope" class="object-contain w-[75vw] h-auto" />
            </div>
            <!-- Bench -->
            <div class="h-[18%] flex justify-center items-center">
              <img src="/images/bench.png" alt="bench" class="object-contain w-[90%] h-auto" />
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
              <img src="/images/lamp.png" alt="lamp" class="object-contain w-[90%] h-auto" />
            </div>
            <!-- Placeholder 2 -->
            <div
              class="h-[50%] flex justify-center items-center"
              role="button"
              tabindex="0"
              on:click={() => handlePlaceholderClick(2)}
              on:keydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handlePlaceholderClick(2);
                }
              }}
              aria-label="Placeholder 2"
            >
              <div
                class="w-[75vw] h-[100%] bg-gradient-to-br from-primary-light to-primary relative border-8 border-orange-200 rounded shadow-lg"
                id="placeholder2"
              ></div>
            </div>
            <!-- Rope -->
            <div class="h-[12%] flex justify-center items-center z-0">
              <img src="/images/rope.png" alt="rope" class="object-contain w-[75vw] h-auto" />
            </div>
            <!-- Bench -->
            <div class="h-[18%] flex justify-center items-center">
              <img src="/images/bench.png" alt="bench" class="object-contain w-[90%] h-auto" />
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
              <img src="/images/lamp.png" alt="lamp" class="object-contain w-[90%] h-auto" />
            </div>
            <!-- Placeholder 3 -->
            <div
              class="h-[50%] flex justify-center items-center"
              role="button"
              tabindex="0"
              on:click={() => handlePlaceholderClick(3)}
              on:keydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handlePlaceholderClick(3);
                }
              }}
              aria-label="Placeholder 3"
            >
              <div
                class="w-[75vw] h-[100%] bg-gradient-to-br from-primary-light to-primary relative border-8 border-orange-200 rounded shadow-lg"
                id="placeholder3"
              ></div>
            </div>
            <!-- Rope -->
            <div class="h-[12%] flex justify-center items-center z-0">
              <img src="/images/rope.png" alt="rope" class="object-contain w-[75vw] h-auto" />
            </div>
            <!-- Bench -->
            <div class="h-[18%] flex justify-center items-center">
              <img src="/images/bench.png" alt="bench" class="object-contain w-[90%] h-auto" />
            </div>
          </div>
        </div>
      </section>

      <!-- Column 4 -->
      <section class="relative flex justify-center items-start w-[100vw] h-[60vh] px-2">
        <div class="absolute bottom-0 left-0 right-0 h-[27%] bg-secondary z-0"></div>
        <div class="w-full h-full p-4 rounded-lg relative">
          <div class="flex flex-col w-full h-full">
            <!-- Lamp -->
            <div class="h-[10%] flex justify-center items-center z-10">
              <img src="/images/lamp.png" alt="lamp" class="object-contain w-[90%] h-auto" />
            </div>
            <!-- Placeholder 4 -->
            <div
              class="h-[50%] flex justify-center items-center"
              role="button"
              tabindex="0"
              on:click={() => handlePlaceholderClick(4)}
              on:keydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handlePlaceholderClick(4);
                }
              }}
              aria-label="Placeholder 4"
            >
              <div
                class="w-[75vw] h-[100%] bg-gradient-to-br from-primary-light to-primary relative border-8 border-orange-200 rounded shadow-lg"
                id="placeholder4"
              ></div>
            </div>
            <!-- Rope -->
            <div class="h-[12%] flex justify-center items-center z-0">
              <img src="/images/rope.png" alt="rope" class="object-contain w-[75vw] h-auto" />
            </div>
            <!-- Bench -->
            <div class="h-[18%] flex justify-center items-center">
              <img src="/images/bench.png" alt="bench" class="object-contain w-[90%] h-auto" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</section>
