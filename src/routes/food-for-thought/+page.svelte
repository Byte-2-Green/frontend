<script>
    import { onMount } from "svelte";
// @ts-nocheck

    /** * @type {{ description: string }[]} */
    export let foodForThought = [];
    console.log(foodForThought);

    onMount(async() => {
        const res = await fetch(`http://localhost:3011/foodForThought`);
        const data = await res.json();
        console.log(data);
    })
</script>


<h1>Food for Thought</h1>
{#if foodForThought.length > 0}
    <ul>
        {#each foodForThought as thought}
            <li>
                <p>{thought.description}</p>
            </li>
        {/each}
    </ul>
{:else}
    <p>Loading...</p>
{/if}
