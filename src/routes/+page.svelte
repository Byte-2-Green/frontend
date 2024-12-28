<script>
  // @ts-nocheck
  // @ts-ignore

  import Header from "../components/Header.svelte";
  import StatsPanel from "../components/StatsPanel.svelte";
  import Gallery from "../components/Gallery.svelte";
  import Footer from "../components/Footer.svelte";
  import { onMount } from "svelte";
  import "../app.css";

  let showModal = false;

  let galleryImages = [
    { src: "/images/template1.png", text: "Artwork 1" },
    { src: "/images/template2.png", text: "Artwork 2" },
  ];

  let isEditingGallery = false;

  // variable to fetch the array of thoughts from the api
  /**
   * @type {{ Description: string }[]}
   */
  export const foodForThought = [];

  /**
   * @type {string | any[]}
   */
  let positionedImages = [];

  // variable to store a random thought
  /**
   * @type {{ Description: any; } | null}
   */
  let randomThought = null;

  // variable to fetch the array of notifications from the backend
  /**
   * @type {{ Title: string, Description: string, timestamp?: string }[]}
   */
  let notifications = [];

  // variable to store the active notification
  /**
   * @type {{ Title: any; Description: any; timestamp?: any; } | null}
   */
  let activeNotification = null;

  // index to track the current notification being displayed
  let notificationIndex = 0;

  // function that runs when the component is mounted
  onMount(async () => {
    try {
      // Fetching food for thought
      const foodRes = await fetch(`http://localhost:3011/foodForThought`);
      const foodData = await foodRes.json();

      if (foodData.length > 0) {
        randomThought = foodData[Math.floor(Math.random() * foodData.length)];
      }

      // Fetching notifications
      const notifRes = await fetch(
        `http://localhost:3010/challenges/notifications`,
      );
      notifications = await notifRes.json();

      if (notifications.length > 0) {
        activeNotification = notifications[notificationIndex];
      }

      // Logging fetched data
      console.log("Random Thought:", randomThought);
      console.log("Notifications:", notifications);
      console.log("Active Notification:", activeNotification);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  });

  function goToChallenges() {
    window.location.href = "/challenges";
  }

  function closeModal() {
    showModal = false;
  }

  // Periodically cycle through notifications for push notifications
  /**
   * @type {string | number | NodeJS.Timeout | undefined}
   */
  let cyclingInterval;
  onMount(() => {
    cyclingInterval = setInterval(() => {
      if (notifications.length > 0) {
        // Cycle to the next notification
        notificationIndex = (notificationIndex + 1) % notifications.length;
        activeNotification = notifications[notificationIndex];
      }
    }, 5000); // Change notification every 5 seconds

    return () => clearInterval(cyclingInterval); // Cleanup cycling interval on component destroy
  });

  function addImageToGallery() {
    if (galleryImages.length > 0) {
      const randomImageIndex = Math.floor(Math.random() * galleryImages.length);
      const selectedImage = galleryImages[randomImageIndex];
      positionedImages = [...positionedImages, { ...selectedImage }];
      galleryImages.splice(randomImageIndex, 1);
    }
  }

  function toggleEditMode() {
    isEditingGallery = !isEditingGallery;
  }

  /**
   * @param {string | any[]} updatedImages
   */
  function updateGallery(updatedImages) {
    positionedImages = updatedImages;
    savedCO2 = 0.5 * positionedImages.length;
  }
</script>

<section class="flex flex-col h-screen bg-moody-dark">
  <Header />

  <!-- Active Notification Push -->
  {#if activeNotification}
    <section class="p-6 bg-blue-100 shadow-md rounded-lg mt-6">
      <button on:click={goToChallenges} class="notification-button">
        <h2 class="text-xl font-bold">Notifications</h2>
        <div class="p-4 bg-blue-200 rounded-lg">
          <h3 class="font-semibold text-lg">{activeNotification.Title}</h3>
          <p>{activeNotification.Description}</p>
          {#if activeNotification.timestamp}
            <span class="text-sm text-gray-500"
              >{activeNotification.timestamp}</span
            >
          {/if}
        </div>
      </button>
    </section>
  {/if}

  <main class="flex-1 overflow-y-auto">
    <Gallery
      {positionedImages}
      {isEditingGallery}
      on:updateGallery={updateGallery}
    />

    <section class="flex justify-center items-center">
      <button
        on:click={addImageToGallery}
        class="m-4 px-6 py-3 bg-primary-dark text-white font-semibold rounded transition-all"
      >
        Add Image
      </button>
      <button
        on:click={toggleEditMode}
        class="m-4 px-6 py-3 bg-primary-dark text-white font-semibold rounded transition-all"
      >
        {isEditingGallery ? "Save Changes" : "Edit Gallery"}
      </button>
    </section>

    <!--Challenges streak-->
    <section class="text-center mt-6">
      <div
        class="flex flex-row items-center justify-center bg-primary-dark text-white p-4"
      >
        <iframe
          src="https://giphy.com/embed/47GPQ7ZzivsemHKPvB"
          width="60"
          height="60"
          class="giphy-embed"
          title="fire burning gif emoji"
        ></iframe>
        <h2 class="ml-5 text-xl font-bold uppercase">12 Challenges</h2>
      </div>
    </section>

    <StatsPanel />

    <!--Food for thought modal-->
    {#if showModal}
      <section class="fixed inset-0 bg-black bg-opacity-50 z-50">
        <article
          class="bg-primary-light text-primary-dark rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center relative"
        >
          <button
            on:click={closeModal}
            class="absolute top-4 right-4 text-primary-dark"
          >
            ✖
          </button>
          {#if randomThought}
            <div class="flex justify-center mb-4 ml-4">
              <i class="{randomThought.Icon} w-20 h-20 text-6xl"></i>
            </div>
            <h2 class="text-center text-4xl font-bold mb-6">Did you know?</h2>
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
