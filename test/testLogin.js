// @ts-nocheck

/**
 * Test the Login functionality using fetch
 */
async function testLogin() {
    console.log("Starting login tests...");
  
    // Positive Test: Successful login
    try {
      // Simulate a successful login
      const loginEmail = "test@example.com";
      const loginPassword = "ValidPass@123";
  
      const response = await fetch("http://localhost:3013/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          passwordHash: loginPassword,
        }),
      });
  
      if (response.status === 200) {
        console.log("✅ Test passed: Successful login.");
      } else {
        console.error(`❌ Test failed: Unexpected status code ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Test failed: Error during successful login.", error);
    }
  
    // Negative Test: Invalid credentials
    try {
      // Simulate login with invalid credentials
      const loginEmail = "wrong@example.com";
      const loginPassword = "WrongPass@123";
  
      const response = await fetch("http://localhost:3013/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          passwordHash: loginPassword,
        }),
      });
  
      if (response.status === 401) {
        console.log("✅ Test passed: Correctly handled invalid credentials.");
      } else {
        console.error(`❌ Test failed: Unexpected status code ${response.status}`);
      }
    } catch (error) {
      console.error(
        "❌ Test failed: Error during invalid credentials test.",
        error
      );
    }
  
    // Negative Test: Server error
    try {
      // Simulate a server error
      const loginEmail = "test@example.com";
      const loginPassword = "ValidPass@123";
  
      // Intentionally use a wrong URL to simulate a server error
      const response = await fetch("http://localhost:9999/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          passwordHash: loginPassword,
        }),
      });
  
      if (!response.ok) {
        console.log("✅ Test passed: Correctly handled server error.");
      } else {
        console.error("❌ Test failed: Server error test did not fail as expected.");
      }
    } catch (error) {
      console.log("✅ Test passed: Server error correctly handled.");
    }
  
    console.log("Login tests completed.");
  }
  
  // Run the test
  testLogin();
  