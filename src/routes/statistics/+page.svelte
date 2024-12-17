<script>
    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import ProgressBar from "../../components/ProgressBar.svelte";  
    import { onMount } from "svelte";

    /**
   * @type {string | any[]}
   */
    let showAcceptedChallenge = [];

    // fetch the accepted challenges from the API
    async function fetchAcceptedChallenges() {
        try {
            const response = await fetch(
                "http://localhost:3010/challenges/accepted-challenges",
            );
            showAcceptedChallenge = [...await response.json()];
            console.log(showAcceptedChallenge);
        } catch (error) {
            console.error("Failed to fetch accepted challenges", error);
        }
    }

    onMount(() => {
        fetchAcceptedChallenges();
    });
</script>

<section class="min-h-screen bg-secondary-light flex flex-col">
    <!-- Header -->
    <Header />

    <section class="flex flex-col mb-6">
        <div class="flex space-x-4 px-4">
            <a
                class="bg-secondary px-4 py-2 rounded-md {window.location.pathname === '/statistics' ? 'font-bold' : ''}"
                href="/statistics"
            >
                Overview
            </a>
            <a
                class="bg-secondary px-4 py-2 rounded-md {window.location.pathname === '/statistics/faq' ? 'font-bold' : ''}"
                href="/statistics/faq"
            >
                FAQ
            </a>
        </div>
        

        <!-- User Progress and Stats -->
        <ProgressBar />

        <!-- CO2 Graphs Section -->
        <div class="px-6">
            <div class="space-y-6">
                <div>
                    <h3 class="font-semibold text-lg">
                        CO2 Saved per Challenge
                    </h3>
                    <div class="h-48 bg-gray-200 mt-4 rounded-md">
                        {#if showAcceptedChallenge.length > 0}
                            <ul>
                                {#each showAcceptedChallenge as challenge}
                                    <li class="border p-4 mb-2 rounded shadow">
                                        <h3 class="font-bold">{challenge.Title}</h3>
                                        <p>{challenge.C02_emission}</p>
                                    </li>
                                {/each}
                            </ul>
                        {:else}
                            <p>No challenges accepted yet.</p>
                        {/if}
                    </div>
                </div>

                <div>
                    <h3 class="font-semibold text-lg">
                        Overall CO2 Saved per Month
                    </h3>
                    <div class="h-48 bg-gray-200 mt-4 rounded-md"></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <Footer />
</section>
