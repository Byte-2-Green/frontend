<script>
    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import ProgressBar from "../../components/ProgressBar.svelte";
    import "../../app.css";
</script>

<section class="min-h-screen bg-moody-dark flex flex-col">
    <!-- Header -->
    <Header />

    <section class="flex flex-col mb-6">
        <div class="flex space-x-4 px-4">
            <a
                class="bg-primary px-4 py-2 rounded-md {window.location.pathname === '/statistics' ? 'font-bold' : ''}"
                href="/statistics"
            >
                Overview
            </a>
            <a
                class="bg-primary px-4 py-2 rounded-md {window.location.pathname === '/statistics/faq' ? 'font-bold' : ''}"
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
                    <h3 class="font-semibold text-lg text-white">
                        CO2 Spent per Challenge
                    </h3>
                    <div class="h-48 bg-gray-200 mt-4 rounded-md"></div>
                </div>

                <div>
                    <h3 class="font-semibold text-lg text-white">
                        Overall CO2 Spent per Month
                    </h3>
                    <div class="h-48 bg-gray-200 mt-4 rounded-md"></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <Footer />
</section>
