<script>
  // @ts-nocheck
  // @ts-ignore

  import Header from "../../components/Header.svelte";
  import Gallery from "../../components/Gallery.svelte";
  import Footer from "../../components/Footer.svelte";
  import "../../app.css";
  import { onMount } from "svelte";
  import StatsPanel from "../../components/StatsPanel.svelte";

  let galleryImages = [
    { src: "/images/template1.png", text: "Artwork 1" },
    { src: "/images/template2.png", text: "Artwork 2" },
  ];

  let isEditingGallery = false;
  let unlockedFrames = 0;

  /**
   * @type {string | any[]}
   */
  let positionedImages = [];

  function goToChallenges() {
    window.location.href = "/challenges";
  }

  function addImageToGallery() {
    if (galleryImages.length > 0) {
      const randomImageIndex = Math.floor(Math.random() * galleryImages.length);
      const selectedImage = galleryImages[randomImageIndex];
      positionedImages = [...positionedImages, { ...selectedImage }];
      galleryImages.splice(randomImageIndex, 1);
    }
  }

  function toggleEditMode() {
    isEditingGallery = !isEditingGallery;
  }

  /**
   * @param {string | any[]} updatedImages
   */
  function updateGallery(updatedImages) {
    positionedImages = updatedImages;
    savedCO2 = 0.5 * positionedImages.length;
  }

  let fovElement;

  onMount(() => {
    loadGallery();

    fovElement = document.getElementById("fov");
    document.body.style.cursor = "none";

    // Update FOV position on mouse movement
    const handleMouseMove = (e) => {
    if (fovElement) {
      const { clientX, clientY } = e;

      fovElement.style.left = `${clientX - fovElement.width / 2}px`;
      fovElement.style.top = `${clientY - fovElement.height / 2}px`;
      fovElement.style.transform = "scale(10)";
    }
  };

    document.addEventListener("mousemove", handleMouseMove);

    document.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      handleMouseMove({
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
    });
  });

  //Fetch the gallery
  async function loadGallery() {
  try {
    const response = await fetch('http://localhost:3014/gallery/1');
    const data = await response.json();

    const galleryContainer = document.getElementById('gallery-container');

    unlockedFrames = data.unlocked_frames;
  } catch (error) {
    console.error('Failed to load gallery:', error);
  }
}

</script>

<img
      ref={fovElement}
      src="/images/FOV.png"
      id="fov"
      alt="Field of View"
      class="absolute pointer-events-none overflow-hidden"
      style="z-index: 15"
    />

<section class="flex flex-col h-screen bg-white">
  <Header />
  <!-- <div class="absolute top-0 left-0 h-[40%]">
      <img 
        src="images/ornaments.jpg" 
        alt="Ornaments" 
        class="object-cover mix-blend-multiply opacity-70" 
      />
    </div> -->

  <main class="flex-1 overflow-y-auto">
    <StatsPanel />

    <section class="flex justify-center items-center">
      <button
        on:click={addImageToGallery}
        class="m-4 px-6 py-1 bg-moody-dark text-white font-semibold rounded transition-all"
      >
        Add Image
      </button>
      <button
        on:click={toggleEditMode}
        class="m-4 px-6 py-1 bg-moody-dark text-white font-semibold rounded transition-all"
      >
        {isEditingGallery ? "Save Changes" : "Edit Gallery"}
      </button>
    </section>

    <Gallery
      {positionedImages}
      {isEditingGallery}
      {unlockedFrames}
      on:updateGallery={updateGallery}
    />
  </main>
  <Footer />
</section>
 