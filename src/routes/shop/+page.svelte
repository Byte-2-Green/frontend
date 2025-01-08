<script>
  import Header from "../../components/Header.svelte";
  import Footer from "../../components/Footer.svelte";
  import "../../app.css";

  // Shop items array
  const items = [
    {
      id: 1,
      icon: "fas fa-paint-brush",
      name: "Item 1",
      price: 70,
      description: "A beautiful painting to add to your collection.",
    },
    {
      id: 2,
      icon: "fas fa-camera-retro",
      name: "Item 3",
      price: 350,
      description: "An antique camera that brings a vintage touch.",
    },
    {
      id: 3,
      icon: "fas fa-guitar",
      name: "Item 4",
      price: 500,
      description: "A classic guitar that will sound great in any space.",
    },
    {
      id: 4,
      icon: "fas fa-globe",
      name: "Item 5",
      price: 200,
      description: "A globe that adds sophistication to your museum.",
    },
    {
      id: 5,
      icon: "fas fa-globe",
      name: "Item 5",
      price: 200,
      description: "A globe that adds sophistication to your museum.",
    },
  ];

  let modalVisible = false;

  /**
   * @type {{ icon: any; name: any; description: any; price: any; } | null}
   */
  let selectedItem = null;

  /**
   * @param {{ icon: any; name: any; description: any; price: any; } | null} item
   */
  function openModal(item) {
    selectedItem = item;
    modalVisible = true;
  }

  function closeModal() {
    modalVisible = false;
    selectedItem = null;
  }
</script>

<section class="min-h-screen bg-white flex flex-col">
  <!-- Header -->
  <Header />

  <div class="flex flex-col py-6 px-4">
    <!-- Shop Title -->
    <h1 class="text-3xl font-bold mb-5">Shop</h1>

    <!-- Categories -->
    <div class="flex space-x-4">
      <button class="bg-primary px-4 py-2 rounded-md hover:bg-primary">
        Category
      </button>
      <button class="bg-primary px-4 py-2 rounded-md hover:bg-primary">
        Price
      </button>
    </div>

    <!-- Description -->
    <p class="text-lg max-w-lg mt-9">
      Browse through the shop and add to your collection the items that will
      make your museum shine!
    </p>

    <!-- Shop Items (Scrollable) -->
    <p class="text-lg mt-8">Most popular</p>
    <div class="overflow-x-auto flex space-x-2 mt-6 max-w-full">
      {#each items as item}
        <button
          class="bg-primary rounded-lg shadow-lg p-6 w-48 flex flex-col items-center relative transition-transform"
          on:click={() => openModal(item)}
        >
          <!-- Icon -->
          <i class={`${item.icon} text-3xl text-white mb-12`}></i>

          <!-- Item Price -->
          <div
            class="bg-primary-dark p-2 absolute bottom-0 left-0 right-0 rounded-md flex items-center justify-center w-full"
          >
            <p class="text-lg font-semibold text-white">${item.price}</p>
          </div>
        </button>
      {/each}
    </div>

    <p class="text-lg mt-8">For you</p>
    <div class="overflow-x-auto flex space-x-2 mt-6 max-w-full">
      {#each items as item}
        <button
          class="bg-primary rounded-lg shadow-lg p-6 w-48 flex flex-col items-center relative transition-transform"
          on:click={() => openModal(item)}
        >
          <!-- Icon -->
          <i class={`${item.icon} text-3xl text-white mb-12`}></i>

          <!-- Item Price -->
          <div
            class="bg-primary-dark p-2 absolute bottom-0 left-0 right-0 rounded-md flex items-center justify-center w-full"
          >
            <p class="text-lg font-semibold text-white">${item.price}</p>
          </div>
        </button>
      {/each}
    </div>

    <!-- Modal -->
    {#if modalVisible}
      <section class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <article class="bg-black p-6 rounded-lg text-center shadow-lg w-80 flex flex-col items-center" >
          <button on:click={closeModal} class="absolute top-2 right-2 text-primary-light" > ✖ </button>
          {#if selectedItem}
            <div class="bg-primary rounded-lg shadow-lg p-6 w-48 flex flex-col items-center relative">
              <i class={`${selectedItem.icon} text-3xl text-white mb-12`}></i>
              <div class="bg-primary-dark p-2 absolute bottom-0 left-0 right-0 rounded-md flex items-center justify-center w-full" >
                <p class="text-lg font-semibold text-white">
                  ${selectedItem.price}
                </p>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-primary-light mt-6">
              {selectedItem.name}
            </h3>
            <p class="text-lg text-primary-light mt-2">
              {selectedItem.description}
            </p>
            <p class="text-lg font-semibold text-primary-light mt-4">
              ${selectedItem.price}
            </p>
          {/if}
          <div class="mt-4 flex justify-center space-x-6">
            <button class="bg-green-500 text-white px-4 py-2 rounded-md">
              Confirm
            </button>
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-md"
              on:click={closeModal}
            >
              Deny
            </button>
          </div>
        </article>
      </section>
    {/if}
  </div>

  <!-- Footer -->
  <Footer />
</section>
