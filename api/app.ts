import { app } from "./index";
import { config } from "./config";

const port = Number(config.server.port) || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
