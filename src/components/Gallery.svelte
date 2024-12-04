<script>
  export let positionedImages = [];
  export let allowDrop;
  export let dropImage;
  export let dragImage;
</script>

<section class="relative overflow-x-auto w-full mt-5">
  <div class="relative flex justify-center items-center w-full">
    <section class="relative w-full mt-5">
      <div class="flex justify-center items-center w-[200vw] z-0">
        <img src="/images/gallery.png" alt="Gallery" class="object-contain" />
      </div>
    </section>

    {#each positionedImages as { src, text, position }, index}
      <div
          class="absolute"
          style="top: {position.top}; left: {position.left}; z-index: 10;"
          on:dragover={allowDrop}
          on:drop={(event) => dropImage(event, index)}
          role="region"
          aria-label="Drop image here"
      >
          <img 
            src={src} 
            alt="Gallery" 
            class="object-contain w-20 h-20 rounded-md z-10"
            draggable="true"
            on:dragstart={(event) => dragImage(event, index)}
          />
          <div class="absolute text-white font-bold text-sm top-full left-0 transform translate-x-[-50%]">
              {text}
          </div>
      </div>
    {/each}
  </div>
</section>
