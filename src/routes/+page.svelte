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
            icon: "/images/video-icon.png",
            fact: "Streaming one hour of video in HD generates about 1 kg of CO2, equivalent to driving a car for 6 kilometers.",
        },
        {
            icon: "/images/car-icon.png",
            fact: "An email with a large attachment emits 50g of CO2, the same as a 1 km drive in a car.",
        },
        {
            icon: "/images/data-icon.png",
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
            <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div class="bg-secondary-light text-secondary-dark rounded-lg shadow-lg p-6 w-10/12 md:w-1/3 lg:w-1/4 relative">
                    <!-- Close Icon -->
                    <button on:click={closeModal} class="absolute top-4 right-4 text-secondary-dark hover:text-red-600">
                        ✖
                    </button>

                    <!-- Icon -->
                    <div class="flex justify-center mb-4">
                        <img
                            src={randomFact.icon}
                            alt="Fact Icon"
                            class="w-16 h-16 object-contain"
                        />
                    </div>

                    <!-- Title -->
                    <h2 class="text-center text-xl font-bold mb-2">
                        Did you know?
                    </h2>

                    <!-- Fact -->
                    <p class="text-center">{randomFact.fact}</p>
                </div>
            </div>
        {/if}
    </main>
    <Footer />
</div>
