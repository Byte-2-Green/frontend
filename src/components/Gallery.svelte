<script>
  // @ts-ignore
  export let galleryImages = [];
</script>

<section class="relative overflow-x-auto w-full mt-5">
  <div class="relative flex justify-center items-center w-full">
    
    <!-- The background gallery image, taking up half the screen width -->
    <section class="relative w-full mt-5">
      <div class="flex justify-center items-center w-[200vw]">
        <img src="/images/gallery.png" alt="Gallery" class="object-contain" />
      </div>
    </section>
    

    <!-- Loop through galleryImages and display each with text -->
    {#each galleryImages as { src, text, position }}
    <div class="absolute" style="top: {position.top}; left: {position.left}; z-index: 10;">
      <img src={src} alt="Gallery" class="object-contain w-20 h-20 rounded-md" />
      <div class="absolute text-white font-bold text-sm top-full left-0 transform translate-x-[-50%]">
        {text}
      </div>
    </div>    
    {/each}
  </div>
</section>
