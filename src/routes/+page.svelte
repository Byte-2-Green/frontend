<script>
  // @ts-nocheck
  // @ts-ignore

  import Header from "../components/Header.svelte";
  import Gallery from "../components/Gallery.svelte";
  import Footer from "../components/Footer.svelte";
  import StatsPanel from "../components/StatsPanel.svelte";
  import { onMount } from "svelte";
  import "../app.css";

  let showModal = true;

  // variable to fetch the array of thoughts from the api
  /**
   * @type {{ Description: string }[]}
   */
  export const foodForThought = [];

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
</script>

<section class="flex flex-col h-screen bg-white">
  <!-- Active Notification Push -->
  <!-- Notification Popup -->

  <!--TODO: make the notification spawn every 24 hours, or less?-->
  {#if activeNotification}
    <section class="fixed top-3 left-0 w-full p-4 z-50">
      <div
        class="max-w-lg mx-auto p-4 bg-primary-dark border-secondary border-2 text-white rounded-lg shadow-lg flex items-start"
      >
        <div class="flex-grow">
          <h3 class="font-semibold text-lg">{activeNotification.Title}</h3>
          <p class="mt-1 text-sm">{activeNotification.Description}</p>
          {#if activeNotification.timestamp}
            <span class="text-xs text-gray-300"
              >{activeNotification.timestamp}</span
            >
          {/if}
        </div>
        <a
          href="/challenges"
          class="ml-4 text-sm font-bold uppercase bg-white text-moody-dark px-3 py-1 rounded hover:bg-moody-default hover:text-white"
        >
          View
      </a>
      </div>
    </section>
  {/if}

  <Header />

  <section class="flex justify-between items-start mt-4 p-5">
    <!-- Title Section -->
    <article>
      <h1 class="text-5xl font-bold">
        <span class="text-primary">Museum</span> Museum
      </h1>
      <p class="italic text-3xl text-moody-light">CO2 Expert</p>
      <a href="/gallery" class="italic text-sm text-moody-light"
        >See you museum</a
      >
    </article>

    <!-- Stats Section -->
    <article class="flex flex-col text-right space-y-4">
      <div>
        <p class="text-primary text-xl font-bold">180</p>
        <p class="text-moody-light text-sm">artwork</p>
      </div>
      <div>
        <p class="text-primary text-xl font-bold">78</p>
        <p class="text-moody-light text-sm">likes</p>
      </div>
      <div>
        <p class="text-primary text-xl font-bold">05</p>
        <p class="text-moody-light text-sm">collections</p>
      </div>
    </article>
  </section>

  <!--Example images-->
  <section>
    <div class="space-y-3 m-3">
      <!-- Row 1 -->
      <div class="flex justify-center gap-2">
        <div
          class="-mt-6 bg-moody-light rounded-xl w-1/2 h-48 transform -rotate-6"
        ></div>
        <div class="bg-black rounded-xl w-1/2 h-36 transform rotate-6"></div>
      </div>

      <!-- Row 2 -->
      <div class="flex justify-center gap-2">
        <div
          class="mt-4 bg-black rounded-xl w-1/2 h-36 transform rotate-6"
        ></div>
        <div
          class="-mt-6 bg-moody-light rounded-xl w-1/2 h-48 transform -rotate-2"
        ></div>
      </div>
    </div>
  </section>

  <main class="flex-1 overflow-y-auto">
    <!--Food for thought modal-->
    {#if showModal}
      <section class="fixed inset-0 bg-black bg-opacity-50 z-50">
        <article
          class="bg-moody-dark text-primary rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center relative"
        >
          <button
            on:click={closeModal}
            class="absolute top-4 right-4 text-primary"
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
