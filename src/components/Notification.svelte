<script>
    import { onMount } from "svelte";

    export let notifications = [];
    export let unreadNotifications = [];
    let showPopup = false;

    onMount(async () => {
        try {
            const notifRes = await fetch(
                `http://localhost:3010/challenges/notifications`
            );
            notifications = await notifRes.json();
            unreadNotifications = notifications.map((notif) => ({
                ...notif,
                read: false,
            }));
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    });

    function togglePopup() {
        showPopup = !showPopup;
    }

    function markAsRead(index) {
        unreadNotifications[index].read = true;
    }

    function closePopup() {
        showPopup = false;
    }
</script>

<!-- Notification Icon -->
<div class="relative">
    <button class="relative" on:click={togglePopup}>
        <!-- Icon -->
        <svg
            class="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405C17.937 14.158 17 12.62 17 11V7a5 5 0 10-10 0v4c0 1.62-.937 3.158-2.595 4.595L3 17h5m0 0v1a3 3 0 006 0v-1m-6 0h6"
            ></path>
        </svg>

        <!-- Notification Badge -->
        {#if unreadNotifications.some((notif) => !notif.read)}
            <span
                class="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-red-500 rounded-full"
            >
                {unreadNotifications.filter((notif) => !notif.read).length}
            </span>
        {/if}
    </button>

    <!-- Popup -->
    {#if showPopup}
        <div
            class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
            on:click={closePopup}
        >
            <div
                class="bg-black rounded-lg shadow-lg p-4 w-80 max-h-64 overflow-y-auto"
                on:click|stopPropagation
            >
                {#if unreadNotifications.length > 0}
                    {#each unreadNotifications as notif, index}
                        <button
                            class="p-4 hover:bg-gray-100 cursor-pointer"
                            on:click={() => markAsRead(index)}
                        >
                            <h3 class="font-semibold text-lg text-white">{notif.Title}</h3>
                            <p class="text-sm text-white">{notif.Description}</p>
                            {#if notif.timestamp}
                                <span class="text-xs text-gray-500"
                                    >{notif.timestamp}</span
                                >
                            {/if}
                        </button>
                    {/each}
                {:else}
                    <p class="p-4 text-center text-gray-500">No notifications</p>
                {/if}
            </div>
        </div>
    {/if}
</div>
