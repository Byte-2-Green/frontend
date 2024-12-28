<script>
  // @ts-ignore
  export let positionedImages = [];
  // @ts-ignore
  export let isEditingGallery;

  // @ts-ignore
  let selectedImage = null;

  // Handles image selection
  // @ts-ignore
  function handleImageClick(image) {
    // @ts-ignore
    if (isEditingGallery) {
      // @ts-ignore
      if (!selectedImage) {
        selectedImage = image;
        selectedImage.classList.add("opacity-50");
        console.log("Selected Image:", selectedImage);
      } else if (selectedImage === image) {
        selectedImage.classList.remove("opacity-50");
        selectedImage = null;
        console.log("Deselected Image.");
      } else {
        const parentOfSelectedImage = selectedImage.parentElement;
        const parentOfClickedImage = image.parentElement;
        parentOfSelectedImage.appendChild(image);
        parentOfClickedImage.appendChild(selectedImage);

        console.log("Swapped images:", selectedImage, image);

        selectedImage.classList.remove("opacity-50");
        selectedImage = null;
      }
    } else {
      console.warn("Gallery is not in editing mode.");
    }
  }

  // Handles placeholder clicks to move or swap images
  // @ts-ignore
  function handlePlaceholderClick(placeholderId) {
    // @ts-ignore
    if (!isEditingGallery) {
      console.warn("Gallery is not in editing mode.");
      return;
    }

    // @ts-ignore
    if (!selectedImage) {
      console.warn("No image selected to move!");
      return;
    }

    const placeholder = document.getElementById(`placeholder${placeholderId}`);
    if (!placeholder) {
      console.error(`Placeholder with ID ${placeholderId} not found.`);
      return;
    }

    const currentImage = placeholder.querySelector("img");

    if (currentImage) {
      const parentOfSelectedImage = selectedImage.parentElement;
      parentOfSelectedImage.appendChild(currentImage);
      console.log("Swapped images.");
    } else {
      console.log("Moved selected image to an empty placeholder.");
    }

    placeholder.appendChild(selectedImage);

    selectedImage.classList.remove("opacity-50");
    selectedImage = null;
  }

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
          "shadow-lg",
        );
        img.onclick = (event) => {
          event.stopPropagation();
          handleImageClick(img);
        };
        placeholder.appendChild(img);
      }
    });
  }
</script>

<section class="relative overflow-x-auto w-full">
  <div
    class="relative flex justify-start items-start w-full"
    style="height: 40vh;"
  >
    <div class="flex justify-start items-start w-max h-full">
      {#each [1, 2, 3, 4] as column}
        <section
          class="relative flex justify-center items-start w-[80vw] h-[60vh] px-2"
        >
          <!-- <div
            class="absolute bottom-0 left-0 right-0 h-[27%] bg-primary z-0"
          ></div> -->
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
              <!-- Placeholder -->
              <div
                class="h-[50%] flex justify-center items-center"
                role="button"
                tabindex="0"
                on:click={() => handlePlaceholderClick(column)}
                on:keydown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handlePlaceholderClick(column);
                  }
                }}
                aria-label={`Placeholder ${column}`}
              >
                <div
                  class="w-[75vw] h-[100%] bg-gradient-to-br from-primary-light to-primary relative border-8 border-orange-200 rounded shadow-lg"
                  id={`placeholder${column}`}
                ></div>
              </div>

              <!-- Rope -->
              <!-- <div class="h-[12%] flex justify-center items-center z-0">
                <img
                  src="/images/rope.png"
                  alt="rope"
                  class="object-contain w-[75vw] h-auto"
                />
              </div> -->

              <!-- Bench -->
              <!-- <div class="h-[18%] flex justify-center items-center">
                <img
                  src="/images/bench.png"
                  alt="bench"
                  class="object-contain w-[90%] h-auto"
                />
              </div> -->
            </div>
          </div>
        </section>
      {/each}
    </div>
  </div>
</section>
