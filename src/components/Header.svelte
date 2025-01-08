<script>
  import Notification from "./Notification.svelte";
</script>

<header
  class="relative bg-black text-white overflow-hidden shadow-lg p-5 flex justify-between items-center z-50"
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
    <div class="relative cursor-pointe">
      <Notification />
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
