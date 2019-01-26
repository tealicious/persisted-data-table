let Fernet = require("fernet");
import { q1 } from "@/consts";
export default function() {
  let secret = new Fernet.Secret(
    "TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM="
  );
  let message =
    "gAAAAABcXNwi_H1rH2bEFPZUWHbLrfFM2oYNjVIRCTn6hsyhaQEyMLIZ7ClAQKtgA5n8ffNcx-5JtHr6xqleNZu_cFXmAeDFKMCyNlbGxJpPU01PnO38AWl13gQWgBXewfsJETvkkqdP81EQ1yshKUM1zO1DrddxzePKlhIeVWdNpnGPUQC-3aUz1R3PYsplMd0X0uIspu6t";
  let token = new Fernet.Token({ secret: secret, token: message, ttl: 0 });
  return { q1: q1, q2: token.decode() }; // console.logging this in App.vue
}
