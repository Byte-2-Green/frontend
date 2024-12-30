<script>
    // @ts-nocheck
    // @ts-ignore
  
    import Header from "../../components/Header.svelte";
    import Gallery from "../../components/Gallery.svelte";
    import Footer from "../../components/Footer.svelte";
    import "../../app.css";
    import { onMount } from "svelte";
  
    let galleryImages = [
      { src: "/images/template1.png", text: "Artwork 1" },
      { src: "/images/template2.png", text: "Artwork 2" },
    ];
  
    let isEditingGallery = false;
  
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
  </script>
  
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
      <Gallery
        {positionedImages}
        {isEditingGallery}
        on:updateGallery={updateGallery}
      />
  
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
    </main>
    <Footer />
  </section>
  