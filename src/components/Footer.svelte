<nav class="relative bg-white h-20 flex justify-around items-center shadow-md">
  <!-- Wave effect using SVG -->
  <div class="absolute top-[-10px] left-0 w-full h-10 overflow-hidden leading-none">
    <svg
      class="absolute bottom-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path
        fill="white"
        d="M0,64L48,85.3C96,107,192,149,288,149.3C384,149,480,107,576,101.3C672,96,768,128,864,133.3C960,139,1056,117,1152,96C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>

  <!-- Navigation items -->
  <div class="flex w-full justify-between px-6">
    <!-- Statistics -->
    <button class="flex flex-col items-center">
      <svg
        class="w-6 h-6 stroke-black"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8 12l2 2 4-4m2 6h.01M4 6h16"
        />
      </svg>
      <span class="text-sm font-medium text-black">Statistics</span>
    </button>

    <!-- Challenges -->
    <button class="flex flex-col items-center">
      <svg
        class="w-6 h-6 stroke-black"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span class="text-sm font-medium text-black">Challenges</span>
    </button>

    <!-- Shop -->
    <button class="flex flex-col items-center">
      <svg
        class="w-6 h-6 stroke-black"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16 7H8m0 0h4M12 7h0m0 4H8m4 0h4m-4 0v4"
        />
      </svg>
      <span class="text-sm font-medium text-black">Shop</span>
    </button>

    <!-- Profile -->
    <button class="flex flex-col items-center">
      <svg
        class="w-6 h-6 stroke-black"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16 14s2-1 2-4-2-5-6-5-6 2-6 5 2 4 2 4m4 5a7 7 0 1 0 14 0 7 7 0 1 0-14 0z"
        />
      </svg>
      <span class="text-sm font-medium text-black">Profile</span>
    </button>
  </div>

  <!-- Center home button -->
  <button class="absolute -top-8 mx-auto w-16 h-16 rounded-full bg-primary-light border-4 border-white flex items-center justify-center shadow-lg">
    <svg
      class="w-8 h-8 stroke-white"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 3h18M3 21h18M4.5 11.5H19.5"
      />
    </svg>
  </button>
</nav>
