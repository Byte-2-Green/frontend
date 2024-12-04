<script>
    // @ts-nocheck
    
        import Header from "../../components/Header.svelte";
        import Footer from "../../components/Footer.svelte";
    
        import { onMount } from "svelte";
    
        let showModal = true;
    
        /** * variable to fetch the array of challenges from the api */
        /** * @type {{ Description: string }[]} */
        export const Challenges = [];
    
        /** * variable to store a random challenge */
        /** * @type {{ Description: any; } | null} */
        let randomChallenge = null;
    
        /** * function that runs when the component is mounted */
        onMount(async () => {
            try {
                const res = await fetch(`http://localhost:3010/challenges/challenges`);
                console.log(res);
                const data = await res.json();
    
                /** * choose a random challenge from the array */
                if (data.length > 0) {
                    randomChallenge = data[Math.floor(Math.random() * data.length)];
                }
                console.log(randomChallenge);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        });
    
        function closeModal() {
            showModal = false;
        }
    </script>

<section class="min-h-screen bg-secondary-light flex flex-col">
    <!-- Header -->
    <Header />

    <!-- Footer -->
    <Footer />
</section>