<script>
    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import ProgressBar from "../../components/ProgressBar.svelte";

    let userProgress = { artist: 6, total: 20 };
    let stats = {
        co2Challenge: [50, 75, 100, 150, 200, 250, 300],
        co2Monthly: [50, 150, 200, 100, 250, 300, 350, 200, 150, 300, 400, 250],
    };
</script>

<section class="min-h-screen bg-secondary-light flex flex-col">
    <!-- Header -->
    <Header />
  
    <section class="flex flex-col py-6 px-4">
        <div class="flex space-x-4">
            <button
                class="bg-secondary px-4 py-2 rounded-md hover:bg-secondary"
            >
                Overview
            </button>
            <button
                class="bg-secondary px-4 py-2 rounded-md hover:bg-secondary"
            >
                FAQ
            </button>
        </div>

        <!-- User Progress and Stats -->
        <ProgressBar />

        <!-- CO2 Graphs Section -->
        <div class="px-6 py-4">
            <div class="space-y-6">
                <!-- CO2 Spent per Challenge -->
                <div>
                    <h3 class="font-semibold text-lg">
                        CO2 Spent per Challenge
                    </h3>
                    <!-- Use a chart library like Chart.js or implement a custom SVG chart -->
                    <div class="h-48 bg-gray-200 mt-4 rounded-md">
                        <!-- Custom Chart or Image placeholder here -->
                    </div>
                </div>

                <!-- CO2 Spent per Month -->
                <div>
                    <h3 class="font-semibold text-lg">
                        Overall CO2 Spent per Month
                    </h3>
                    <!-- Another chart for monthly CO2 data -->
                    <div class="h-48 bg-gray-200 mt-4 rounded-md">
                        <!-- Custom Chart or Image placeholder here -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <Footer />
</section>

<style>
    /* Optional custom styles if needed */
    .progress-bar {
        width: calc(100% * var(--progress));
    }
</style>
