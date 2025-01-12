<script>
    import Header from "../../../components/Header.svelte";
    import Footer from "../../../components/Footer.svelte";
    const faqs = [
        {
            question: "How do digital activities contribute to CO2 emissions?",
            answer: "Digital activities such as internet usage, cloud computing, and streaming require servers and data centers that consume electricity, contributing to CO2 emissions.",
        },
        {
            question: "What is the environmental impact of sending an email?",
            answer: "The environmental impact of sending a single email is relatively small but sending millions of emails daily adds up. The energy used to store and transmit emails contributes to carbon emissions.",
        },
        {
            question: "How can digital CO2 emissions be reduced?",
            answer: "Reducing digital CO2 emissions can be achieved by optimizing the energy efficiency of devices, using renewable energy for data centers, and minimizing unnecessary online activities.",
        },
        {
            question: "Does video streaming impact CO2 emissions?",
            answer: "Yes, streaming videos, especially in high-definition, requires significant data transfer and server resources, resulting in higher CO2 emissions. Reducing streaming quality can help lower emissions.",
        },
        {
            question: "How does cloud storage contribute to CO2 emissions?",
            answer: "Cloud storage requires data centers to continuously run, which uses electricity. The amount of CO2 emissions depends on the energy sources used to power these data centers.",
        },
    ];
</script>

<section class="min-h-screen bg-white flex flex-col">
    <!-- Header -->
    <Header />

    <div class="flex flex-col mt-5 px-4">
        <div class="flex space-x-4">
            <a
                class="bg-primary px-4 py-2 rounded-md {window.location.pathname === '/statistics' ? 'font-bold' : ''}"
                href="/statistics"
            >
                Overview
            </a>
            <a
                class="bg-primary px-4 py-2 rounded-md {window.location.pathname === '/statistics/ecoinsights' ? 'font-bold' : ''}"
                href="/statistics/ecoinsights"
            >
            Eco Insights
            </a>
        </div>

        <!-- Description -->
        <p class="text-lg max-w-lg mt-8 mb-8">
            Here, you can discover valuable insights into how digital 
            activities impact the environment, particularly their 
            contribution to CO2 emissions. 
            Explore practical suggestions to adopt more sustainable 
            digital habits and reduce your environmental footprint.
        </p>

        <!-- FAQ Section -->
        <dl class="space-y-2">
            {#each faqs as faq}
                <details class="group">
                    <summary
                        class="cursor-pointer text-lg font-bold mb-4 rounded-md"
                    >
                        {faq.question}
                    </summary>
                    <p class="mt-2 mb-8 px-4">
                        {faq.answer}
                    </p>
                </details>
            {/each}
        </dl>
    </div>

    <!-- Footer -->
    <Footer />
</section>
