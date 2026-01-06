import "./style.css";
import { nanoid } from "nanoid";
import Alpine from "alpinejs";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  Alpine.data("sluggerApp", () => ({
    message: "", // What the user is typing
    result: "", // The generated slug
    copied: false,

    slugify() {
      if (!this.message.trim()) return;

      const slug = this.message
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      // Set the result and clear the input
      this.result = `${slug}-${nanoid(6)}`;
      this.message = "";
      this.copied = false;
    },

    async copy() {
      if (!this.result) return;
      await navigator.clipboard.writeText(this.result);
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    },
  }));
});

Alpine.start();
