<script>
    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import ProgressBar from "../../components/ProgressBar.svelte";  
    import { onMount } from "svelte";

    /**
     * @type {{ Challenge_ID: number, Title: string, Description: string, C02_emission: number, Timeframe: number, Icon: string }[]}
     */
    let challenges = [];

    /**
     * @type {{ id: number, Challenge_ID: number, denied_at: string, photo: string | null }[]}
     */
    let showAcceptedChallenge = [];

    /** 
     * @type {boolean} 
    */
    let loading = true;

    async function fetchChallenges() {
        try {
            const res = await fetch(
                `http://localhost:3010/challenges/challenges`,
            );
            challenges = await res.json();
            console.log(challenges);
        } catch (error) {
            console.error("Failed to fetch challenges", error);
        }
    }

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

    onMount(async () => {
        await fetchChallenges();
        await fetchAcceptedChallenges();
        loading = false;
    });

    // combines the challenges and accepted challenges
    function getCombinedChallenges() {
        return showAcceptedChallenge
            .map((accepted) => {
                const challenge = challenges.find((c) => c.Challenge_ID === accepted.Challenge_ID);
                return challenge ? { ...challenge, id: accepted.id } : null;
            })
            .filter((combinedChallenge) => combinedChallenge !== null); // Remove valores null explicitamente
    }

    function getTotalCO2Saved() {
        return getCombinedChallenges().reduce((total, challenge) => total + challenge.C02_emission, 0);
    }
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
                    <h3 class="font-semibold text-lg">CO2 Saved per Challenge</h3>
                    <div class="bg-gray-200 mt-4 rounded-md p-4">
                        {#if loading}
                            <p>Loading...</p>
                        {:else if showAcceptedChallenge.length > 0}
                            <ul>
                                {#each getCombinedChallenges() as combinedChallenge}
                                    <li class="flex justify-between gap-x-2 py-1">
                                        <div class="flex min-w-0 gap-x-4">
                                            <div class="min-w-0 flex-auto">
                                                <p class="text-sm/6 font-semibold text-gray-900">{combinedChallenge.Title}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="text-sm/6 text-gray-900">{combinedChallenge.C02_emission} g CO₂ Saved</p>
                                        </div>
                                    </li>
                                {/each}
                                <div class="mt-4 pt-4 border-t border-gray-300">
                                    <p class="font-bold text-gray-900">Total CO₂ Saved: {getTotalCO2Saved()} g</p>
                                </div>
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
