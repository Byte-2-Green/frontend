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

<!--One line-->
<!-- <section class="relative overflow-x-auto mt-6 ">
  <div class="flex items-center space-x-4 h-max w-[400vw]">
    {#each Array(numFrames) as _, index}
      <article class="relative">
        <img
          src="images/frame.png"
          alt={`Frame ${index + 1}`}
          class="transition-all duration-700 ease-in-out z-10"
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
</section> -->

<section class="mt-6 grid grid-cols-1 gap-8 px-6 z-5">
  {#each Array(numFrames) as _, index}
    <article class="relative flex flex-col bg-black text-white rounded-lg shadow-xl overflow-hidden w-full h-[40vh]">
      
      <!-- Placeholder Background for Empty/No Image -->
      <div class="absolute inset-0 bg-gradient-to-b from-gray-800 to-black transition-all duration-700 ease-in-out">
        <div class="bg-black opacity-80 absolute inset-0"></div>
      </div>

      <!-- Image or Placeholder Background -->
      <div class="relative z-10 flex justify-center items-center h-full">
        <!-- No Image: Just a colored background for a museum vibe -->
        <div class="w-[110%] h-[110%] bg-gradient-to-b from-gray-900 to-gray-700 opacity-70 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500 ease-in-out"></div>
      </div>

      <!-- Subtle Hover Effects to Enhance Museum Aesthetic -->
      <div class="absolute inset-0 z-10 flex justify-center items-center">
        <div class="w-[80%] h-[80%] bg-gradient-to-b from-black opacity-70 rounded-lg transform rotate-[5deg] hover:bg-gray-800 transition-all duration-500 ease-in-out">
        </div>
      </div>
    </article>
  {/each}
</section>



<!--Tilted columns-->
<!-- <section class="ml-6 space-x-4 grid-cols-6 overflow-x-auto grid w-full">
  {#each Array(numFrames) as _, index}
  <article class="relative flex flex-col justify-between bg-white bg-cover text-gray-800 overflow-hidden cursor-pointer w-full object-cover object-center rounded-lg shadow-md h-64 my-2"
    style="background-image:url('https://images.unsplash.com/reserve/8T8J12VQxyqCiQFGa2ct_bahamas-atlantis.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80')">
    <div class="relative flex flex-row items-end  h-72 w-full ">
      <div class="p-6 rounded-lg  flex flex-col w-full z-10 ">
        <h4 class="mt-1 text-white text-xl font-semibold  leading-tight truncate">Loremipsum..
        </h4>
        <div class="flex justify-between items-center ">
          <div class="flex flex-col">
            <h2 class="text-sm flex items-center text-gray-300 font-normal">
              Dubai
            </h2>
          </div>
        </div>
        <div class="flex pt-4  text-sm text-gray-300">
          <div class="flex items-center mr-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500 mr-1"
              viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
              </path>
            </svg>
            <p class="font-normal">4.5</p>
          </div>
          <div class="flex items-center font-medium text-white ">
            10 minutes
          </div>
        </div>
      </div>
    </div>
  </article>
  {/each}
</section> -->

<!-- <section class="mt-6">
  <div class="grid grid-cols-2 gap-4 p-3">
    {#each Array(numFrames) as _, index}
      <article class="relative">
        <img
          src="images/frame.png"
          alt={`Frame ${index + 1}`}
          class="transition-all duration-700 ease-in-out z-10 transform {index % 2 === 0 ? '' : '-'}rotate-2"
          style="
            width: ${frameWidth * 1.5}px;
            height: ${frameHeight * 1.5}px;
            object-fit: cover;
          "
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
            class="w-[30vw] h-[73%] border-2 border-black rounded-xl transform {index % 2 === 0 ? '' : '-'}rotate-2"
            id={`placeholder${index}`}
          ></div>
        </div>
      </article>
    {/each}
  </div>
</section> -->

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
