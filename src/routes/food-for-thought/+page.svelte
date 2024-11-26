<script>
    import { onMount } from "svelte";
    // @ts-nocheck

    // variable to fetch the array of thoughts from the api
    /** * @type {{ Description: string }[]} */
    export const foodForThought = [];

    // variable to store a random thought
    /** * @type {{ Description: any; } | null}
   */
    let randomThought = null;

    // function that runs when the component is mounted
    onMount(async () => {
        try {
            const res = await fetch(`http://localhost:3011/foodForThought`);
            const data = await res.json();

            // choose a random thought from the array
            if (data.length > 0) {
                randomThought = data[Math.floor(Math.random() * data.length)];
            }
            console.log(randomThought);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    });
</script>

<h1>Food for Thought</h1>
<!-- loops through the whole array and picks a random thought to be displayed-->
{#if randomThought}
    <p>{randomThought.Description}</p>
{:else}
    <p>Loading...</p>
{/if}
