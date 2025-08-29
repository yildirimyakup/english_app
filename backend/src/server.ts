import app from "./app.js";

const TAG = "Server.ts : ";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(TAG, `Server running on port ${PORT}`);
});
