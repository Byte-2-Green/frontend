<script>
    import Header from "../components/Header.svelte";
    import StatsPanel from "../components/StatsPanel.svelte";
    import Gallery from "../components/Gallery.svelte";
    import Footer from "../components/Footer.svelte";
    import { onMount } from "svelte";
    import "../app.css";

    let showModal = true;
    let infographicUrl = "";
    export const foodForThought = [];
    let randomThought = null;

    // Fetch data
    onMount(async () => {
        try {
            const res = await fetch(`http://localhost:3011/foodForThought`);
            const data = await res.json();
            if (data.length > 0) {
                randomThought = data[Math.floor(Math.random() * data.length)];
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    });

    function closeModal() {
        showModal = false;
    }

    let unlockedFrames = 4;
    let savedCO2 = 0.5;

    let galleryImages = [
        { src: "/images/template1.png", text: "Artwork 1" },
        { src: "/images/template2.png", text: "Artwork 2" },
    ];

    let placeholders = [
        { top: "100px", left: "200px" },
        { top: "150px", left: "500px" },
        { top: "400px", left: "300px" },
        { top: "600px", left: "700px" },
    ];

    let positionedImages = []; // Will store images with their positions
    let currentImageIndex = 0; // Track the current image being placed

    function randomizeImage() {
    console.log("Button clicked");

    if (galleryImages.length > 0 && placeholders.length > 0) {
        // Randomize the placeholder
        const randomPlaceholderIndex = Math.floor(Math.random() * placeholders.length);
        const randomPlaceholder = placeholders[randomPlaceholderIndex];

        // Pick a random image from galleryImages
        const randomImageIndex = Math.floor(Math.random() * galleryImages.length);
        const imageToPlace = galleryImages[randomImageIndex];

        // Add the image and its position to positionedImages
        positionedImages = [
            ...positionedImages,
            {
                src: imageToPlace.src,
                text: imageToPlace.text,
                position: randomPlaceholder,
            },
        ];

        // Remove the placed image from galleryImages (if you don't want it placed again)
        galleryImages.splice(randomImageIndex, 1);
        // Optionally, you can also remove the placeholder, so you don't place multiple images in the same position
        placeholders.splice(randomPlaceholderIndex, 1);
        
        console.log(positionedImages); // Log updated array
    }

    if (galleryImages.length === 0 || placeholders.length === 0) {
        currentImageIndex = 0; // Reset index to allow clicking again
    }
}

</script>

<section class="flex flex-col h-screen bg-secondary-light">
    <Header />
    <main class="flex-1 overflow-y-auto">
        <StatsPanel {unlockedFrames} {savedCO2} />

        <!-- Button to randomize the image and text -->
        <button
            class="m-4 px-6 py-3 bg-secondary-dark text-white font-semibold rounded transition-all"
            on:click={randomizeImage}
            disabled={currentImageIndex >= galleryImages.length ||
                currentImageIndex >= placeholders.length}
        >
            Randomize Image
        </button>

        <!-- Pass positioned images to the Gallery component -->
        <Gallery {positionedImages} />

        <!-- Modal -->
        {#if showModal}
            <section class="fixed inset-0 bg-black bg-opacity-50 z-50">
                <article
                    class="bg-secondary-light text-secondary-dark rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center relative"
                >
                    <!-- Close Icon -->
                    <button
                        on:click={closeModal}
                        class="absolute top-4 right-4 text-secondary-dark"
                    >
                        ✖
                    </button>

                    {#if randomThought}
                        <div class="flex justify-center mb-4 ml-4">
                            <i class="{randomThought.Icon} w-20 h-20 text-6xl"
                            ></i>
                        </div>
                        <h2 class="text-center text-4xl font-bold mb-6">
                            Did you know?
                        </h2>
                        <p>{randomThought.Description}</p>
                    {:else}
                        <p>Loading...</p>
                    {/if}
                </article>
            </section>
        {/if}
    </main>
    <Footer />
</section>
