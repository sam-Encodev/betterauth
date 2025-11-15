import { app } from "./index";
import { config } from "./config";

const port = config.server.port || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
