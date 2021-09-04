import {
  createCollege,
  createCourse,
  createCredential,
  updateCourse,
  updateCredential,
} from "./college.js";

console.log("Running client.");

createCollege().then(() => {
  console.log("Success");
  createCourse().then(() => {
    console.log("Success");
    updateCourse().then(() => {
      console.log("Success");
      createCredential().then(() => {
        console.log("Success");
        updateCredential().then(() => {
          console.log("Success");
          process.exit();
        });
      });
    });
  });
});
