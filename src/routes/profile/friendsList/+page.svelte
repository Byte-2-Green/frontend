<script>
    import Footer from "../../../components/Footer.svelte";
    import "../../../app.css";
    import Header from "../../../components/Header.svelte";

    let selectedTab = "stats";
</script>

<main class="bg-white min-h-screen flex flex-col">
    <Header />

    <div class="flex flex-col py-6 px-4">
        <h1 class="text-3xl font-bold mb-5">Your Friends</h1>

        <!-- Description -->
        <p class="text-lg max-w-lg -mb-8">
            Check out who of your friends already has an exibition live!
        </p>
    </div>

    <section class="p-4 text-gray-900">
        <ul role="list" class="max-w-sm divide-y divide-gray-700 m-2">
            <!-- User 1 -->
            <li class="py-4">
                <div class="flex items-center gap-4">
                    <div class="flex-shrink-0">
                        <img
                            class="w-10 h-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=80&h=80&q=80"
                            alt="Neil Sims"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold truncate">
                            Neil Sims
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                            neil.sims@email.com
                        </p>
                    </div>
                    <span
                        class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                    >
                        <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                        Exhibition <br>Available
                    </span>
                </div>
            </li>
    
            <!-- User 2 -->
            <li class="py-4">
                <div class="flex items-center gap-4">
                    <div class="flex-shrink-0">
                        <img
                            class="w-10 h-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=80&h=80&q=80"
                            alt="Bonnie Green"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold truncate">
                            Bonnie Green
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                            bonnie.green@email.com
                        </p>
                    </div>
                    <span
                        class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                    >
                        <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                        Exhibition <br> Unavailable
                    </span>
                </div>
            </li>

            <!-- User 3 -->
            <li class="py-4">
                <div class="flex items-center gap-4">
                    <div class="flex-shrink-0">
                        <img
                            class="w-10 h-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=80&h=80&q=80"
                            alt="Neil Sims"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold truncate">
                            Neil Sims
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                            neil.sims@email.com
                        </p>
                    </div>
                    <span
                        class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                    >
                        <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                        Exhibition <br>Available
                    </span>
                </div>
            </li>
    
            <!-- User 4 -->
            <li class="py-4">
                <div class="flex items-center gap-4">
                    <div class="flex-shrink-0">
                        <img
                            class="w-10 h-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=80&h=80&q=80"
                            alt="Bonnie Green"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold truncate">
                            Bonnie Green
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                            bonnie.green@email.com
                        </p>
                    </div>
                    <span
                        class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                    >
                        <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                        Exhibition <br> Unavailable
                    </span>
                </div>
            </li>

            <!-- User 5 -->
            <li class="py-4">
                <div class="flex items-center gap-4">
                    <div class="flex-shrink-0">
                        <img
                            class="w-10 h-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=80&h=80&q=80"
                            alt="Bonnie Green"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold truncate">
                            Bonnie Green
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                            bonnie.green@email.com
                        </p>
                    </div>
                    <span
                        class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                    >
                        <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                        Exhibition <br> Unavailable
                    </span>
                </div>
            </li>
        </ul>
    </section>
    
    <Footer />
</main>
