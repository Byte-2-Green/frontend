<script>
  import Footer from "../../components/Footer.svelte";
  import ProgressBar from "../../components/ProgressBar.svelte";
  import "../../app.css";
  import Header from "../../components/Header.svelte";

  let selectedTab = "stats";
</script>

<main class="bg-white min-h-screen flex flex-col">
  <Header/>
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
  <!-- Footer -->
  <Footer />
</main>
