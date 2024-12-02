// @ts-nocheck
import http from "http";

// Function to check if the server is running on localhost:5173
function testServer() {
  http
    .get("http://localhost:5173", (response) => {
      const { statusCode } = response;

      // Check if the status code is 200
      if (statusCode === 200) {
        console.log("Test passed: Server responded with status code 200");
      } else {
        console.error(
          `Test failed: Server responded with status code ${statusCode}`
        );
      }
    })
    .on("error", (err) => {
      console.error(
        `Test failed: Could not connect to the server. Error: ${err.message}`
      );
    });
}

// Run the test
testServer();

async function testApi() {
  try {
    const response = await fetch("http://localhost:3011/foodForThought");

    // Check if the status code is 200
    if (response.status === 200) {
      const data = await response.text();

      // Check if the response data is not null
      if (data !== null && data !== "") {
        console.log("Test passed: API responded with a non-null value");
      } else {
        console.error("Test failed: API responded with null or empty value");
      }
    } else {
      console.error(
        `Test failed: Server responded with status code ${response.status}`
      );
    }
  } catch (err) {
    console.error(
      `Test failed: Could not connect to the server. Error: ${err.message}`
    );
  }
}

testApi();