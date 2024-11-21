<script>
    export let unlockedFrames;
    export let savedCO2;
  </script>
  
  <div class="flex justify-around bg-primary-light p-4 rounded-lg mx-4 my-2 shadow-md border border-primary-dark">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-primary-dark">{unlockedFrames}</h2>
      <p class="text-sm text-secondary">Unlocked frames</p>
    </div>
    <div class="text-center">
      <h2 class="text-2xl font-bold text-primary-dark">{savedCO2} kg</h2>
      <p class="text-sm text-secondary">
        Saved CO₂<br />
        <span class="text-xs text-secondary-light">0.5 kg more than last week</span>
      </p>
    </div>
  </div>
  