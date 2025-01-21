// @ts-nocheck
import { exec } from 'child_process';
 
const server = exec("npm run preview", { shell: true });

server.stdout.on("data", (data) => {
  console.log(data);

  if (data.includes("Local:")) {
    console.log("Server is running, starting tests...");

    exec("nyc mocha", (err, stdout, stderr) => {
      if (err) {
        console.error(`Error running tests: ${stderr}`);
        process.exit(1);
      } else {
        console.log(stdout);
        process.exit(0);
      }
    });
  }
});

server.stderr.on("data", (data) => {
  console.error(`Server error: ${data}`);
});

process.on("exit", () => {
  server.kill();
});
