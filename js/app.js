(() => {
  const navItems = [...document.querySelectorAll(".nav-item")];
  const pages = [...document.querySelectorAll(".page")];
  const pageName = document.getElementById("page-name");

  function showPage(name) {
    pages.forEach(page => page.classList.toggle("active-page", page.id === `page-${name}`));
    navItems.forEach(item => item.classList.toggle("active", item.dataset.page === name));
    pageName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  navItems.forEach(item => item.addEventListener("click", () => showPage(item.dataset.page)));

  const input = document.getElementById("file-input");
  const dropzone = document.getElementById("dropzone");
  const browse = document.getElementById("browse-btn");
  const previewWrap = document.getElementById("preview-wrap");
  const sourcePreview = document.getElementById("source-preview");
  let currentObjectUrl = null;

  function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function loadImage(file) {
    if (!file || !file.type.startsWith("image/")) return;
    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = URL.createObjectURL(file);
    const probe = new Image();
    probe.onload = () => {
      sourcePreview.src = currentObjectUrl;
      document.getElementById("file-name").textContent = file.name;
      document.getElementById("dimensions").textContent = `${probe.naturalWidth} × ${probe.naturalHeight}`;
      document.getElementById("file-size").textContent = formatBytes(file.size);
      document.getElementById("file-format").textContent = file.type.replace("image/", "").toUpperCase();
      previewWrap.classList.remove("hidden");
      dropzone.classList.add("hidden");
    };
    probe.onerror = () => {
      URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = null;
      alert("The selected image could not be loaded.");
    };
    probe.src = currentObjectUrl;
  }

  browse.addEventListener("click", event => { event.stopPropagation(); input.click(); });
  dropzone.addEventListener("click", () => input.click());
  dropzone.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); input.click(); }
  });
  input.addEventListener("change", () => loadImage(input.files?.[0]));
  ["dragenter", "dragover"].forEach(type => dropzone.addEventListener(type, event => {
    event.preventDefault(); dropzone.classList.add("drag-active");
  }));
  ["dragleave", "drop"].forEach(type => dropzone.addEventListener(type, event => {
    event.preventDefault(); dropzone.classList.remove("drag-active");
  }));
  dropzone.addEventListener("drop", event => loadImage(event.dataTransfer.files?.[0]));
  document.getElementById("remove-image").addEventListener("click", () => {
    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
    sourcePreview.removeAttribute("src");
    input.value = "";
    previewWrap.classList.add("hidden");
    dropzone.classList.remove("hidden");
  });

  const modeNote = document.getElementById("mode-note");
  document.querySelectorAll(".segment").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach(item => item.classList.toggle("selected", item === button));
    modeNote.textContent = button.dataset.mode === "device"
      ? "Local processing is unavailable in this web preview. Native NCNN/Vulkan integration requires a compatible runtime."
      : "Cloud processing requires a secure server-side proxy. No API token is stored in this interface.";
  }));

  window.addEventListener("beforeunload", () => {
    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  });
})();