<script>
  // @ts-nocheck
  // @ts-ignore

  import Footer from "../../../components/Footer.svelte";
  import "../../../app.css";
  import Header from "../../../components/Header.svelte";
  import { onMount } from "svelte";

  let selectedTab = "stats";
  let showExhibitionPopup = false;
  let EmojiPicker;

  let emojis = ["❤️", "💔"];

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

  onMount(async () => {
    if (typeof window !== "undefined") {
      const module = await import("emoji-picker-element");
      EmojiPicker = module.default || module;
    }
  });
</script>

<main class="bg-white min-h-screen flex flex-col">
  <Header />

  <div class="flex flex-col py-6 px-4">
    <h1 class="text-3xl font-bold mb-5">My Friends</h1>

    <!-- Description -->
    <p class="text-lg max-w-lg -mb-8">
      See which of your friends have a live exhibition
    </p>
  </div>

  <section class="p-4 text-gray-900">
    <ul role="list" class="max-w-sm divide-y divide-gray-700 m-2">
      <!-- User 1 -->
      <li class="py-4">
        <div class="flex items-center gap-4">
          <div class="flex-shrink-0">
            <img
              class="w-10 h-10 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=80&h=80&q=80"
              alt="Neil Sims"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold truncate">Neil Sims</p>
            <p class="text-sm text-gray-500 truncate">neil.sims@email.com</p>
          </div>
          <span
            class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
          >
            <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
            <button on:click={() => (showExhibitionPopup = true)}>
              Exhibition <br />Available
            </button>
          </span>
        </div>
      </li>

      <!-- User 2 -->
      <li class="py-4">
        <div class="flex items-center gap-4">
          <div class="flex-shrink-0">
            <img
              class="w-10 h-10 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=80&h=80&q=80"
              alt="Bonnie Green"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold truncate">Bonnie Green</p>
            <p class="text-sm text-gray-500 truncate">bonnie.green@email.com</p>
          </div>
          <span
            class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
          >
            <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
            Exhibition <br /> Unavailable
          </span>
        </div>
      </li>

      <!-- User 3 -->
      <li class="py-4">
        <div class="flex items-center gap-4">
          <div class="flex-shrink-0">
            <img
              class="w-10 h-10 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=80&h=80&q=80"
              alt="Neil Sims"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold truncate">Neil Sims</p>
            <p class="text-sm text-gray-500 truncate">neil.sims@email.com</p>
          </div>
          <span
            class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
          >
            <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
            <button on:click={() => (showExhibitionPopup = true)}>
              Exhibition <br />Available
            </button>
          </span>
        </div>
      </li>

      <!-- User 4 -->
      <li class="py-4">
        <div class="flex items-center gap-4">
          <div class="flex-shrink-0">
            <img
              class="w-10 h-10 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=80&h=80&q=80"
              alt="Bonnie Green"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold truncate">Bonnie Green</p>
            <p class="text-sm text-gray-500 truncate">bonnie.green@email.com</p>
          </div>
          <span
            class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
          >
            <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
            Exhibition <br /> Unavailable
          </span>
        </div>
      </li>

      <!-- User 5 -->
      <li class="py-4">
        <div class="flex items-center gap-4">
          <div class="flex-shrink-0">
            <img
              class="w-10 h-10 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=80&h=80&q=80"
              alt="Bonnie Green"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold truncate">Bonnie Green</p>
            <p class="text-sm text-gray-500 truncate">bonnie.green@email.com</p>
          </div>
          <span
            class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
          >
            <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
            Exhibition <br /> Unavailable
          </span>
        </div>
      </li>
    </ul>
  </section>

  <section>
    <!-- Popup -->
    {#if showExhibitionPopup}
      <div
        class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-20"
      >
        <div
          class="bg-moody-dark text-white rounded-xl shadow-xl p-8 w-full max-w-md flex flex-col justify-center items-center relative m-4"
        >
          <h2 class="text-lg font-bold mb-4 text-center"> <br>
            Welcome to Neil's Exhibition 
          </h2>
          <div class="mb-4"> <br>
            <img
              src="/images/neil'sexhibition.png"
              alt="Neil's Exhibition"
              class="w-full rounded-lg shadow"
            />
          </div>

          <!-- Emoji Picker -->
          <div class="flex flex-col items-center mb-4">
            <div class="flex space-x-4">
              {#each emojis as emoji}
                <button
                  class="text-3xl transition-transform transform hover:scale-125"
                  on:click={() => selectEmoji(emoji)}
                  style="filter: none;"
                >
                  {emoji}
                </button>
              {/each}
            </div>
          </div>

          <!-- Flying Emoji -->
          {#if flyingEmoji}
            <span class="text-6xl animate-flyOff absolute">{flyingEmoji}</span>
          {/if}

          <p class="text-sm text-white-700 text-center mb-4">
            Challenges completed: <strong>5</strong><br />
            Frames unlocked: <strong>1</strong><br />
            Saved CO2: <strong>1.8 Kg</strong>
          </p>

          <div class="mt-6 text-center">
            <button
              class="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark"
              on:click={() => (showExhibitionPopup = false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    {/if}
  </section>

  <Footer />
</main>
