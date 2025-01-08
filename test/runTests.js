// @ts-nocheck
import { exec } from 'child_process';
 
/**
 * Helper function to execute a test script
 */
const runTest = (script) =>
  new Promise((resolve, reject) => {
    console.log(`Running: ${script}`);
    exec(`node ${script}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Test failed: ${script}\n`, stderr);
        reject(error);
      } else {
        console.log(`✅ Test passed: ${script}\n`, stdout);
        resolve();
      }
    });
  });
 
(async () => {
  try {
    // Run foodForThought.test.js (unit test for foodForThought)
    await runTest('test/foodForThought.test.js'); 

    //Run unit test for the feedback form
    await runTest('test/testFeedback.js');
   
    // Run system test
    await runTest('test/systemTest.js');
    
    await runTest('test/testFeedback.js');

    console.log('🎉 All tests passed!');
  } catch (err) {
    console.error('❌ One or more tests failed!', err.message);
    process.exit(1); // Exit with non-zero status code
  }
})();
