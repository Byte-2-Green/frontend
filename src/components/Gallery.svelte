<script>
  // @ts-nocheck
  // @ts-ignore

  import StatsPanel from "../components/StatsPanel.svelte";
  import { positionedImages } from "../routes/store.js";
  import { onMount } from "svelte";

  let images;
  positionedImages.subscribe((value) => {
    images = value;
  });

  export let isEditingGallery;
  export let unlockedFrames;

  let selectedImage = null;

  let frameWidth = 350;
  let frameHeight = 400;

  let placeholders = [];

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

  // Wait for images to be available before rendering them
  $: if (images && images.length > 0) {
    images.forEach(({ image_url, placeholder_id }, index) => {
      const placeholder = placeholders[placeholder_id - 1];
      if (placeholder && !placeholder.querySelector("img")) {
        const img = document.createElement("img");
        img.src = image_url;
        img.alt = `Art image ${index}`;
        img.classList.add("object-cover", "w-[75vw]", "h-[100%]", "rounded-lg", "shadow-lg");
        img.onclick = (event) => {
          event.stopPropagation();
          handleImageClick(img);
        };
        placeholder.appendChild(img);
      }
    });
  }

  onMount(() => {
    if (images) {
      console.log(images);
      images.forEach(({ image_url, placeholder_id }, index) => {
        const placeholder = placeholders[placeholder_id - 1];
        if (placeholder && !placeholder.querySelector("img")) {
          const img = document.createElement("img");
          img.src = image_url;
          img.alt = `Art image ${index}`;
          img.classList.add(
            "object-cover",
            "w-[75vw]",
            "h-[100%]",
            "rounded-lg",
            "shadow-lg"
          );
          img.onclick = (event) => {
            event.stopPropagation();
            handleImageClick(img);
          };
          placeholder.appendChild(img);
        }
      });
    }
  });
</script>

<section class="mt-6 grid grid-cols-2 gap-3 px-6 z-5">
  {#each Array(unlockedFrames) as _, index}
    <article
      class="relative flex flex-col bg-black text-white rounded-lg shadow-xl overflow-hidden w-full h-[30vh]">
      <!-- Placeholder -->
      <div class="relative z-10 flex justify-center items-center h-full">
        <div
          class="w-full h-full bg-gradient-to-b from-primary to-moody-dark opacity-70 rounded-xl shadow-lg"
          role="button"
          tabindex="0"
          on:click={() => handlePlaceholderClick(index)}
          on:keydown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handlePlaceholderClick(index);
            }
          }}
          aria-label={`Placeholder ${index}`}
          bind:this={placeholders[index]}
          id="placeholder${index}"
        ></div>
      </div>
    </article>
  {/each}
</section>
