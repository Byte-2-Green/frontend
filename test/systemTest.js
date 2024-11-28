// @ts-nocheck
import http from 'http';
 
/**
 * Helper function to make HTTP GET requests
 */
const makeRequest = (hostname, port, path) =>
  new Promise((resolve, reject) => {
    const options = {
      hostname,
      port,
      path,
      method: 'GET',
    };
 
    const req = http.request(options, (res) => {
      resolve({
        statusCode: res.statusCode,
        path,
      });
    });
 
    req.on('error', (err) => {
      reject(err);
    });
 
    req.end();
  });
 
/**
 * Test function to verify multiple routes
 */
(async () => {
  const hostname = 'localhost'; // Replace with correct link
  const port = 3011; // Replace with correct port
  const routes = ['/foodForThought'];

  try {
    console.log('Starting route system test...');
 
    for (const route of routes) {
      console.log(`Testing route: ${route}`);
      const response = await makeRequest(hostname, port, route);
 
      if (response.statusCode === 200) {
        console.log(`✅ Success: Route ${response.path} returned 200 OK`);
      } else {
        throw new Error(`❌ Failure: Route ${response.path} returned ${response.statusCode}`);
      }
    }
 
    console.log('All routes passed successfully!');
  } catch (err) {
    console.error('System test failed:', err.message);
    process.exit(1); // Exit with a non-zero code to indicate failure
  }
})();