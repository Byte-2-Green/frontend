<script>
    // @ts-nocheck
    // @ts-ignore

    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let unreadNotifications = [];
    let showPopup = false;
    let notificationIdCounter = 0;

    // Simulate fetching predefined notifications from the database
    async function fetchNotifications() {
        try {
            const notifRes = await fetch(
                "http://localhost:3010/challenges/notifications",
            );
            const predefinedNotifications = await notifRes.json();

            setInterval(() => {
                if (
                    unreadNotifications.length < predefinedNotifications.length
                ) {
                    // Spawn new notification if not all have been added
                    const newNotif =
                        predefinedNotifications[notificationIdCounter];
                    unreadNotifications = [
                        ...unreadNotifications,
                        { ...newNotif, id: notificationIdCounter, read: false },
                    ];
                    notificationIdCounter++;
                }
            }, 100000);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    }

    // Toggle popup visibility
    function togglePopup() {
        showPopup = !showPopup;
    }

    // Mark notification as read and redirect to the challenge
    function markAsReadAndRedirect(notificationId) {
        unreadNotifications = unreadNotifications.filter(
            (notif) => notif.id !== notificationId,
        ); // Remove notification from list
        goto("/challenges"); // Redirect to the challenge
        closePopup(); // Close the popup
    }

    // Close the popup
    function closePopup() {
        showPopup = false;
    }

    onMount(() => {
        fetchNotifications();
    });
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
        {#if unreadNotifications.length > 0}
            <span
                class="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-red-500 rounded-full"
            >
                {unreadNotifications.length}
            </span>
        {/if}
    </button>

    <!-- Popup -->
    {#if showPopup}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
            on:click={closePopup}
        >
            <div
                class="bg-black rounded-lg shadow-lg p-4 w-96 max-h-80 overflow-y-auto m-4"
                on:click|stopPropagation
            >
                <!-- Header: "Notifications" -->
                <h2 class="text-white text-2xl font-semibold mb-4">
                    Notifications
                </h2>

                {#if unreadNotifications.length > 0}
                    {#each unreadNotifications as notif}
                        <div
                            class="notification-item p-4 mb-4 rounded-lg"
                            class:bg-gray-800={notif.read === false}
                        >
                            <h3 class="font-semibold text-lg text-white">
                                {notif.Title}
                                <!-- Make sure this key matches the structure of your data -->
                            </h3>
                            <p class="text-sm text-gray-300">
                                {notif.Description}
                                <!-- Make sure this key matches the structure of your data -->
                            </p>
                            {#if notif.timestamp}
                                <span class="text-xs text-gray-500"
                                    >{notif.timestamp}</span
                                >
                            {/if}

                            <button
                                class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                                on:click={() => markAsReadAndRedirect(notif.id)}
                            >
                                View Challenge
                            </button>
                        </div>
                    {/each}
                {:else}
                    <p class="p-4 text-center text-gray-500">
                        No unread notifications
                    </p>
                {/if}
            </div>
        </div>
    {/if}
</div>
