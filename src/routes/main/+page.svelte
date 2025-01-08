<script>
  // @ts-nocheck
  import Header from "../../components/Header.svelte";
  import StatsPanel from "../../components/StatsPanel.svelte";
  import Gallery from "../../components/Gallery.svelte";
  import Footer from "../../components/Footer.svelte";
  import { onMount } from "svelte";
  import "../../app.css";

  let showModal = true;

  let unlockedFrames = 4;

  let savedCO2 = 0.5;

  let galleryImages = [
    { src: "/images/template1.png", text: "Artwork 1" },
    { src: "/images/template2.png", text: "Artwork 2" },
  ];

  let isEditingGallery = false;

  let positionedImages = [];

  export const foodForThought = [];

  let randomThought = null;

  let notifications = [];
  let activeNotification = null;
  let notificationIndex = 0;

  let cyclingInterval;
  let reminderTimeout;
  let isReminderActive = false;

  onMount(async () => {
    try {
      const foodRes = await fetch(`http://localhost:3011/foodForThought`);
      const foodData = await foodRes.json();

      if (foodData.length > 0) {
        randomThought = foodData[Math.floor(Math.random() * foodData.length)];
      }

      foodForThought.splice(0, foodForThought.length, ...foodData);

      const notifRes = await fetch(
        `http://localhost:3010/challenges/notifications`
      );
      notifications = await notifRes.json();

      if (notifications.length > 0) {
        activeNotification = notifications[notificationIndex];
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  });

  onMount(() => {
    cyclingInterval = setInterval(() => {
      if (notifications.length > 0 && !isReminderActive) {
        notificationIndex = (notificationIndex + 1) % notifications.length;
        activeNotification = notifications[notificationIndex];

        clearTimeout(reminderTimeout);
        reminderTimeout = setTimeout(() => {
          isReminderActive = true;
          showReminder();

          setTimeout(() => {
            isReminderActive = false;
            activeNotification = notifications[notificationIndex]; // Restore the original notification
          }, 5000); // Adjust duration as needed for the reminder
        }, 5000); // Reminder after 5 seconds of inactivity
      }
    }, 10000); // Adjust interval for challenges as needed

    return () => {
      clearInterval(cyclingInterval);
      clearTimeout(reminderTimeout);
    };
  });

  function onNotificationClick() {
    clearTimeout(reminderTimeout);
    isReminderActive = false;
  }

  function showReminder() {
    activeNotification = {
      Title: "Reminder",
      Description: "Please check your notification!",
    };
  }

  function goToChallenges() {
    window.location.href = "/challenges";
  }

  function closeModal() {
    showModal = false;
  }

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

  function updateGallery(updatedImages) {
    positionedImages = updatedImages;
    savedCO2 = 0.5 * positionedImages.length;
  }
</script>

<section class="flex flex-col h-screen bg-secondary-light">
  <Header />
  <main class="flex-1 overflow-y-auto">
    <StatsPanel {unlockedFrames} {savedCO2} />
    <button
      on:click={addImageToGallery}
      class="m-4 px-6 py-3 bg-secondary-dark text-white font-semibold rounded transition-all"
    >
      Add Image
    </button>
    <button
      on:click={toggleEditMode}
      class="m-4 px-6 py-3 bg-secondary-dark text-white font-semibold rounded transition-all"
    >
      {isEditingGallery ? "Save Changes" : "Edit Gallery"}
    </button>
    <Gallery
      {positionedImages}
      {isEditingGallery}
      on:updateGallery={updateGallery}
    />
    {#if showModal}
      <section class="fixed inset-0 bg-black bg-opacity-50 z-50">
        <article
          class="bg-secondary-light text-secondary-dark rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-center items-center relative"
        >
          <button
            on:click={closeModal}
            class="absolute top-4 right-4 text-secondary-dark"
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

    <!-- Active Notification Push -->
    {#if activeNotification}
      <section class="p-6 bg-blue-100 shadow-md rounded-lg mt-6">
        <button on:click={onNotificationClick} class="notification-button">
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
  </main>
  <Footer />
</section>