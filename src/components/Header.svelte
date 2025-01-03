<header
  class="relative bg-black text-white overflow-hidden shadow-lg p-5 flex justify-between items-center"
  style="border-bottom-right-radius: 50% 108px;"
>
  <div class="flex items-center ml-2">
    <div>
      <h1 class="text-lg font-bold uppercase text-white">MuseTrail v3.0</h1>
      <h2 class="text-lg font-semibold">Jane Doe</h2>
      <p class="text-sm text-gray-400">@janed.museum</p>
    </div>
  </div>
  <div class="relative cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V9a6 6 0 00-12 0v5c0 .386-.149.735-.405 1.005L4 17h5m6 0a3 3 0 11-6 0m6 0H9" />
    </svg>
    <!--TODO: add logic for unread notifications-->
    <span id="notification-indicator" class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
  </div>
</header>