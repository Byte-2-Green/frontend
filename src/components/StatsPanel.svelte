<script>
    export let unlockedFrames;
    export let savedCO2;
</script>

<div
    class="flex justify-around bg-orange-200 p-4 rounded-lg mx-4 my-2 shadow-md"
>
    <div class="text-center">
        <h2 class="text-2xl font-bold">{unlockedFrames}</h2>
        <p class="text-sm text-gray-600">Unlocked frames</p>
    </div>
    <div class="text-center">
        <h2 class="text-2xl font-bold">{savedCO2} kg</h2>
        <p class="text-sm text-gray-600">
            Saved CO₂<br />
            <span class="text-xs text-gray-500">0.5 kg more than last week</span
            >
        </p>
    </div>
</div>
