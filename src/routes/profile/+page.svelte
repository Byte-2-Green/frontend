<script>
  import Footer from "../../components/Footer.svelte";
  import ProgressBar from "../../components/ProgressBar.svelte";
  import "../../app.css";

  let selectedTab = "stats";
</script>

<main class="bg-moody-dark min-h-screen flex flex-col">
  <!-- Top Gradient Lines -->
  <section class="relative z-0">
    <div
      class="absolute t-0 w-full h-5 bg-primary-dark opacity-80 rounded-b-full"
    ></div>
    <div
      class="absolute t-0 w-full h-10 bg-primary-dark opacity-60 rounded-b-3xl"
    ></div>
    <div
      class="absolute t-0 w-full h-16 bg-primary-dark opacity-40 rounded-b-3xl"
    ></div>
  </section>

  <!-- Profile Header -->
  <section class="flex-grow z-10">
    <!-- Profile Picture -->
    <article
      class="mt-6 rounded-full bg-primary w-24 h-24 mx-auto flex justify-center items-center shadow-lg border-2 border-primary-dark"
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
    <p class="text-2xl font-semibold text-center mt-2 mb-8 text-primary-dark">
      me
    </p>

    <!-- Progress Section -->
    <ProgressBar />

    <!-- Invite and View Friends Buttons -->
    <article class="text-center m-4 text-lg">
      <button
        class="w-full bg-primary px-6 py-3 rounded-lg shadow-md mb-4 flex items-center"
      >
        <img
          src="/images/friendsIcon.png"
          alt="Friends Icon"
          class="-ml-4 mr-4 -mb-3 -mt-8 w-24 h-24"
        />
        Invite your friends
      </button>
      <button class="w-full bg-primary px-6 py-3 rounded-lg shadow-md mb-5">
        View friends' galleries
      </button>
    </article>

    <!-- Stats, Global, Edit Buttons (Clickable Tabs) -->
    <section class="flex justify-around mt-4 text-lg">
      <button
        class="bg-primary px-6 py-2 rounded-lg shadow-md hover:bg-primary-dark hover:text-white"
        class:bg-primary-dark={selectedTab === "stats"}
        class:text-white={selectedTab === "stats"}
        on:click={() => (selectedTab = "stats")}
      >
        Stats
      </button>
      <button
        class="bg-primary px-6 py-2 rounded-lg shadow-md hover:bg-primary-dark hover:text-white"
        class:bg-primary-dark={selectedTab === "global"}
        class:text-white={selectedTab === "global"}
        on:click={() => (selectedTab = "global")}
      >
        Global
      </button>
      <button
        class="bg-primary px-6 py-2 rounded-lg shadow-md hover:bg-primary-dark hover:text-white"
        class:bg-primary-dark={selectedTab === "edit"}
        class:text-white={selectedTab === "edit"}
        on:click={() => (selectedTab = "edit")}
      >
        Edit
      </button>
    </section>

    <!-- Dynamic Content Based on Selected Tab -->
    <article
      class="mt-4 bg-primary-dark text-white text-center mx-4 rounded-lg px-6 py-6"
    >
      {#if selectedTab == "stats"}
        <div class="flex justify-around items-center">
          <!-- Column 1 -->
          <div class="flex flex-col items-center text-center w-1/3">
            <span class="text-2xl font-bold">1</span>
            <span class="text-sm">completed challenges</span>
          </div>

          <!-- Vertical Divider -->
          <div class="h-20 w-[1px] bg-white"></div>

          <!-- Column 2 -->
          <div class="flex flex-col items-center text-center w-1/3">
            <span class="text-2xl font-bold">20</span>
            <span class="text-sm">minutes in the app</span>
          </div>

          <!-- Vertical Divider -->
          <div class="h-20 w-[1px] bg-white"></div>

          <!-- Column 3 -->
          <div class="flex flex-col items-center text-center w-1/3">
            <span class="text-2xl font-bold">1</span>
            <span class="text-sm">challenges streak</span>
          </div>
        </div>
      {:else if selectedTab == "global"}
        <div>Global Content</div>
      {:else if selectedTab == "edit"}
        <div>Edit Profile Content</div>
      {/if}
    </article>
  </section>
  <!-- Footer -->
  <Footer />
</main>
