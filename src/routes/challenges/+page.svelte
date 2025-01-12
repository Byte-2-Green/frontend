<script>
    // @ts-nocheck

    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import "../../app.css";
    import { onMount } from "svelte";
    import { galleryImages, positionedImages } from "../store.js";
    import { goto } from "$app/navigation";

    let showChallengeModal = false;
    let showFeedbackModal = false;
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
        "suca",
    ];

    // Offensive Words Check
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
        if (!feedbackText || !userRating) {
            errorMessage = "Please add text or mark stars before submitting.";
            console.log(errorMessage);
            return;
        }
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
                rating: userRating,
            };
            const response = await fetch(
                `http://localhost:3010/challenges/challenges/feedback?rating=${feedbackData.rating}&Challenge_ID=${feedbackData.Challenge_ID}&feedback_text=${feedbackData.feedback_text}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                },
            );
            if (response.ok) {
                await response.json();
                closeFeedbackModal();
                completedChallenge();
            } else {
                const errorData = await response.json();
                console.error("Feedback not saved:", errorData.error);
            }
        } catch (error) {
            console.error("Feedback not saved", error);
        }
    }

    // Calculate the progress bar
    $: progress = (remainingTime / (randomChallenge?.Timeframe * 60)) * 100;

    // Timer / Alarm Utility
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

    // Function to handle the "Completed" challenge form reflection & rating
    async function completeForm() {
        closeChallengeModal();
        showFeedbackModal = true;
    }

    //Handles the redirection after the challenge is completed
    async function completedChallenge() {
        console.log("Challenge completed!");
        goto("/gallery");

        galleryImages.update((images) => {
            const randomImageIndex = Math.floor(Math.random() * images.length);
            const selectedImage = images[randomImageIndex];
            images.splice(randomImageIndex, 1);
            positionedImages.update((images) => [...images, selectedImage]);
        });

        closeChallengeModal();
        saveImageToDatabase();
    }

    async function saveImageToDatabase(src, text) {
        console.log("Saving image with src:", src, "and text:", text);
        try {
            const response = await fetch(
                "http://localhost:3014/gallery/1/user/1/art",
                {
                    method: "POST",
                    body: JSON.stringify({ src, text }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            const result = await response.json();
            console.log("Image saved:", result);
        } catch (error) {
            console.error("Error saving image:", error);
        }
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

    let currentPageAccepted = 1;
    let currentPageDenied = 1;
    const challengesPerPage = 2;

    // Paginate Accepted Challenges
    $: sortedAcceptedChallenges = [...acceptedChallenges].sort(
        (a, b) => new Date(b.accepted_at) - new Date(a.accepted_at),
    );
    $: paginatedAcceptedChallenges = sortedAcceptedChallenges.slice(
        (currentPageAccepted - 1) * challengesPerPage,
        currentPageAccepted * challengesPerPage,
    );

    // Paginate Denied Challenges
    $: sortedDeniedChallenges = [...deniedChallenges].sort(
        (a, b) => new Date(b.denied_at) - new Date(a.denied_at),
    );
    $: paginatedDeniedChallenges = sortedDeniedChallenges.slice(
        (currentPageDenied - 1) * challengesPerPage,
        currentPageDenied * challengesPerPage,
    );

    // Total Pages
    $: totalAcceptedPages = Math.ceil(
        sortedAcceptedChallenges.length / challengesPerPage,
    );
    $: totalDeniedPages = Math.ceil(
        sortedDeniedChallenges.length / challengesPerPage,
    );

    function changePage(type, direction) {
        if (type === "accepted") {
            currentPageAccepted =
                direction === "next"
                    ? Math.min(currentPageAccepted + 1, totalAcceptedPages)
                    : Math.max(currentPageAccepted - 1, 1);
        } else if (type === "denied") {
            currentPageDenied =
                direction === "next"
                    ? Math.min(currentPageDenied + 1, totalDeniedPages)
                    : Math.max(currentPageDenied - 1, 1);
        }
    }
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

        <!-- Main Challenge Modal -->
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
                            on:click={completeForm}
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
            {#if paginatedAcceptedChallenges.length > 0}
                <ol
                    class="relative border-s border-gray-200 dark:border-gray-700"
                >
                    {#each paginatedAcceptedChallenges as challenge}
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
                <div class="flex justify-between mt-4">
                    <button
                        class="px-4 py-2 bg-primary rounded disabled:opacity-50"
                        on:click={() => changePage("accepted", "prev")}
                        disabled={currentPageAccepted === 1}
                    >
                        Previous
                    </button>
                    <span class="text-sm"
                        >Page {currentPageAccepted} of {totalAcceptedPages}</span
                    >
                    <button
                        class="px-4 py-2 bg-primary rounded disabled:opacity-50"
                        on:click={() => changePage("accepted", "next")}
                        disabled={currentPageAccepted === totalAcceptedPages}
                    >
                        Next
                    </button>
                </div>
            {:else}
                <p>No challenges accepted yet.</p>
            {/if}
        </div>

        <!-- Denied challenges -->
        <div class="p-4">
            <h2 class="text-2xl font-bold mb-4">Challenges Denied</h2>
            {#if paginatedDeniedChallenges.length > 0}
                <ol
                    class="relative border-s border-gray-200 dark:border-gray-700"
                >
                    {#each paginatedDeniedChallenges as challenge}
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
                <div class="flex justify-between mt-4">
                    <button
                        class="px-4 py-2 bg-primary rounded disabled:opacity-50"
                        on:click={() => changePage("denied", "prev")}
                        disabled={currentPageDenied === 1}
                    >
                        Previous
                    </button>
                    <span class="text-sm"
                        >Page {currentPageDenied} of {totalDeniedPages}</span
                    >
                    <button
                        class="px-4 py-2 bg-primary rounded disabled:opacity-50"
                        on:click={() => changePage("denied", "next")}
                        disabled={currentPageDenied === totalDeniedPages}
                    >
                        Next
                    </button>
                </div>
            {:else}
                <p>No challenges denied yet.</p>
            {/if}
        </div>

        <!-- Feedback Modal -->
        {#if showFeedbackModal}
            <section
                class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                role="dialog"
                aria-modal="true"
                aria-labelledby="feedback-modal-title"
            >
                <article
                    class="bg-moody-dark text-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 flex flex-col justify-center items-center relative"
                >
                    <!-- Close Button -->
                    <button
                        on:click={closeFeedbackModal}
                        class="absolute top-4 right-4 text-white"
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
                        class="border rounded w-full p-2 mb-4 text-black"
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
                        class="bg-primary-dark text-white font-bold py-2 px-4 rounded"
                        on:click={saveUserFeedback}
                    >
                        Save
                    </button>
                    <!-- Error Message -->
                    {#if errorMessage}
                        <p class="text-red-500 text-sm mt-4">
                            {errorMessage}
                        </p>
                    {/if}
                </article>
            </section>
        {/if}
    </main>
    <Footer />
</section>
