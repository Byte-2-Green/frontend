<script>
  import Footer from "../../components/Footer.svelte";

  let selectedTab = "stats";
</script>

<main class="bg-secondary-light min-h-screen flex flex-col">
  <!-- Top Gradient Lines -->
  <section class="relative z-0">
    <div
      class="absolute t-0 w-full h-5 bg-secondary-dark opacity-80 rounded-b-full"
    ></div>
    <div
      class="absolute t-0 w-full h-10 bg-secondary-dark opacity-60 rounded-b-3xl"
    ></div>
    <div
      class="absolute t-0 w-full h-16 bg-secondary-dark opacity-40 rounded-b-3xl"
    ></div>
  </section>

  <!-- Profile Header -->
  <section class="flex-grow z-10">
    <!-- Profile Picture -->
    <article
      class="mt-6 rounded-full bg-secondary w-24 h-24 mx-auto flex justify-center items-center shadow-lg border-2 border-secondary-dark"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-2.673 0-8 1.354-8 4v3h16v-3c0-2.646-5.327-4-8-4z"
        />
      </svg>
    </article>

    <!-- Username -->
    <p class="text-2xl font-semibold text-center mt-2 mb-8 text-secondary-dark">
      me
    </p>

    <!-- Progress Section -->
    <article class="m-4 mb-10 bg-secondary-dark text-white rounded-lg px-6 py-2">
      <div class="text-lg flex justify-between mb-1">
        <span class="uppercase">Name</span>
        <p class="text-right text-lg">
          <span class="text-secondary">6</span>/20
        </p>
      </div>
      <div class="h-2 bg-white rounded-full relative overflow-hidden">
        <div
          class="h-full bg-secondary absolute top-0 left-0"
          style="width: 30%;"
        ></div>
      </div>
      <div class="text-sm flex justify-between mt-1">
        <span class="uppercase">bronze</span>
        <span class="uppercase">silver</span>
      </div>
    </article>

    <!-- Invite and View Friends Buttons -->
    <article class="text-center m-4 text-lg">
      <button
        class="w-full bg-secondary px-6 py-2 rounded-lg shadow-md hover:bg-secondary-dark mb-3 flex items-center"
      >
      <img src="/images/friendsIcon.png" alt="Friends Icon" class="-ml-4 mr-4 -mb-2 -mt-8 w-24 h-24" />
      Invite your friends
      </button>
      <button
        class="w-full bg-secondary px-6 py-2 rounded-lg shadow-md hover:bg-secondary-dark mb-3"
      >
        View friends' galleries
      </button>
    </article>

    <!-- Stats, Global, Edit Buttons (Clickable Tabs) -->
    <section class="flex justify-around mt-4 text-lg">
      <button
        class="bg-secondary px-4 py-2 rounded-lg shadow-md hover:bg-secondary-dark hover:text-white"
      >
        Stats
      </button>
      <button
        class="bg-secondary px-4 py-2 rounded-lg shadow-md hover:bg-secondary-dark hover:text-white"
      >
        Global
      </button>
      <button
        class="bg-secondary px-4 py-2 rounded-lg shadow-md hover:bg-secondary-dark hover:text-white"
      >
        Edit
      </button>
    </section>

    <!-- Dynamic Content Based on Selected Tab -->
    <article class="mt-6">
      {#if selectedTab == "stats"}
        <div class="text-center text-secondary-dark">Statistics Content</div>
      {:else if selectedTab == "global"}
        <div class="text-center text-secondary-dark">Global Content</div>
      {:else if selectedTab == "edit"}
        <div class="text-center text-secondary-dark">Edit Profile Content</div>
      {/if}
    </article>
  </section>

  <!-- Footer -->
  <Footer />
</main>
