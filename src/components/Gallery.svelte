<div class="grid grid-cols-2 gap-4 p-4">
    {#each Array(4) as _, i}
        <div key={i}
            class="w-full aspect-[4/3] bg-orange-300 border border-gray-400 rounded-lg shadow-sm"
        ></div>
    {/each}
</div>
