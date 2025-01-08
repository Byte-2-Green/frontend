<script>
    // @ts-nocheck

    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import { onMount } from "svelte";

    // Control variables for modals
    let showChallengeModal = false;
    let showModal = true;
    let showFeedbackModal = false;

    // Array to hold challenges
    /** @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, Challenge_ID: number }[]} */
    let challenges = [];

    // Currently selected random challenge
    /** @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, Challenge_ID: number } | null} */
    let randomChallenge = null;

    // Arrays to hold denied and accepted challenges
    /** @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, Challenge_ID: number }[]} */
    let deniedChallenges = [];
    /** @type {{ Description: string, Title: string, Timeframe: number, C02_emission: number, Challenge_ID: number }[]} */
    let acceptedChallenges = [];

    // Timer control variables
    let timerActive = false;
    let remainingTime = 0;
    let interval = null;

    // Feedback Modal Variables
    let feedbackText = "";
    let userRating = 0;
    let errorMessage = "";

    // Banned Words
    const bannedWords = [
        "damn",
        "mafia",
        "improve",
        "in my opinion",
        "feedback",
        "suggestion",
        "suggest",
        "bad",
        "ugly",
        "negative",
        "colors",
        "crap",
        "shit",
        "fuck",
        "ass",
        "bitch",
        "bastard",
        "dick",
        "piss",
        "cunt",
        "bollocks",
        "cock",
        "prick",
        "slut",
        "whore",
        "twat",
        "dumbass",
        "dipshit",
        "motherfucker",
        "fucker",
        "suca"
    ];

    // Progress bar
    $: progress = (remainingTime / (randomChallenge?.Timeframe * 60)) * 100;

    // ------------------------------
    // Timer / Alarm Utility
    // ------------------------------
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }

    function startTimer(timeframe) {
        if (timerActive) return;
        timerActive = true;
        remainingTime = timeframe * 60;

        interval = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
            } else {
                clearInterval(interval);
                playAlarm();
            }
        }, 1000);
    }

    function playAlarm() {
        const audio = new Audio("/alarm.mp3");
        audio.play();
        timerActive = false;
        remainingTime = 0;
    }

    // ------------------------------
    // Offensive Words Check
    // ------------------------------
    /**
     * containsOffensiveWords(text)
     * 1) Removes punctuation
     * 2) Lowercases the text
     * 3) Splits into words
     * 4) Returns true if any word is in bannedWords
     */
    function containsOffensiveWords(text) {
        // Remove punctuation & lower
        const noPunctuation = text.replace(/[^\w\s]|_/g, "").toLowerCase();
        // Split on spaces
        const words = noPunctuation.split(/\s+/).filter(Boolean);
        // Check each word
        return bannedWords.some((banned) => words.includes(banned));
    }

    // ------------------------------
    // Challenges / Fetch
    // ------------------------------
    function openModal() {
        if (challenges.length > 0) {
            randomChallenge =
                challenges[Math.floor(Math.random() * challenges.length)];
            showModal = true;
        } else {
            console.error("No challenges available");
        }
    }

    async function fetchChallenges() {
        try {
            const res = await fetch("http://localhost:3010/challenges/challenges");
            challenges = await res.json();

            if (challenges.length > 0) {
                randomChallenge =
                    challenges[Math.floor(Math.random() * challenges.length)];
            }
        } catch (error) {
            console.error("Failed to fetch challenges", error);
        }
    }

    async function fetchDeniedChallenges() {
        try {
            const response = await fetch("http://localhost:3010/challenges/denied-challenges");
            deniedChallenges = await response.json();
        } catch (error) {
            console.error("Failed to fetch denied challenges", error);
        }
    }

    async function fetchAcceptedChallenges() {
        try {
            const response = await fetch("http://localhost:3010/challenges/accepted-challenges");
            acceptedChallenges = await response.json();
        } catch (error) {
            console.error("Failed to fetch accepted challenges", error);
        }
    }

    // ------------------------------
    // Accept / Deny Challenge
    // ------------------------------
    async function handleAcceptChallenge(id) {
        try {
            const response = await fetch(
                `http://localhost:3010/challenges/challenges/accept/${id}`,
                { method: "POST" }
            );

            if (response.ok) {
                await fetchAcceptedChallenges();

                if (randomChallenge && randomChallenge.Timeframe) {
                    showChallengeModal = true;
                    startTimer(randomChallenge.Timeframe);
                } else {
                    console.error("Invalid challenge or timeframe missing.");
                }

                closeModal();
            } else {
                const errorData = await response.json();
                console.error("Error accepting challenge:", errorData.error);
            }
        } catch (error) {
            console.error("Failed to accept challenge", error);
        }
    }

    async function denyChallenge(id) {
        try {
            const response = await fetch(
                `http://localhost:3010/challenges/challenges/deny/${id}`,
                { method: "POST" }
            );

            if (response.ok) {
                await fetchChallenges();
                await fetchDeniedChallenges();
                closeModal();
            } else {
                const errorData = await response.json();
                console.error("Error denying challenge:", errorData.error);
            }
        } catch (error) {
            console.error("Failed to deny challenge", error);
        }
    }

    // ------------------------------
    // Modal & Feedback
    // ------------------------------
    function completedChallenge() {
        closeChallengeModal();
        showFeedbackModal = true; // Show the feedback modal
    }

    function closeChallengeModal() {
        showChallengeModal = false;
        timerActive = false;
        remainingTime = 0;
        clearInterval(interval);
    }

    function closeModal() {
        showModal = false;
    }

    function closeFeedbackModal() {
        showFeedbackModal = false;
        feedbackText = "";
        userRating = 0;
        errorMessage = "";
    }

    function setRating(rating) {
        userRating = rating;
    }

    /**
     * saveUserFeedback():
     * - Clears any previous error
     * - Checks text for offensive words
     * - If found, sets errorMessage & stops
     * - Otherwise, sends fetch request
     */
    async function saveUserFeedback() {
        // Clear any previous error
        errorMessage = "";

        // Final check before sending
        if (containsOffensiveWords(feedbackText)) {
            errorMessage =
                "Your feedback contains offensive language. Please remove or edit it before submitting.";
            // Stop here
            return;
        }

        try {
            const feedbackData = {
                Challenge_ID: randomChallenge?.Challenge_ID,
                feedback_text: feedbackText,
                rating: userRating
            };

            const response = await fetch(
                `http://localhost:3010/challenges/challenges/feedback?rating=${feedbackData.rating}&Challenge_ID=${feedbackData.Challenge_ID}&feedback_text=${feedbackData.feedback_text}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                }
            );

            if (response.ok) {
                await response.json();
                closeFeedbackModal();
            } else {
                const errorData = await response.json();
                console.error("Feedback not saved:", errorData.error);
            }
        } catch (error) {
            console.error("Feedback not saved", error);
        }
    }

    // ------------------------------
    // onMount
    // ------------------------------
    onMount(() => {
        fetchChallenges();
        fetchDeniedChallenges();
        fetchAcceptedChallenges();
    });
</script>

<section class="flex flex-col h-screen bg-secondary-light">
    <Header />
    <main class="flex-1 overflow-y-auto">
        <!-- Main Challenge Modal -->
        {#if showModal}
            <section class="fixed inset-0 bg-black bg-opacity-50 z-50">
                <article
                    class="bg-secondary-light text-secondary-dark rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center relative"
                >
                    <button
                        on:click={closeModal}
                        class="absolute top-4 right-4 text-secondary-dark"
                    >
                        ✖
                    </button>
                    {#if randomChallenge}
                        <div class="flex justify-center mb-4 ml-4">
                            <i class="{randomChallenge.Icon} w-20 h-20 text-6xl"></i>
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
                    <!-- Accept and Deny Buttons -->
                    <div class="flex space-x-4 mt-6">
                        <button
                            on:click={() =>
                                handleAcceptChallenge(randomChallenge.Challenge_ID)
                            }
                            class="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                        >
                            Accept
                        </button>
                        <button
                            on:click={() =>
                                denyChallenge(randomChallenge.Challenge_ID)
                            }
                            class="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                        >
                            Deny
                        </button>
                    </div>
                </article>
            </section>
        {/if}

        <!-- Challenge Timer Modal -->
        {#if showChallengeModal}
            <section class="fixed inset-0 bg-black bg-opacity-50 z-50">
                <article
                    class="bg-secondary-light text-secondary-dark rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center relative"
                >
                    <button
                        on:click={closeChallengeModal}
                        class="absolute top-4 right-4 text-secondary-dark"
                    >
                        ✖
                    </button>
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

                        <!-- Completed Button -->
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

        <!-- Feedback Modal -->
        {#if showFeedbackModal}
            <section
                class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                role="dialog"
                aria-modal="true"
                aria-labelledby="feedback-modal-title"
            >
                <article
                    class="bg-secondary-light text-secondary-dark rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 flex flex-col justify-center items-center relative"
                >
                    <!-- Close Button -->
                    <button
                        on:click={closeFeedbackModal}
                        class="absolute top-4 right-4 text-secondary-dark"
                        aria-label="Close feedback modal"
                    >
                        ✖
                    </button>
                    <h2
                        id="feedback-modal-title"
                        class="text-center text-2xl font-bold mb-4"
                    >
                        Did you like this challenge?
                    </h2>

                    <p class="mb-4">Please leave your feedback below:</p>

                    <!-- Error Message -->
                    {#if errorMessage}
                        <p class="text-red-500 mb-4">{errorMessage}</p>
                    {/if}

                    <!-- Textarea (no real-time replacement, just store raw) -->
                    <textarea
                        class="border rounded w-full p-2 mb-4"
                        placeholder="Write your feedback here..."
                        bind:value={feedbackText}
                    ></textarea>

                    <p class="mb-2">Rate this challenge:</p>

                    <!-- Container stars rating -->
                    <div class="flex mb-4">
                        {#each [1, 2, 3, 4, 5] as star}
                            <button
                                type="button"
                                class="w-8 h-8 cursor-pointer"
                                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                                on:click={() => setRating(star)}
                            >
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    class={star <= userRating
                                        ? "text-yellow-400"
                                        : "text-gray-400"}
                                >
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.562 4.789
                    a1 1 0 00.95.69h5.03c.969 0 1.371 1.24.588 1.81l-4.07 2.958
                    a1 1 0 00-.364 1.118l1.562 4.789c.3.922-.755 1.688-1.54 1.118
                    l-4.07-2.958a1 1 0 00-1.176 0l-4.07 2.958c-.785.57-1.84-.196-1.54
                    -1.118l1.562-4.789a1 1 0 00-.364-1.118L2.369 9.416c-.783-.57
                    -.38-1.81.588-1.81h5.03a1 1 0 00.95-.69l1.562-4.788z"
                                    />
                                </svg>
                            </button>
                        {/each}
                    </div>

                    <!-- Save Feedback Button -->
                    <button
                        class="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                        on:click={saveUserFeedback}
                    >
                        Save
                    </button>
                </article>
            </section>
        {/if}

        <!-- Timer Display -->
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

        <!-- Accepted Challenges List -->
        <div class="mt-8 p-4">
            <h2 class="text-2xl font-bold mb-4">Challenges Accepted</h2>
            {#if acceptedChallenges.length > 0}
                <ul>
                    {#each acceptedChallenges as challenge}
                        <li class="border p-4 mb-2 rounded shadow">
                            <h3 class="font-bold">{challenge.Title}</h3>
                            <p>{challenge.Description}</p>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p>No challenges accepted yet.</p>
            {/if}
        </div>

        <!-- Denied Challenges List -->
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
