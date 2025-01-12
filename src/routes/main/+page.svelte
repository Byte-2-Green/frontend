<script>
  // @ts-nocheck
  // @ts-ignore

  import Header from "../../components/Header.svelte";
  import Gallery from "../../components/Gallery.svelte";
  import Footer from "../../components/Footer.svelte";
  import StatsPanel from "../../components/StatsPanel.svelte";
  import { onMount } from "svelte";
  import "../../app.css";
  import { fade } from "svelte/transition";

  let EmojiPicker;

  let emojis = ["😀", "😍", "😎", "🥳"];
  let selectedEmoji = null;
  let flyingEmoji = null;

  function selectEmoji(emoji) {
    flyingEmoji = emoji;
    selectedEmoji = emoji;

    setTimeout(() => {
      flyingEmoji = null;
      selectedEmoji = null;
    }, 1000);
  }

  function toggleEmojiPicker() {
    if (EmojiPicker) {
      showEmojiPicker = !showEmojiPicker;
      console.log("Found");
    } else {
      console.log("No emoji picker found");
    }
  }

  function handleEmojiSelect(event) {
    selectedEmoji = event.detail.unicode;
    showEmojiPicker = false;
  }

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

  // function that runs when the component is mounted
  onMount(async () => {
    if (typeof window !== "undefined") {
      const module = await import("emoji-picker-element");
      EmojiPicker = module.default || module;
    }

    try {
      // Fetching food for thought
      const foodRes = await fetch(`http://localhost:3011/foodForThought`);
      const foodData = await foodRes.json();

      if (foodData.length > 0) {
        randomThought = foodData[Math.floor(Math.random() * foodData.length)];
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  });

  function closeModal() {
    showModal = false;
  }
</script>

<section class="flex flex-col h-screen bg-white">
  <Header />

  <section class="flex justify-between items-start p-5">
    <!-- Title Section -->
    <article>
      <h1 class="text-5xl font-bold mb-2">
        <span class="text-primary">My</span> Museum
      </h1>
      <p class="italic text-3xl text-moody-light mb-6">CO2 Expert</p>
      <a href="/gallery" class="border border-primary text-primary px-4 py-2 rounded-md text-sm font-medium">
        See your museum
      </a>
      
    </article>

    <!-- Stats Section -->
    <article class="flex flex-col text-right space-y-4">
      <div>
        <p class="text-primary text-xl font-bold">4</p>
        <p class="text-moody-light text-sm">frames</p>
      </div>
      <div>
        <p class="text-primary text-xl font-bold">78</p>
        <p class="text-moody-light text-sm">likes</p>
      </div>
      <div>
        <p class="text-primary text-xl font-bold">10</p>
        <p class="text-moody-light text-sm">friends</p>
      </div>
    </article>
  </section>

  <!--Example images-->
  <section>
    <div class="space-y-3 m-4">
      <!-- Row 1 -->
      <div class="flex justify-center gap-2">
        <div class="-mt-6 bg-moody-light rounded-xl w-1/2 h-48">
          <img
            src="/images/home01.png"
            alt="Home Page 1"
            class="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div class="bg-black rounded-xl w-1/2 h-36">
          <img
            src="/images/home02.png"
            alt="Home Page 2"
            class="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <!-- Row 2 -->
      <div class="flex justify-center gap-2">
        <div class="mt-4 bg-black rounded-xl w-1/2 h-36">
          <img
            src="/images/home03.png"
            alt="Home Page 3"
            class="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div class="-mt-6 bg-moody-light rounded-xl w-1/2 h-42">
          <img
            src="/images/home04.png"
            alt="Home Page 4"
            class="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  </section>

  <main class="flex-1 overflow-y-auto justify-center text-center">
    <!--Food for thought modal-->
    {#if showModal}
      <section
        class="fixed inset-0 bg-black bg-opacity-50 z-50 justify-center items-center"
      >
        <article
          class="bg-moody-dark text-primary rounded-lg shadow-lg p-6 w-full h-full flex flex-col items-center relative pt-48"
        >
          <button
            on:click={closeModal}
            class="absolute top-4 right-4 text-primary"
          >
            ✖
          </button>

          <!-- Random Thought -->
          {#if randomThought}
            <div class="flex justify-center mb-4 ml-4">
              <i class="{randomThought.Icon} w-20 h-20 text-6xl"></i>
            </div>
            <h2 class="text-center text-4xl font-bold mb-6">Did you know?</h2>
            <p>{randomThought.Description}</p>
          {:else}
            <p>Loading...</p>
          {/if}

          <div class="flex flex-col items-center justify-center flex-1">
            <h2>Give your reaction:</h2>
            <!-- Emoji Selection -->
            <div class="flex space-x-4">
              {#each emojis as emoji}
                <button
                  class="text-xl hover:scale-110 transition-transform duration-200"
                  on:click={() => selectEmoji(emoji)}
                >
                  {emoji}
                </button>
              {/each}
            </div>

            <!-- Flying Emoji -->
            {#if flyingEmoji}
              <span class="text-6xl animate-flyOff absolute">
                {flyingEmoji}
              </span>
            {/if}
          </div>
        </article>
      </section>
    {/if}
  </main>
  <Footer />
</section>
