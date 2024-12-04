<script>
  export let positionedImages = [];
  // export let placeholders = [];
  export let isEditingGallery = false;
</script>

<section class="relative overflow-x-auto w-full mt-5">
  <div class="relative flex justify-center items-center w-full">
    <section class="relative w-full mt-5">
      <div class="flex justify-center items-center w-[200vw] z-0">
        <img src="/images/gallery.png" alt="Gallery" class="object-contain" />
      </div>
    </section>

    {#each positionedImages as { src, text, position }}
      <div
        class="absolute {isEditingGallery ? 'border-2 border-yellow-500 shadow-lg' : ''}"
        style="top: {position.top}; left: {position.left}; width: {position.width}; height: {position.height}; z-index: 10;"
      >
        <img
          src={src}
          alt="Gallery"
          class="object-cover w-full h-full rounded-md"
        />
        <div
          class="absolute text-white font-bold text-sm top-full left-0 transform translate-x-[-50%]"
        >
          {text}
        </div>
      </div>
    {/each}
  </div>
</section>
