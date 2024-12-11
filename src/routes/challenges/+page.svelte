<script>
    // @ts-nocheck

    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import { onMount } from "svelte";

    let showModal = false;
    let showChallengeModal = false;

    // Variable to fetch the array of challenges from the API
    /** * @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, id: number }[]} */
    let challenges = [];

    // Variable to store a random challenge
    /** * @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, id: number } | null} */
    let randomChallenge = null;

    // Variable to store the denied challenges
    /** * @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, id: number }[]} */
    let deniedChallenges = [];

    // Variable to control the timer
    let timerActive = false;
    let remainingTime = 0;
    let interval = null;

    // Calculate the progress bar
    $: progress = (remainingTime / (randomChallenge?.Timeframe * 60)) * 100;

    // Format time
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }

    // Function to start the timer
    function startTimer(timeframe) {
        if (timerActive) return;
        timerActive = true;

        remainingTime = timeframe * 60;

        // Start the countdown
        interval = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                console.log(remainingTime);
            } else {
                clearInterval(interval);
                playAlarm();
            }
        }, 1000);
    }

    // Function to play the alarm when the timer ends
    function playAlarm() {
        const audio = new Audio("/alarm.mp3");
        audio.play();
        timerActive = false;
        remainingTime = 0;
    }

    // Function to fetch challenges from the API
    async function fetchChallenges() {
        try {
            const res = await fetch(
                `http://localhost:3010/challenges/challenges`,
            );
            challenges = await res.json();
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    }

    // fetch the denied challenges from the API
    async function fetchDeniedChallenges() {
        try {
            const response = await fetch(
                "http://localhost:3010/challenges/denied-challenges",
            );
            deniedChallenges = await response.json();
        } catch (error) {
            console.error("Failed to fetch denied challenges", error);
        }
    }

    // Function to open the first modal and select a random challenge
    function openModal() {
        if (challenges.length > 0) {
            randomChallenge =
                challenges[Math.floor(Math.random() * challenges.length)];
            showModal = true;
        } else {
            console.error("No challenges available");
            console.log(challenges);
        }
    }

    // reject the challenge and update the lists
    async function denyChallenge(id) {
        try {
            await fetch(
                `http://localhost:3010/challenges/challenges/deny/${id}`,
                { method: "POST" },
            );
            // Refresh both lists
            await fetchChallenges();
            await fetchDeniedChallenges();
            closeModal();
        } catch (error) {
            console.error("Failed to deny challenge", error);
        }
    }

    // Function to close the first modal
    function closeModal() {
        showModal = false;
    }

    // Function to accept a challenge and open the second modal
    function acceptChallenge() {
        if (randomChallenge && randomChallenge.Timeframe) {
            console.log("Challenge accepted!");
            showChallengeModal = true; // Show the second modal
            startTimer(randomChallenge.Timeframe); // Start the timer
            closeModal(); // Close the first modal
        } else {
            console.error("Invalid challenge or timeframe missing.");
        }
    }

    // Function to close the second modal
    function closeChallengeModal() {
        showChallengeModal = false;
        timerActive = false;
        remainingTime = 0;
        clearInterval(interval);
    }

    // Function to handle the "Completed" button
    function completedChallenge() {
        // Functionality to be implemented
        console.log("Challenge completed!");
        closeChallengeModal();
    }

    // Fetch challenges and denied challenges when the component mounts
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
                <article
                    class="bg-secondary-light text-secondary-dark rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center relative"
                >
                    <button
                        on:click={closeModal}
                        class="absolute top-4 right-4 text-secondary-dark"
                        >✖</button
                    >
                    {#if randomChallenge}
                        <div class="flex justify-center mb-4 ml-4">
                            <i class="{randomChallenge.Icon} w-20 h-20 text-6xl"
                            ></i>
                        </div>
                        <h2 class="text-center text-4xl font-bold mb-6">
                            {randomChallenge.Title}
                        </h2>
                        <p>{randomChallenge.Description}</p>
                        <h2 class="text-center text-4xl font-bold mb-6">
                            {randomChallenge.Timeframe} min
                        </h2>
                        <p>You are saving</p>
                        <h2 class="text-center text-4xl font-bold mb-6">
                            {randomChallenge.C02_emission} g
                        </h2>
                        <p>by doing this challenge.</p>
                    {:else}
                        <p>Loading...</p>
                    {/if}
                    <!-- Accept and deny buttons -->
                    <div class="flex space-x-4 mt-6">
                        <button
                            on:click={acceptChallenge}
                            class="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                        >
                            Accept
                        </button>
                        <button
                            on:click={() =>
                                denyChallenge(randomChallenge.Challenge_ID)}
                            class="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                        >
                            Deny
                        </button>
                    </div>
                </article>
            </section>
        {/if}

        <!-- challenge Modal -->
        {#if showChallengeModal}
            <section class="fixed inset-0 bg-black bg-opacity-50 z-50">
                <article
                    class="bg-secondary-light text-secondary-dark rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center relative"
                >
                    <button
                        on:click={closeChallengeModal}
                        class="absolute top-4 right-4 text-secondary-dark"
                        >✖</button
                    >
                    {#if randomChallenge}
                        <h2 class="text-center text-4xl font-bold mb-4">
                            {randomChallenge.Title}
                        </h2>
                        <p class="mb-4">{randomChallenge.Description}</p>

                        <!-- Timer with Progress Bar -->
                        <div class="flex flex-col items-center mb-6">
                            <p class="text-xl font-bold mb-2">Time Left</p>
                            <p class="text-3xl font-bold mb-2">
                                {formatTime(remainingTime)}
                            </p>
                            <div class="w-64 h-2 bg-gray-200 rounded-full">
                                <div
                                    class="h-full bg-green-500 rounded-full"
                                    style="width: {progress}%"
                                ></div>
                            </div>
                        </div>

                        <!-- Button Completed -->
                        <button
                            on:click={completedChallenge}
                            class="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                        >
                            Completed
                        </button>
                    {:else}
                        <p>Loading...</p>
                    {/if}
                </article>
            </section>
        {/if}

        <!--button to open the first modal -->
        <div class="flex items-center justify-center mt-6">
            <button
                on:click={openModal}
                class="bg-orange-700 text-white font-bold py-4 px-4 rounded hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
            >
                New Challenge
            </button>
        </div>

        <!-- Challenge Accepted -->
        <div class="mt-8 p-4">
            <h2 class="text-2xl font-bold mb-4">Challenges Accepted</h2>
        </div>

        <!-- Timer-->
        {#if timerActive}
            <div
                class="timer mt-8 p-4 bg-white shadow-lg rounded-lg flex justify-center items-center"
            >
                <div class="flex flex-col items-center">
                    <p class="text-xl font-bold mb-4">Time Left</p>
                    <p class="text-3xl font-bold">
                        {formatTime(remainingTime)}
                    </p>
                    <div class="w-64 h-2 bg-gray-200 rounded-full mt-4">
                        <div
                            class="h-full bg-green-500 rounded-full"
                            style="width: {progress}%"
                        ></div>
                    </div>
                </div>
            </div>
        {/if}

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
