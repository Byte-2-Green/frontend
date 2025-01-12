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
  if (!isEditingGallery) {
    console.warn("Gallery is not in editing mode.");
    return;
  }

  if (!selectedImage) {
    // Select the current image
    selectedImage = image;
    selectedImage.classList.add("opacity-50");
  } else if (selectedImage === image) {
    // Deselect if clicking the same image
    selectedImage.classList.remove("opacity-50");
    selectedImage = null;
    console.log("Deselected Image.");
  } else {
    // Swap logic
    const parentOfSelectedImage = selectedImage.parentElement;
    const parentOfClickedImage = image.parentElement;

    // Placeholder IDs
    const selectedPlaceholderId = parentOfSelectedImage.dataset.placeholderId;
    const clickedPlaceholderId = parentOfClickedImage.dataset.placeholderId;

    // Extract image IDs
    const selectedImageId = selectedImage.dataset.artId;
    const clickedImageId = image.dataset.artId;

    if (!selectedImageId || !clickedImageId) {
      console.error("Art ID is undefined. Ensure images have data-art-id set.");
      return;
    }

    if (!selectedPlaceholderId || !clickedPlaceholderId) {
      console.error(
        "Placeholder ID is undefined. Ensure placeholders have data-placeholder-id set."
      );
      return;
    }

    // Swap images in DOM
    parentOfSelectedImage.appendChild(image);
    parentOfClickedImage.appendChild(selectedImage);

    // Update database for both images
    updateArt(selectedImageId, selectedImage.src, 1, 1, clickedPlaceholderId); // Update selected image
    updateArt(clickedImageId, image.src, 1, 1, selectedPlaceholderId); // Update clicked image

    console.log(
      `Swapped images: Image ${selectedImageId} to Placeholder ${clickedPlaceholderId}, Image ${clickedImageId} to Placeholder ${selectedPlaceholderId}`
    );

    // Reset selection
    selectedImage.classList.remove("opacity-50");
    selectedImage = null;
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
    console.log(placeholder);
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

    // Extract data attributes from the selected image
    const artId = selectedImage.dataset.artId; // Ensure the image element has this data
    const imageUrl = selectedImage.src;
    const userId = 1; // Replace with dynamic user ID if applicable
    const galleryId = 1; // Replace with dynamic gallery ID if applicable

    updateArt(artId, imageUrl, userId, galleryId, placeholderId + 1);
    console.log(`Art ${artId} updated to placeholder ${placeholderId + 1}`);

    selectedImage.classList.remove("opacity-50");
    selectedImage = null;
  }

  async function updateArt(artId, imageUrl, userId, galleryId, placeholderId) {
    try {
      const response = await fetch(`http://localhost:3014/art/${artId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl, userId, galleryId, placeholderId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update art in the database");
      }

      const data = await response.json();
      console.log("Art updated successfully:", data.message);
    } catch (error) {
      console.error("Error updating art:", error);
    }
  }

  // Wait for images to be available before rendering them
  $: if (images && images.length > 0) {
    images.forEach(({ image_url, placeholder_id }, index) => {
      const placeholder = placeholders[placeholder_id - 1];
      if (placeholder && !placeholder.querySelector("img")) {
        const img = document.createElement("img");
        img.dataset.artId = index + 1;
        img.src = image_url;
        img.alt = `Art image ${index}`;
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

  onMount(() => {
    if (images) {
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
  });
</script>

<section class="mt-6 grid grid-cols-2 gap-3 px-6 z-5">
  {#each Array(unlockedFrames) as _, index}
    <article
      class="relative flex flex-col bg-black text-white rounded-lg shadow-xl overflow-hidden w-full h-[30vh]"
    >
      <!-- Placeholder -->
      <div class="relative z-10 flex justify-center items-center h-full">
        <div
          class="w-full h-full bg-gradient-to-b from-primary to-moody-dark opacity-70 rounded-xl shadow-lg"
          role="button"
          tabindex="0"
          on:click={() => handlePlaceholderClick(index + 1)}
          on:keydown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handlePlaceholderClick(index + 1);
            }
          }}
          aria-label={`Placeholder ${index + 1}`}
          bind:this={placeholders[index]}
          id={`placeholder${index + 1}`}
        ></div>
      </div>
    </article>
  {/each}
</section>
