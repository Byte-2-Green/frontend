<script>
  import Header from "../components/Header.svelte";
  import StatsPanel from "../components/StatsPanel.svelte";
  import Gallery from "../components/Gallery.svelte";
  import Footer from "../components/Footer.svelte";
  import { onMount } from "svelte";
  import "../app.css";

  let showModal = true;
  let infographicUrl = "";
  export const foodForThought = [];
  let randomThought = null;

  // Image and placeholder handling
  let unlockedFrames = 4;
  let savedCO2 = 0.5;

  let galleryImages = [
    { src: "/images/template1.png", text: "Artwork 1" },
    { src: "/images/template2.png", text: "Artwork 2" },
  ];

  // Fixed stone placeholders with starting points and fixed width/height
  const placeholders = [
    { top: "125px", left: "65px", width: "125px", height: "180px" },
    { top: "165px", left: "320px", width: "150px", height: "100px" },
    { top: "125px", left: "610px", width: "90px", height: "90px" },
    { top: "250px", left: "620px", width: "70px", height: "70px" },
  ];

  // Array to store positioned images
  let positionedImages = [];

  // Add an image to the gallery (placeholder)
  function addImageToGallery() {
    if (galleryImages.length > 0 && placeholders.length > 0) {
      const randomImageIndex = Math.floor(Math.random() * galleryImages.length);
      const randomPlaceholderIndex = Math.floor(Math.random() * placeholders.length);
      const selectedImage = galleryImages[randomImageIndex];
      const selectedPlaceholder = placeholders[randomPlaceholderIndex];

      positionedImages = [
        ...positionedImages,
        {
          ...selectedImage,
          position: selectedPlaceholder,
        },
      ];

      galleryImages.splice(randomImageIndex, 1); // Remove the added image from the gallery
    }
  }

  // Toggle the edit mode to allow randomizing image positions
  let isEditingGallery = false;

  function toggleEditMode() {
    isEditingGallery = !isEditingGallery;
  }

  // Randomize images within placeholders
  function randomizeImages() {
    positionedImages = positionedImages.map(image => {
      const randomPlaceholderIndex = Math.floor(Math.random() * placeholders.length);
      const newPosition = placeholders[randomPlaceholderIndex];
      return { ...image, position: newPosition };
    });
  }

  // Fetch random facts (modal behavior)
  onMount(async () => {
    try {
      const res = await fetch(`http://localhost:3011/foodForThought`);
      const data = await res.json();
      if (data.length > 0) {
        randomThought = data[Math.floor(Math.random() * data.length)];
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  });

  function closeModal() {
    showModal = false;
  }

  // Stats panel calculations
  savedCO2 = 0.5 * positionedImages.length;
</script>

<section class="flex flex-col h-screen bg-secondary-light">
  <Header />
  <main class="flex-1 overflow-y-auto">
    <StatsPanel {unlockedFrames} {savedCO2} />
    <button on:click={addImageToGallery} class="m-4 px-6 py-3 bg-secondary-dark text-white font-semibold rounded transition-all">
      Add Image
    </button>

    <!-- Edit Mode Toggle Button -->
    <button on:click={toggleEditMode} class="m-4 px-6 py-3 bg-secondary-dark text-white font-semibold rounded transition-all">
      {isEditingGallery ? 'End Edit Mode' : 'Edit Gallery'}
    </button>

    {#if isEditingGallery}
      <button on:click={randomizeImages} class="m-4 px-6 py-3 bg-secondary-dark text-white font-semibold rounded transition-all">
        Randomize Image Positions
      </button>
    {/if}

    <Gallery {positionedImages} {placeholders} {isEditingGallery} />

    <!-- Modal -->
    {#if showModal}
      <section class="fixed inset-0 bg-black bg-opacity-50 z-50">
        <article class="bg-secondary-light text-secondary-dark rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center relative">
          <button on:click={closeModal} class="absolute top-4 right-4 text-secondary-dark">
            ✖
          </button>
          {#if randomThought}
            <div class="flex justify-center mb-4 ml-4">
              <i class="{randomThought.Icon} w-20 h-20 text-6xl"></i>
            </div>
            <h2 class="text-center text-4xl font-bold mb-6">Did you know?</h2>
            <p>{randomThought.Description}</p>
          {:else}
            <p>Loading...</p>
          {/if}
        </article>
      </section>
    {/if}
  </main>
  <Footer />
</section>
