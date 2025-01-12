<script>
    // @ts-nocheck
    // @ts-ignore

    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";
    import "../../app.css";

    import ApexCharts from "apexcharts";
    import { onMount } from "svelte";

    let userId = 1;
    let totalCO2Saved = 0;
    let userCO2Saved = 0;
    let userCO2NotSaved = 0;

    async function fetchUserById(userId) {
        // Add type annotation
        try {
            const res = await fetch(
                `http://localhost:3010/users/user/${userId}`,
            );
            if (!res.ok) {
                throw new Error(`Failed to fetch user data: ${res.statusText}`);
            }
            return await res.json();
        } catch (error) {
            console.error("Failed to fetch user data", error);
            return null;
        }
    }

    async function fetchAcceptedChallenges() {
        try {
            const res = await fetch(
                `http://localhost:3010/challenges/accepted-challenges`,
            );
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch accepted challenges: ${res.statusText}`,
                );
            }
            return await res.json();
        } catch (error) {
            console.error("Failed to fetch accepted challenges", error);
            return [];
        }
    }

    async function fetchDeniedChallenges() {
        try {
            const res = await fetch(
                `http://localhost:3010/challenges/denied-challenges`,
            );
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch denied challenges: ${res.statusText}`,
                );
            }
            return await res.json();
        } catch (error) {
            console.error("Failed to fetch denied challenges", error);
            return [];
        }
    }

    async function fetchUserAcceptedChallenges(userId) {
        // Add type annotation
        try {
            const res = await fetch(
                `http://localhost:3010/challenges/accepted-challenges?userId=${userId}`,
            );
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch user accepted challenges: ${res.statusText}`,
                );
            }
            return await res.json();
        } catch (error) {
            console.error("Failed to fetch user accepted challenges", error);
            return [];
        }
    }

    async function fetchUserDeniedChallenges(userId) {
        // Add type annotation
        try {
            const res = await fetch(
                `http://localhost:3010/challenges/denied-challenges?userId=${userId}`,
            );
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch user denied challenges: ${res.statusText}`,
                );
            }
            return await res.json();
        } catch (error) {
            console.error("Failed to fetch user denied challenges", error);
            return [];
        }
    }

    onMount(async () => {
        try {
            if (!userId || userId === "USER_ID_HERE") {
                throw new Error(
                    "Invalid or missing user ID. Please set the correct user ID.",
                );
            }

            // Fetch user data for validation (optional)
            const userData = await fetchUserById(userId);
            if (!userData) {
                throw new Error("User not found.");
            }
            console.log("User Data:", userData);

            // Fetch data for calculations
            const allAccepted = await fetchAcceptedChallenges();
            const allDenied = await fetchDeniedChallenges();
            const userAccepted = await fetchUserAcceptedChallenges(userId);
            const userDenied = await fetchUserDeniedChallenges(userId);

            // Log fetched data for debugging
            console.log("User ID:", userId);
            console.log("All Accepted Challenges:", allAccepted);
            console.log("All Denied Challenges:", allDenied);
            console.log("User Accepted Challenges:", userAccepted);
            console.log("User Denied Challenges:", userDenied);

            // Calculate percentages
            const totalAccepted = allAccepted.length;
            const totalDenied = allDenied.length;
            const userAcceptedCount = userAccepted.length;
            const userDeniedCount = userDenied.length;

            totalCO2Saved =
                (totalAccepted / (totalAccepted + totalDenied)) * 100 || 0;
            userCO2Saved =
                (userAcceptedCount / (userAcceptedCount + userDeniedCount)) *
                    100 || 0;
            userCO2NotSaved =
                (userDeniedCount / (userAcceptedCount + userDeniedCount)) *
                    100 || 0;

            // Render radial graph
            buildRadialGraph();
        } catch (error) {
            console.error("Error during initialization:", error);
        }
    });

    const buildRadialGraph = () => {
        const chartOptions = {
            chart: {
                height: 380,
                type: "radialBar",
            },
            colors: ["#4CAF50", "#2196F3", "#F44336"], // Green, Blue, Red
            plotOptions: {
                radialBar: {
                    size: 500,
                    hollow: {
                        size: "55%",
                    },
                    track: {
                        margin: 8.5,
                        background: "#F0F0F0",
                    },
                    dataLabels: {
                        name: {
                            fontSize: "1.5rem",
                        },
                        value: {
                            fontSize: "1rem",
                            color: "#333",
                        },
                        total: {
                            show: true,
                            label: "Our Carbon Comeback",
                            formatter: function () {
                                return `${totalCO2Saved.toFixed(1)}%`;
                            },
                        },
                    },
                },
            },
            series: [
                totalCO2Saved.toFixed(1),
                userCO2Saved.toFixed(1),
                userCO2NotSaved.toFixed(1),
            ],
            labels: [
                "Our Carbon Comeback",
                "My Green Vibes",
                "My Carbon Footprint",
            ],
            legend: {
                show: true, // Enable legend
                position: "bottom", // Position at the bottom
                horizontalAlign: "center", // Align center
                markers: {
                    width: 12,
                    height: 12,
                    radius: 12, // Circular markers
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
        };

        const chart = new ApexCharts(
            document.querySelector("#apex-radial-bar-chart"),
            chartOptions,
        );
        chart.render();
    };
</script>

<section class="min-h-screen bg-white flex flex-col">
    <!-- Header -->
    <Header />

    <section class="flex flex-col mt-5 mb-56">
        <div class="flex space-x-4 px-4">
            <a
                class="bg-primary px-4 py-2 rounded-md {window.location
                    .pathname === '/statistics'
                    ? 'font-bold'
                    : ''}"
                href="/statistics"
            >
                Overview
            </a>
            <a
                class="bg-primary px-4 py-2 rounded-md {window.location
                    .pathname === '/statistics/ecoinsights'
                    ? 'font-bold'
                    : ''}"
                href="/statistics/ecoinsights"
            >
            Eco Insights
            </a>
        </div>

        <!-- CO2 Graphs Section -->
        <div class="px-6">
            <div class="space-y-6">
                <div>
                    <div
                        id="apex-radial-bar-chart"
                        class="h-4 mt-4 rounded-md"
                    ></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <Footer />
</section>
