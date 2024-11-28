// @ts-nocheck
import http from 'http';

(async () => {
  try {
    const appUrl = 'http://localhost:5173';
    const response = await new Promise((resolve, reject) => {
      const req = http.get(appUrl, (res) => {
        resolve(res);
      });
      req.on('error', (err) => {
        reject(err);
      });
    });

    if (response.statusCode === 200) {
      console.log('Smoke test passed: App is running successfully!');
    } else {
      throw new Error(`Unexpected status code: ${response.statusCode}`);
    }
  } catch (err) {
    console.error('Smoke test failed for App:', err.message);
    process.exit(1);
  }
})();

const apiUrl = 'http://localhost:3011/foodForThought';

(async () => {
  try {
    const response = await new Promise((resolve, reject) => {
      const req = http.get(apiUrl, (res) => {
        resolve(res);
      });
      req.on('error', (err) => {
        reject(err);
      });
    });

    if (response.statusCode === 200) {
      console.log(`Smoke test passed: API is up and responding correctly at ${apiUrl}`);
    } else {
      throw new Error(`Unexpected status code: ${response.statusCode}`);
    }
  } catch (err) {
    console.error('Smoke test failed for API:', err.message);
    process.exit(1);
  }
})();
