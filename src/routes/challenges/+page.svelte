<script>
    // @ts-nocheck

    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";

    import { onMount } from "svelte";

    let showModal = true;

    // variable to fetch the array of challenges from the api
    /** * @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, id: number }[]} */
    let challenges = [];

    // variable to store a random challenge
    /** * @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, id: number } | null} */
    let randomChallenge = null;

    // variable to store the denied challenges
    /** * @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, id: number }[]} */
    let deniedChallenges = [];

    // fetch the challenges from the API
    async function fetchChallenges() {
        try {
            const res = await fetch(`http://localhost:3010/challenges/challenges`);
            challenges = await res.json();

            if (challenges.length > 0) {
                randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
            }
        } catch (error) {
            console.error("Failed to fetch challenges", error);
        }
    }

    // fetch the denied challenges from the API
    async function fetchDeniedChallenges() {
        try {
            const response = await fetch('http://localhost:3010/challenges/denied-challenges');
            deniedChallenges = await response.json();
        } catch (error) {
            console.error("Failed to fetch denied challenges", error);
        }
    }

    // open the modal and fetch a random challenge
    function openModal() {
        if (challenges.length > 0) {
            randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
            showModal = true;
        } else {
            console.error("No challenges available");
            console.log(challenges);
        }
    }

    // reject the challenge and update the lists
    async function denyChallenge(id) {
        try {
            await fetch(`http://localhost:3010/challenges/challenges/deny/${id}`, { method: 'POST' });
            // Refresh both lists
            await fetchChallenges();
            await fetchDeniedChallenges();
            closeModal();
        } catch (error) {
            console.error("Failed to deny challenge", error);
        }
    }

    // close the modal
    function closeModal() {
        showModal = false;
    }

    // accept the challenge
    function acceptChallenge() {
        console.log("Challenge accepted!");
        closeModal();
    }

    // fetch challenges and denied challenges on component mount
    onMount(() => {
        fetchChallenges();
        fetchDeniedChallenges();
    });
</script>

<section class="flex flex-col h-screen bg-secondary-light">
    <Header />
    <main class="flex-1 overflow-y-auto">
        <!-- Modal -->
        {#if showModal}
            <section class="fixed inset-0 bg-black bg-opacity-50 z-50">
                <article class="bg-secondary-light text-secondary-dark rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center relative">
                    <button on:click={closeModal} class="absolute top-4 right-4 text-secondary-dark">✖</button>
                    {#if randomChallenge}
                        <div class="flex justify-center mb-4 ml-4">
                            <i class="{randomChallenge.Icon} w-20 h-20 text-6xl"></i>
                        </div>
                        <h2 class="text-center text-4xl font-bold mb-6">{randomChallenge.Title}</h2>
                        <p>{randomChallenge.Description}</p>
                        <h2 class="text-center text-4xl font-bold mb-6">{randomChallenge.Timeframe} min</h2>
                        <p>You are saving </p>
                        <h2 class="text-center text-4xl font-bold mb-6">{randomChallenge.C02_emission} g</h2>
                        <p>by doing this challenge.</p>
                    {:else}
                        <p>Loading...</p>
                    {/if}
                    <!-- Accept and deny buttons -->
                    <div class="flex space-x-4 mt-6">
                        <button 
                            on:click={acceptChallenge} 
                            class="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                            Accept
                        </button>
                        <button 
                            on:click={() => denyChallenge(randomChallenge.Challenge_ID)} 
                            class="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                            Deny
                        </button>
                    </div>
                </article>
            </section>
        {/if}
        
        <!-- Button to open the modal -->
        <div class="flex items-center justify-center mt-6">
            <button 
                on:click={openModal} 
                class="bg-orange-700 text-white font-bold py-4 px-4 rounded hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2">
                New Challenge
            </button>
        </div>

        <!-- Accepted challenges -->
        <div class="mt-8 p-4">
            <h2 class="text-2xl font-bold mb-4">Challenges Accepted</h2>
        </div>

        <!-- Denied challenges -->
        <div class="mt-8 p-4">
            <h2 class="text-2xl font-bold mb-4">Challenges Denied</h2>
            {#if deniedChallenges.length > 0}
                <ul>
                    {#each deniedChallenges as challenge}
                        <li class="border p-4 mb-2 rounded shadow">
                            <h3 class="font-bold">{challenge.Title}</h3>
                            <p>{challenge.Description}</p>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p>No challenges denied yet.</p>
            {/if}
        </div>
    </main>
    <Footer />
</section>
