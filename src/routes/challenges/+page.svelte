<script>
    // @ts-nocheck

    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import "../../app.css";
    import { onMount } from "svelte";
    import { galleryImages } from '../store.js';
    import { goto } from '$app/navigation';

    let showChallengeModal = false;

    let showModal = true;

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

    // variable to fetch the array of challenges from the api
    /** * @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, id: number }[]} */
    let challenges = [];

    // variable to store a random challenge
    /** * @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, id: number } | null} */
    let randomChallenge = null;

    // variable to store the denied challenges
    /** * @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, id: number }[]} */
    let deniedChallenges = [];

    // variable to store the accepted challenges
    /** * @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, id: number }[]} */
    let acceptedChallenges = [];

    // fetch the challenges from the API
    async function fetchChallenges() {
        try {
            const res = await fetch(
                `http://localhost:3010/challenges/challenges`,
            );
            challenges = await res.json();

            if (challenges.length > 0) {
                randomChallenge =
                    challenges[Math.floor(Math.random() * challenges.length)];
            }
        } catch (error) {
            console.error("Failed to fetch challenges", error);
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

    // fetch the accepted challenges from the API
    async function fetchAcceptedChallenges() {
        try {
            const response = await fetch(
                "http://localhost:3010/challenges/accepted-challenges",
            );
            acceptedChallenges = [...(await response.json())];
            console.log(acceptedChallenges);
        } catch (error) {
            console.error("Failed to fetch accepted challenges", error);
        }
    }

    // function to accept a challenge, update the lists, and open the second modal
    async function handleAcceptChallenge(id) {
        try {
            await fetch(
                `http://localhost:3010/challenges/challenges/accept/${id}`,
                { method: "POST" },
            );

            // updates the list of accepted challenges
            await fetchAcceptedChallenges();

            if (randomChallenge && randomChallenge.Timeframe) {
                console.log("Challenge accepted!");
                showChallengeModal = true;
                startTimer(randomChallenge.Timeframe);
            } else {
                console.error("Invalid challenge or timeframe missing.");
            }

            closeModal();
        } catch (error) {
            console.error("Failed to accept challenge", error);
        }
    }

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

    // Function to handle the "Completed" button
    async function completedChallenge() {
    console.log("Challenge completed!");
    goto('/gallery');
    galleryImages.update((images) => {
      const randomImageIndex = Math.floor(Math.random() * images.length);
      const selectedImage = images[randomImageIndex];
      images.splice(randomImageIndex, 1);
      return [...images, selectedImage];
    });
    closeChallengeModal();
}

    // Function to close the second modal
    function closeChallengeModal() {
        showChallengeModal = false;
        timerActive = false;
        remainingTime = 0;
        clearInterval(interval);
    }

    // Function to close the first modal
    function closeModal() {
        showModal = false;
    }

    // fetch challenges, denied challenges and accepted challenges on component mount
    onMount(() => {
        fetchChallenges();
        fetchDeniedChallenges();
        fetchAcceptedChallenges();
    });
</script>

<section class="flex flex-col h-screen bg-white">
    <Header />
    <main class="flex-1 overflow-y-auto">
        <!-- Modal -->
        {#if showModal}
            <section
                class="fixed inset-0 bg-black bg-opacity-85 z-50 flex justify-center items-center"
            >
                <article
                    class="bg-moody-dark text-white rounded-xl shadow-xl p-8 w-full max-w-md flex flex-col justify-center items-center relative m-4"
                >
                    <!-- Close Button -->
                    <button
                        on:click={closeModal}
                        class="absolute top-4 right-4 text-white">✖</button
                    >
                    {#if randomChallenge}
                        <!-- Icon Section -->
                        <div class="mb-4">
                            <i
                                class="{randomChallenge.Icon} w-20 h-20 text-6xl text-primary-light"
                            ></i>
                        </div>
                        <!-- Title Section -->
                        <h2 class="mb-4 text-3xl font-bold">
                            {randomChallenge.Title}
                        </h2>
                        <!-- Description Section -->
                        <p class="text-center text-lg mb-6">
                            {randomChallenge.Description}
                        </p>
                        <!-- Info Table -->
                        <div class="w-full mb-6">
                            <table class="w-full text-left">
                                <tbody>
                                    <tr class="border-b border-gray-700">
                                        <td class="py-2 text-gray-400"
                                            >Average Time:</td
                                        >
                                        <td
                                            class="py-2 text-white font-semibold"
                                            >{randomChallenge.Timeframe} min</td
                                        >
                                    </tr>
                                    <tr>
                                        <td class="py-2 text-gray-400"
                                            >CO2 Savings:</td
                                        >
                                        <td
                                            class="py-2 text-primary-light font-semibold"
                                            >{randomChallenge.C02_emission} g</td
                                        >
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    {:else}
                        <p>Loading...</p>
                    {/if}
                    <!-- Buttons Section -->
                    <div class="flex space-x-4 mt-4">
                        <button
                            on:click={() =>
                                handleAcceptChallenge(
                                    randomChallenge.Challenge_ID,
                                )}
                            class="bg-primary-light text-white font-bold py-2 px-6 rounded-lg shadow-lg"
                        >
                            Accept
                        </button>
                        <button
                            on:click={() =>
                                denyChallenge(randomChallenge.Challenge_ID)}
                            class="bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg"
                        >
                            Deny
                        </button>
                    </div>
                </article>
            </section>
        {/if}

        <!-- challenge Modal -->
        {#if showChallengeModal}
            <section
                class="fixed inset-0 bg-black bg-opacity-85 z-50 flex justify-center items-center"
            >
                <article
                    class="bg-moody-dark text-white rounded-xl shadow-xl p-8 w-full max-w-md flex flex-col justify-center items-center relative m-4"
                >
                    <!-- Close Button -->
                    <button
                        on:click={closeChallengeModal}
                        class="absolute top-4 right-4 text-gray-400 text-2xl"
                        >&times;</button
                    >
                    {#if randomChallenge}
                        <!-- Title Section -->
                        <h2 class="text-center text-3xl font-bold mb-4">
                            {randomChallenge.Title}
                        </h2>
                        <p class="text-center text-lg mb-6">
                            {randomChallenge.Description}
                        </p>
                        <!-- Timer Section -->
                        <div class="w-full mb-6">
                            <p class="text-center text-lg font-semibold mb-2">
                                Time Left
                            </p>
                            <p class="text-center text-4xl font-bold mb-2">
                                {formatTime(remainingTime)}
                            </p>
                            <div
                                class="w-full h-2 bg-gray-700 rounded-full overflow-hidden"
                            >
                                <div
                                    class="h-full bg-primary-light rounded-full transition-all"
                                    style="width: {progress}%"
                                ></div>
                            </div>
                        </div>
                        <!-- Completed Button -->
                        <button
                            on:click={completedChallenge}
                            class="bg-primary-light text-white font-bold py-2 px-6 rounded-lg shadow-lg"
                        >
                            Completed
                        </button>
                    {:else}
                        <p>Loading...</p>
                    {/if}
                </article>
            </section>
        {/if}

        <!-- Challenge Accepted -->
        <div class="mt-8 p-4">
            <h2 class="text-2xl font-bold">Challenges Accepted</h2>
            {#if acceptedChallenges.length > 0}
                <ol
                    class="relative border-s border-gray-200 dark:border-gray-700"
                >
                    {#each acceptedChallenges as challenge}
                        <li class="mb-10 ms-4">
                            <div
                                class="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-primary-dark bg-primary-dark"
                            ></div>
                            <h3 class="text-lg font-semibold text-moody-dark">
                                {challenge.Title}
                            </h3>
                            <p
                                class="mb-4 text-base font-normal text-moody-light"
                            >
                                {challenge.Description}
                            </p>
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </li>
                    {/each}
                </ol>
            {:else}
                <p>No challenges accepted yet.</p>
            {/if}
        </div>

        <!-- Denied challenges -->
        <div class="p-4">
            <h2 class="text-2xl font-bold mb-4">Challenges Denied</h2>
            {#if deniedChallenges.length > 0}
                <ol
                    class="relative border-s border-gray-200 dark:border-gray-700"
                >
                    {#each deniedChallenges as challenge}
                        <li class="mb-10 ms-4">
                            <div
                                class="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-red-700 bg-red-700"
                            ></div>
                            <h3 class="text-lg font-semibold text-moody-dark">
                                {challenge.Title}
                            </h3>
                            <p
                                class="mb-4 text-base font-normal text-moody-light"
                            >
                                {challenge.Description}
                            </p>
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </li>
                    {/each}
                </ol>
            {:else}
                <p>No challenges denied yet.</p>
            {/if}
        </div>
    </main>
    <Footer />
</section>
