<script>
  export let unlockedFrames;
  export let savedCO2;
  export let percentageCompleted;
  console.log(percentageCompleted);
</script>

<section class="flex justify-center items-center mt-6">
  <!-- Unlocked Frames -->
  <div class="flex flex-col items-center mx-4">
    <h2 class="text-4xl font-bold">{unlockedFrames}</h2>
    <p class="text-sm text-gray-800">Unlocked</p>
    <p class="text-sm text-gray-800">Frames</p>
  </div>

  <!-- Circular Divider -->
  <section class="relative w-20 h-20">
    <!-- Circular Progress Background -->
    <svg class="absolute" width="100%" height="100%" viewBox="0 0 100 100">
      <circle
        class="text-gray-700"
        stroke-width="10"
        stroke="currentColor"
        fill="transparent"
        r="40"
        cx="50"
        cy="50"
      />
      <!-- Progress Ring -->
      <circle
        class="text-primary transition-[stroke-dashoffset] duration-1000 ease-in-out"
        stroke-width="10"
        stroke="currentColor"
        stroke-dasharray="251.2"
        stroke-dashoffset="calc(251.2 - (251.2 * {percentageCompleted}) / 100)"
        fill="transparent"
        r="40"
        cx="50"
        cy="50"
      />
    </svg>
    <!-- Text Inside Circle -->
    <div
      class="absolute inset-0 flex items-center justify-center text-lg font-bold"
    >
      {percentageCompleted}%
    </div>
  </section>

  <!-- Saved CO2 -->
  <div class="flex flex-col items-center mx-4">
    <h2 class="text-4xl font-bold">{savedCO2}</h2>
    <p class="text-sm text-gray-800">Saved CO₂</p>
    <p class="text-sm text-gray-800">Grams</p>
  </div>
</section>

<!-- Caption -->
<div class="text-center mt-4">
  <p class="text-sm text-gray-800">Completed challenges %</p>
</div>

<div class="ml-6 mt-8">
  <h2 class="text-2xl font-bold">Challenges Accepted</h2>
</div>
