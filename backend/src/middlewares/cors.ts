import cors from "cors";

const corsOptions = {
  origin: "*", // veya belirli domain: ["http://localhost:3000"]
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
