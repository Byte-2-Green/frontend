<script>
  // @ts-nocheck
  // @ts-ignore

  import Header from "../../components/Header.svelte";
  import Gallery from "../../components/Gallery.svelte";
  import Footer from "../../components/Footer.svelte";
  import "../../app.css";
  import { onMount } from "svelte";
  import StatsPanel from "../../components/StatsPanel.svelte";

  import { galleryImages, positionedImages } from "../store.js";

  let isEditingGallery = false;
  let unlockedFrames = 0;
  let savedCO2 = 0;

  function toggleEditMode() {
    isEditingGallery = !isEditingGallery;
  }

  async function calculateSavedCO2() {
    try {
      const acceptedChallengesResponse = await fetch(
        "http://localhost:3012/accepted-challenges",
      );
      if (!acceptedChallengesResponse.ok) {
        throw new Error("Failed to fetch accepted challenges");
      }

      const acceptedChallenges = await acceptedChallengesResponse.json();

      const challengeIds = acceptedChallenges.map(
        (challenge) => challenge.Challenge_ID,
      );

      // Fetch challenges details to get CO2 emissions
      const challengesResponse = await fetch("http://localhost:3012/all");

      if (!challengesResponse.ok) {
        throw new Error("Failed to fetch challenges");
      }

      const challenges = await challengesResponse.json();

      for (let i = 0; i < acceptedChallenges.length; i++) {
        const acceptedChallenge = acceptedChallenges[i];

        const challenge = challenges.find(
          (ch) => ch.Challenge_ID === acceptedChallenge.Challenge_ID,
        );
        if (challenge) {
          savedCO2 += challenge.C02_emission;
        }
      }
      return savedCO2;
    } catch (error) {
      console.error("Error calculating saved CO2:", error);
      return 0;
    }
  }

  let percentageCompleted = 0;

  async function calculatePercentageCompleted() {
    try {
      const acceptedChallengesResponse = await fetch(
        "http://localhost:3012/accepted-challenges",
      );
      if (!acceptedChallengesResponse.ok) {
        throw new Error("Failed to fetch accepted challenges");
      }
      const acceptedChallenges = await acceptedChallengesResponse.json();

      const declinedChallengesResponse = await fetch(
        "http://localhost:3012/denied-challenges",
      );
      if (!declinedChallengesResponse.ok) {
        throw new Error("Failed to fetch declined challenges");
      }
      const declinedChallenges = await declinedChallengesResponse.json();

      const totalChallenges =
        acceptedChallenges.length + declinedChallenges.length;

      if (totalChallenges === 0) {
        return 0;
      }

      const percentageCompleted =
        (acceptedChallenges.length / totalChallenges) * 100;
      return Math.round(percentageCompleted);
    } catch (error) {
      console.error("Error calculating percentage completed:", error);
      return 0;
    }
  }

  /**
   * @param {string | any[]} updatedImages
   */
  function updateGallery(updatedImages) {
    positionedImages.update(() => updatedImages);
  }

  /**
   * Fetch the gallery
   */
  async function loadGallery() {
    try {
      savedCO2 = await calculateSavedCO2();
      percentageCompleted = await calculatePercentageCompleted();

      // Fetch gallery data
      const response = await fetch("http://localhost:3014/gallery/1");
      const data = await response.json();

      // Fetch art images associated with the gallery
      const artResponse = await fetch("http://localhost:3014/user/1/art");
      const artData = await artResponse.json();

      // Set unlocked frames and the images
      unlockedFrames = data.unlocked_frames;
      positionedImages.update(() => artData);
    } catch (error) {
      console.error("Failed to load gallery:", error);
    }
  }

  onMount(() => {
    loadGallery();
  });
</script>

<section class="flex flex-col h-screen bg-white">
  <Header />

  <main class="flex-1 overflow-y-auto">
    <StatsPanel {unlockedFrames} {savedCO2} {percentageCompleted} />

    <button
      on:click={toggleEditMode}
      class="m-4 px-6 py-1 bg-moody-dark text-white font-semibold rounded transition-all"
    >
      {isEditingGallery ? "Save Changes" : "Edit Gallery"}
    </button>

    <Gallery
      {positionedImages}
      {isEditingGallery}
      {unlockedFrames}
      on:updateGallery={updateGallery}
    />
  </main>
  <Footer />
</section>
