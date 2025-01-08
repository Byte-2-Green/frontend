// @ts-nocheck

/**
 * Test the Feedback endpoint
 * (POST /challenges/challenges/feedback?rating=...&Challenge_ID=...&feedback_text=...)
 */
async function testFeedback() {
  const rating = 4;
  const challengeID = 1;
  const feedbackText = "TestingFeedback";

  // Construct the query URL
  const feedbackUrl = `http://localhost:3010/challenges/challenges/feedback?rating=${rating}&Challenge_ID=${challengeID}&feedback_text=${encodeURIComponent(
    feedbackText
  )}`;

  try {
    // Make the POST request
    const response = await fetch(feedbackUrl, { method: "POST" });

    // Check status code
    if (response.status === 201) {
      console.log("Test passed: Feedback endpoint responded with status 201");
      const data = await response.json();

      // Check if the server returned the correct success message
      if (data.message && data.message.includes("Feedback saved")) {
        console.log("Test passed: Feedback was successfully saved");
      } else {
        console.error(
          `Test failed: Unexpected response or message from server: ${JSON.stringify(
            data
          )}`
        );
      }
    } else {
      console.error(
        `Test failed: Feedback endpoint responded with status code ${response.status}`
      );
    }
  } catch (err) {
    console.error(
      `Test failed: Could not connect to the server. Error: ${err.message}`
    );
  }
}

// Run the test
testFeedback();
