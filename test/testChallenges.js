// @ts-nocheck

/**
 * Test for Challenge functionality using fetch
 */
async function testChallenges() {
    console.log("Starting challenge tests...");
  
    // Test: Fetch all challenges
    try {
      console.log("Testing fetch all challenges...");
      const response = await fetch("http://localhost:3010/challenges/challenges");
  
      console.log(`Response status: ${response.status}`);
      if (response.ok) {
        const challenges = await response.json();
        console.log("Fetched data:", challenges);
  
        if (Array.isArray(challenges) && challenges.length > 0) {
          console.log("✅ Test passed: Fetched all challenges successfully.");
        } else {
          console.error("❌ Test failed: No challenges found.");
        }
      } else {
        console.error(
          `❌ Test failed: Fetch challenges returned status ${response.status}.`
        );
      }
    } catch (error) {
      console.error("❌ Test failed: Error during fetch challenges test.", error);
    }
  
    // Test: Fetch denied challenges
    try {
      console.log("Testing fetch denied challenges...");
      const response = await fetch("http://localhost:3010/challenges/denied-challenges");
  
      console.log(`Response status: ${response.status}`);
      if (response.ok) {
        const deniedChallenges = await response.json();
        console.log("Fetched data:", deniedChallenges);
  
        if (Array.isArray(deniedChallenges)) {
          console.log("✅ Test passed: Fetched denied challenges successfully.");
        } else {
          console.error("❌ Test failed: Denied challenges data is not valid.");
        }
      } else {
        console.error(
          `❌ Test failed: Fetch denied challenges returned status ${response.status}.`
        );
      }
    } catch (error) {
      console.error("❌ Test failed: Error during fetch denied challenges test.", error);
    }
  
    // Test: Accept a challenge
    try {
      console.log("Testing accept challenge...");
      const challengeId = 1; // Replace with a valid challenge ID
      const response = await fetch(
        `http://localhost:3010/challenges/challenges/accept/${challengeId}`,
        { method: "POST" }
      );
  
      console.log(`Response status: ${response.status}`);
      if (response.ok) {
        console.log(`✅ Test passed: Challenge ${challengeId} accepted successfully.`);
      } else {
        console.error(
          `❌ Test failed: Accept challenge returned status ${response.status}.`
        );
      }
    } catch (error) {
      console.error("❌ Test failed: Error during accept challenge test.", error);
    }
  
    // Test: Deny a challenge
    try {
      console.log("Testing deny challenge...");
      const challengeId = 2; // Replace with a valid challenge ID
      const response = await fetch(
        `http://localhost:3010/challenges/challenges/deny/${challengeId}`,
        { method: "POST" }
      );
  
      console.log(`Response status: ${response.status}`);
      if (response.ok) {
        console.log(`✅ Test passed: Challenge ${challengeId} denied successfully.`);
      } else {
        console.error(
          `❌ Test failed: Deny challenge returned status ${response.status}.`
        );
      }
    } catch (error) {
      console.error("❌ Test failed: Error during deny challenge test.", error);
    }
  
    console.log("Challenge tests completed.");
  }
  
  // Run the test
  testChallenges();
  