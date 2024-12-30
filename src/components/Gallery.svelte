<script>
  // @ts-nocheck
  // @ts-ignore

  import StatsPanel from "../components/StatsPanel.svelte";

  export let positionedImages = [];
  export let isEditingGallery;

  let selectedImage = null;

  let numFrames = 5;
  let frameWidth = 350;
  let frameHeight = 400;

  // Handles image selection
  function handleImageClick(image) {
    if (isEditingGallery) {
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
  function handlePlaceholderClick(placeholderId) {
    if (!isEditingGallery) {
      console.warn("Gallery is not in editing mode.");
      return;
    }

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

      const lamps = document.querySelectorAll("#lamp");
      const placeholders = document.querySelectorAll("[id^='placeholder']");
      placeholders.forEach((placeholder, index) => {
        const lamp = lamps[index];

        if (placeholder.querySelector("img")) {
          lamp?.classList.remove("filter", "grayscale", "opacity-50");
        } else {
          lamp?.classList.add("filter", "grayscale", "opacity-50");
        }
      });
    });
  }
</script>

<section class="relative overflow-x-auto mt-6">
  <div class="flex items-center space-x-4 h-max w-[400vw]">
    {#each Array(numFrames) as _, index}
      <article class="relative">
        <img
          src="images/frame.png"
          alt={`Frame ${index + 1}`}
          class="transition-all duration-500 ease-in-out z-10"
          style="
            width: ${frameWidth * 1.5}px; /* Increase the frame width */
            height: ${frameHeight * 1.5}px; /* Increase the frame height */
            object-fit: cover;"
        />

        <div
          class="absolute inset-0 flex justify-center items-center z-3"
          role="button"
          tabindex="0"
          on:click={() => handlePlaceholderClick(index)}
          on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handlePlaceholderClick(index);
            }
          }}
          aria-label={`Placeholder ${index}`}
        >
          <div
            class="w-[50vw] h-[73%]"
            id={`placeholder${index}`}
          ></div>
        </div>
      </article>
    {/each}
  </div>
</section>


<StatsPanel />
<!--
<section class="relative overflow-x-auto w-full">
  <div
    class="relative flex justify-start items-start w-full"
    style="height: 37vh;"
  >
    <div class="flex justify-start items-start w-max h-full">
      {#each [1, 2, 3, 4] as column}
        <section
          class="relative flex justify-center items-start w-[80vw] h-[60vh] px-2"
        >
          <div class="w-full h-full p-4 rounded-lg relative">
            <div class="flex flex-col w-full h-full">
              
              <div class="h-[10%] flex justify-center items-center z-10">
                <img
                  src="/images/lamp.png"
                  alt="lamp"
                  id="lamp"
                  class="object-contain w-[90%] h-auto filter grayscale opacity-50"
                />
              </div>
              
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
                  class="w-[75vw] h-[100%] bg-gradient-to-br from-moody-light to-moody-darkrelative border-8 border-orange-200 rounded shadow-lg"
                  id={`placeholder${column}`}
                ></div>
              </div>
            </div>
          </div>
        </section>
      {/each}
    </div>
  </div>
</section>
-->
