<header
  class="relative bg-black text-white overflow-hidden shadow-lg p-5 flex justify-between items-center"
  style="border-bottom-right-radius: 50% 108px;"
>
  <!-- Left Section: Title and Profile Info -->
  <div class="flex items-center ml-2">
    <div>
      <!-- Link wraps all user info -->
      <a href="/profile" class="flex items-center">
        <!-- Logo -->
        <img src="/images/logo-outline.png" class="w-12 invert mr-3" alt="Logo">
      
        <!-- Title and Username -->
        <div>
          <h1 class="text-lg font-bold uppercase text-white">MuseTrail</h1>  
          <p class="text-sm text-gray-400">@janed.museum</p>
        </div>
      </a>      
    </div>
  </div>

  <!-- Right Section: Notifications and Profile Image -->
  <div class="flex items-center gap-4 -mt-2 mr-4">
    <!-- Notification Icon -->
    <div class="relative cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
           stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
        <path stroke-linecap="round" stroke-linejoin="round" 
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V9a6 6 0 00-12 0v5c0 .386-.149.735-.405 1.005L4 17h5m6 0a3 3 0 11-6 0m6 0H9" />
      </svg>
      <!-- Notification Indicator -->
      <span id="notification-indicator" 
            class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
    </div>

    <!-- Profile Image with Link -->
    <a href="/profile" class="cursor-pointer">
      <img
        alt="Profile"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
        class="w-10 h-10 rounded-full border-2 border-white hover:scale-105 transition-transform duration-200"/>
    </a>
  </div>
</header>
