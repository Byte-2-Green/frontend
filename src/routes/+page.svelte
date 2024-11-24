<script>
    import Header from "../components/Header.svelte";
    import StatsPanel from "../components/StatsPanel.svelte";
    import Gallery from "../components/Gallery.svelte";
    import Footer from "../components/Footer.svelte";

    import "../app.css";

    import { onMount } from "svelte";

    let showModal = true;

    const facts = [
        {
            icon: "fas fa-video-slash",
            fact: "Streaming one hour of video in HD generates about 1 kg of CO2, equivalent to driving a car for 6 kilometers.",
        },
        {
            icon: "fas fa-car",
            fact: "An email with a large attachment emits 50g of CO2, the same as a 1 km drive in a car.",
        },
        {
            icon: "fas fa-database",
            fact: "Storing data in the cloud for a year can emit the same CO2 as running a refrigerator for 2 months.",
        },
    ];

    let randomFact = facts[0];

    onMount(() => {
        const randomIndex = Math.floor(Math.random() * facts.length);
        randomFact = facts[randomIndex];
    });

    function closeModal() {
        showModal = false;
    }

    let unlockedFrames = 4;
    let savedCO2 = 0.5;
</script>

<div class="flex flex-col h-screen bg-secondary-light">
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

                    <!-- Icon -->
                    <div class="flex justify-center mb-4 ml-4">
                        <i class="{randomFact.icon} w-20 h-20 text-6xl"></i>
                    </div>

                    <!-- Title -->
                    <h2 class="text-center text-4xl font-bold mb-6">
                        Did you know?
                    </h2>

                    <!-- Fact -->
                    <p class="text-center text-2xl">{randomFact.fact}</p>
                </article>
            </section>
        {/if}
    </main>
    <Footer />
</div>
