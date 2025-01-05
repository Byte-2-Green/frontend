<script>
    // @ts-nocheck
    // @ts-ignore

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
     * @type {{ Week_Start: string, Week_End: string, Total_CO2: number }[] }
     */
    let weeklyStatistics = [];

    /**
     * @type {boolean}
     */
    let loading = true;

    // Fetch challenges from the API
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

    // Fetch accepted challenges from the API
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

    // Fetch weekly statistics
    async function fetchWeeklyStatistics(userId) {
        try {
            const res = await fetch(`http://localhost:3010/stats/weekly/${userId}`);
            weeklyStatistics = await res.json();
            console.log(weeklyStatistics);
        } catch (error) {
            console.error("Failed to fetch weekly statistics", error);
        }
    }

    // Save weekly statistics to backend
    async function saveWeeklyStatistics(userId, totalCO2) {
        try {
            const res = await fetch(`http://localhost:3010/stats/weekly/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ totalCO2 })
            });

            if (!res.ok) {
                const errorDetails = await res.text();
                throw new Error(`Failed with status ${res.status}: ${errorDetails}`);
            }

            const data = await res.json();
            console.log("Weekly statistics saved:", data);
        } catch (error) {
            console.error("Failed to save weekly statistics:", error.message);
        }
    }

    onMount(async () => {
    const userId = 1;
    await fetchChallenges();
    await fetchAcceptedChallenges();

    const totalCO2Saved = getTotalCO2Saved();
    await saveWeeklyStatistics(userId, totalCO2Saved);

    await fetchWeeklyStatistics(userId);
    loading = false;
});

    // Combines challenges and accepted challenges
    function getCombinedChallenges() {
        return showAcceptedChallenge
            .map((accepted) => {
                const challenge = challenges.find((c) => c.Challenge_ID === accepted.Challenge_ID);
                return challenge ? { ...challenge, id: accepted.id } : null;
            })
            .filter((combinedChallenge) => combinedChallenge !== null);
    }

    // Calculate total CO2 saved
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

        <!-- Weekly statistics (cheating way)-->
        <div class="px-6">
            <h3 class="font-semibold text-lg">CO2 Saved per Week (cheating way)</h3>
            <div class="bg-gray-200 mt-4 rounded-md p-4">
                {#if loading}
                    <p>Loading...</p>
                {:else if getCombinedChallenges().length > 0}
                    <ul>
                        {#each getCombinedChallenges() as challenge}
                            <li class="flex justify-between gap-x-2 py-1">
                                <div>
                                    <p class="text-sm/6 font-semibold text-gray-900">
                                        {challenge.Title}
                                    </p>
                                    <p class="text-sm text-gray-700">
                                        {challenge.Description}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm/6 text-gray-900">
                                        {challenge.C02_emission} g CO₂ Saved
                                    </p>
                                </div>
                            </li>
                        {/each}
                    </ul>
                    <p class="font-bold mt-4">Total: {getTotalCO2Saved()} g CO₂ Saved</p>
                {:else}
                    <p>No accepted challenges yet.</p>
                {/if}
            </div>
        </div>

        <!-- Weekly statistics (correct way but doesnt work)-->
        <div class="px-6">
            <div class="space-y-6">
                <div>
                    <h3 class="font-semibold text-lg">CO2 Saved per Week (correct way but doesnt work)</h3>
                    <div class="bg-gray-200 mt-4 rounded-md p-4">
                        {#if loading}
                            <p>Loading...</p>
                        {:else if weeklyStatistics.length > 0}
                            <ul>
                                {#each weeklyStatistics as week}
                                    <li class="flex justify-between gap-x-2 py-1">
                                        <div>
                                            <p class="text-sm/6 font-semibold text-gray-900">
                                                Week {week.Week_Start} - {week.Week_End}
                                            </p>
                                        </div>
                                        <div>
                                            <p class="text-sm/6 text-gray-900">{week.Total_CO2} g CO₂ Saved</p>
                                        </div>
                                    </li>
                                {/each}
                            </ul>
                        {:else}
                            <p>No weekly statistics available.</p>
                        {/if}
                    </div>
                </div>
            </div>
        </div>

        <!-- Yearly statistics -->
        <div class="px-6">
            <div class="space-y-6">
                <div>
                    <h3 class="font-semibold text-lg">CO2 Saved per Year</h3>
                    <div class="bg-gray-200 mt-4 rounded-md p-4">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <Footer />
</section>
