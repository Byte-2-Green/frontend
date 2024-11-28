<script>
// @ts-nocheck

    import Header from "../components/Header.svelte";
    import StatsPanel from "../components/StatsPanel.svelte";
    import Gallery from "../components/Gallery.svelte";
    import Footer from "../components/Footer.svelte";

    import "../app.css";

    import { onMount } from "svelte";

    let showModal = true;

    /** * variable to fetch the array of thoughts from the api */
    /** * @type {{ Description: string }[]} */
    export const foodForThought = [];

    /** * variable to store a random thought */
    /** * @type {{ Description: any; } | null} */
    let randomThought = null;

    /** * function that runs when the component is mounted */
    onMount(async () => {
        try {
            const res = await fetch(`http://localhost:3011/foodForThought`);
            const data = await res.json();

            /** * choose a random thought from the array */
            if (data.length > 0) {
                randomThought = data[Math.floor(Math.random() * data.length)];
            }
            console.log(randomThought);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    });

    function closeModal() {
        showModal = false;
    }

    let unlockedFrames = 4;
    let savedCO2 = 0.5;
</script>

<section class="flex flex-col h-screen bg-secondary-light">
    <Header />
    <main class="flex-1 overflow-y-auto">
        <StatsPanel {unlockedFrames} {savedCO2} />
        <Gallery />

        <!-- Modal -->
        {#if showModal}
            <section class="fixed inset-0 bg-black bg-opacity-50 z-50">
                <article class="bg-secondary-light text-secondary-dark rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center relative">
                    <!-- Close Icon -->
                    <button on:click={closeModal} class="absolute top-4 right-4 text-secondary-dark">
                        ✖
                    </button>

                    {#if randomThought}
                        <!-- Icon -->
                        <div class="flex justify-center mb-4 ml-4">
                            <i class="{randomThought.Icon} w-20 h-20 text-6xl"></i>
                        </div>
                        <!-- Title -->
                        <h2 class="text-center text-4xl font-bold mb-6">
                            Did you know?
                        </h2>
                        <!-- Description -->
                        <p>{randomThought.Description}</p>
                    {:else}
                        <p>Loading...</p>
                    {/if}
                </article>
            </section>
        {/if}
    </main>
    <Footer />
</section>
