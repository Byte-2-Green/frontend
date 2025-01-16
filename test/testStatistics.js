// @ts-nocheck

/**
 * Test for Statistics functionality using fetch
 */
async function testStatistics() {
    console.log("Starting statistics tests...");
  
    // Positive Test: Fetch User by ID
    try {
      const userId = 1;
      const response = await fetch(`http://localhost:3010/users/user/${userId}`);
  
      if (response.ok) {
        const user = await response.json();
        console.log("✅ Test passed: Fetched user by ID successfully.", user);
      } else {
        console.error(
          `❌ Test failed: Fetch user by ID returned status ${response.status}.`
        );
      }
    } catch (error) {
      console.error("❌ Test failed: Error during fetch user by ID test.", error);
    }
  
    // Positive Test: Fetch Accepted Challenges
    try {
      const response = await fetch(
        "http://localhost:3010/challenges/accepted-challenges"
      );
  
      if (response.ok) {
        const acceptedChallenges = await response.json();
        if (Array.isArray(acceptedChallenges) && acceptedChallenges.length > 0) {
          console.log(
            "✅ Test passed: Fetched accepted challenges successfully.",
            acceptedChallenges
          );
        } else {
          console.error("❌ Test failed: No accepted challenges found.");
        }
      } else {
        console.error(
          `❌ Test failed: Fetch accepted challenges returned status ${response.status}.`
        );
      }
    } catch (error) {
      console.error(
        "❌ Test failed: Error during fetch accepted challenges test.",
        error
      );
    }
  
    // Positive Test: Fetch Denied Challenges
    try {
      const response = await fetch(
        "http://localhost:3010/challenges/denied-challenges"
      );
  
      if (response.ok) {
        const deniedChallenges = await response.json();
        if (Array.isArray(deniedChallenges) && deniedChallenges.length > 0) {
          console.log(
            "✅ Test passed: Fetched denied challenges successfully.",
            deniedChallenges
          );
        } else {
          console.error("❌ Test failed: No denied challenges found.");
        }
      } else {
        console.error(
          `❌ Test failed: Fetch denied challenges returned status ${response.status}.`
        );
      }
    } catch (error) {
      console.error(
        "❌ Test failed: Error during fetch denied challenges test.",
        error
      );
    }
  
    // Test: Calculate CO2 Saved Percentage
    try {
      const totalAccepted = 10;
      const totalDenied = 5;
  
      const totalCO2Saved = (totalAccepted / (totalAccepted + totalDenied)) * 100;
  
      if (totalCO2Saved === 66.66666666666666) {
        console.log("✅ Test passed: CO2 saved percentage calculated correctly.");
      } else {
        console.error(
          `❌ Test failed: CO2 saved percentage calculation incorrect. Value: ${totalCO2Saved}`
        );
      }
    } catch (error) {
      console.error("❌ Test failed: Error during CO2 saved percentage calculation test.", error);
    }
  
    console.log("Statistics tests completed.");
  }
  
  // Run the test
  testStatistics();
  