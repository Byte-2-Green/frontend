<script>
    // @ts-nocheck
    
        import Header from "../../components/Header.svelte";
        import Footer from "../../components/Footer.svelte";
    
        import { onMount } from "svelte";
    
        let showModal = true;
    
        /** * variable to fetch the array of challenges from the api */
        /** * @type {{ Description: string }[]} */
        export const Challenges = [];
    
        /** * variable to store a random challenge */
        /** * @type {{ Description: any; } | null} */
        let randomChallenge = null;
    
        /** * function that runs when the component is mounted */
        onMount(async () => {
            try {
                const res = await fetch(`http://localhost:3010/challenges/challenges`);
                console.log(res);
                const data = await res.json();
    
                /** * choose a random challenge from the array */
                if (data.length > 0) {
                    randomChallenge = data[Math.floor(Math.random() * data.length)];
                }
                console.log(randomChallenge);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        });
    
        function closeModal() {
            showModal = false;
        }
    </script>

<section class="flex flex-col h-screen bg-secondary-light">
    <Header />
    <main class="flex-1 overflow-y-auto">
        <!-- Modal -->
        {#if showModal}
            <section class="fixed inset-0 bg-black bg-opacity-50 z-50">
                <article class="bg-secondary-light text-secondary-dark rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center relative">
                    <!-- Close Icon -->
                    <button on:click={closeModal} class="absolute top-4 right-4 text-secondary-dark">
                        ✖
                    </button>

                    {#if randomChallenge}
                        <!-- Icon -->
                        <div class="flex justify-center mb-4 ml-4">
                            <i class="{randomChallenge.Icon} w-20 h-20 text-6xl"></i>
                        </div>
                        <!-- Title -->
                        <h2 class="text-center text-4xl font-bold mb-6">
                            <p>{randomChallenge.Title}</p>
                        </h2>
                        <!-- Description -->
                        <p>{randomChallenge.Description}</p>
                        <!-- Timeframe -->
                        <h2 class="text-center text-4xl font-bold mb-6">
                            <p>{randomChallenge.Timeframe} min</p>
                        </h2>
                        <!-- CO2 Emission -->
                         <p>You are saving </p>
                        <h2 class="text-center text-4xl font-bold mb-6">
                            <p>{randomChallenge.C02_emission} g</p>
                        </h2>
                        <p>by doing this challenge.</p>
                    {:else}
                        <p>Loading...</p>
                    {/if}
                </article>
            </section>
        {/if}
    </main>
    <Footer />
</section>
