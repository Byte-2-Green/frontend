<script>
    // @ts-nocheck
    // @ts-ignore

    import axios from "axios";
    import { goto } from "$app/navigation";
    import "../app.css";
    let signUpFullName = "";
    let signUpEmail = "";
    let signUpPassword = "";
    let signUpErrorMessage = "";
    let signUpSuccessMessage = "";
    let fieldErrors = { fullName: "", email: "", password: "" };
    let loginEmail = "";
    let loginPassword = "";
    let loginErrorMessage = "";
    let showLoginPopup = false;

    const isPasswordStrong = (password: string): boolean => {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return strongPasswordRegex.test(password);
    };

    const validateFields = (): boolean => {
      let isValid = true;
      // Reset errors
      fieldErrors = { fullName: "", email: "", password: "" };
      if (!signUpFullName.trim()) {
        fieldErrors.fullName = "Name is required.";
        isValid = false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signUpEmail)) {
        fieldErrors.email = "Please enter a valid email address.";
        isValid = false;
      }
      if (!isPasswordStrong(signUpPassword)) {
        fieldErrors.password = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
        isValid = false;
      }
      return isValid;
    };

    const handleSignUp = async () => {
      if (!validateFields()) {
        return;
      }
      try {
        const response = await axios.post("http://localhost:3013/users", {
          fullName: signUpFullName,
          email: signUpEmail,
          username: signUpFullName,
          passwordHash: signUpPassword,
        });
        if (response.status === 201) {
          signUpSuccessMessage = "Account created successfully! You can now log in.";
          signUpErrorMessage = "";
        }
      } catch (err: any) {
        signUpErrorMessage = err.response?.data?.message || "Sign up failed due to an unexpected error.";
      }
    };

    const handleLogin = async () => {
      try {
        const response = await axios.post("http://localhost:3013/login", {
          email: loginEmail,
          passwordHash: loginPassword,
        });
        if (response.status === 200) {
          goto("http://localhost:5173/main");
        }
      } catch (err: any) {
        loginErrorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      }
    };
  </script>
  
  <section class="min-h-screen flex flex-col">
    <!-- Content -->
    <div class="flex flex-col items-center justify-center flex-grow bg-moody-dark py-10 p-8">
        <h1 class="text-2xl font-bold text-white mb-2">Welcome to MuseTrail!</h1>
        <p class="text-gray-600 mb-6">Register your account</p>
  
        <form on:submit|preventDefault={handleSignUp}>
          <div class="mb-4">
            <label for="fullName" class="block text-sm font-medium text-gray-400">Name <span class="text-red-500">*</span></label>
            <input
              id="fullName"
              type="text"
              bind:value={signUpFullName}
              placeholder="Enter your full name"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              required
            />
            {#if fieldErrors.fullName}
              <p class="text-red-500 text-sm mt-1">{fieldErrors.fullName}</p>
            {/if}
          </div>
  
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-400">Email <span class="text-red-500">*</span></label>
            <input
              id="email"
              type="email"
              bind:value={signUpEmail}
              placeholder="Enter your email"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              required
            />
            {#if fieldErrors.email}
              <p class="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
            {/if}
          </div>
  
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-400">Password <span class="text-red-500">*</span></label>
            <input
              id="password"
              type="password"
              bind:value={signUpPassword}
              placeholder="8+ characters, with upper/lowercase, a number, and special character"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              required
            />
            {#if fieldErrors.password}
              <p class="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
            {/if}
          </div>
  
          {#if signUpErrorMessage}
            <p class="text-red-500 text-sm mb-4">{signUpErrorMessage}</p>
          {/if}
  
          {#if signUpSuccessMessage}
            <p class="text-green-500 text-sm mb-4">{signUpSuccessMessage}</p>
          {/if}
  
          <button
            type="submit"
            class="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark"
            disabled={!validateFields()}
          >
            Sign Up
          </button>
        </form>
  
        <div class="text-center mt-4">
          <p class="text-sm text-gray-600">
            <!-- svelte-ignore a11y_invalid_attribute -->
            Already have an account? <a href="" class="text-primary font-medium" on:click={() => showLoginPopup = true}>Sign In</a>
          </p>
        </div>
    </div>
  
    <!-- Login Popup -->
    {#if showLoginPopup}
      <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md m-5">
          <h2 class="text-lg font-bold mb-4">Login</h2>
          <form on:submit|preventDefault={handleLogin}>
            <div class="mb-4">
              <label for="loginEmail" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="loginEmail"
                type="email"
                bind:value={loginEmail}
                placeholder="Enter your email"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div class="mb-4">
              <label for="loginPassword" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="loginPassword"
                type="password"
                bind:value={loginPassword}
                placeholder="Enter your password"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>
            {#if loginErrorMessage}
              <p class="text-red-500 text-sm mb-4">{loginErrorMessage}</p>
            {/if}
            <div class="flex justify-end">
              <button
                type="button"
                class="bg-gray-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-600 mr-2"
                on:click={() => { showLoginPopup = false; loginErrorMessage = ""; }}
              >
                Cancel
              </button>
              <button
                type="submit"
                class="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    {/if}
  </section>