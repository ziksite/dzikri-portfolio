/* LAPAK — perilaku dasar prototype. Tanpa dependensi selain Lucide (opsional). */
(function () {
  "use strict";

  /* 1. Router layar: <section data-screen="home">, link <a href="#booking"> */
  function route() {
    var screens = document.querySelectorAll("[data-screen]");
    if (!screens.length) return;
    var id = decodeURIComponent(location.hash.slice(1));
    var target = id && document.querySelector('[data-screen="' + id + '"]');
    if (!target) target = screens[0];
    screens.forEach(function (s) { s.classList.toggle("is-active", s === target); });
    var name = target.getAttribute("data-screen");
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("data-nav") === name);
    });
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);

  /* 2. Grup pilihan tunggal: tab, segmented, slot, chip, kalender, tile.
        <div data-select> anak-anak dengan [data-value] → .is-active / .is-selected */
  document.addEventListener("click", function (e) {
    var item = e.target.closest("[data-select] > *, [data-select] [data-option]");
    if (!item || item.disabled || item.classList.contains("is-full") || item.classList.contains("is-off")) return;
    var group = item.closest("[data-select]");
    var cls = group.getAttribute("data-select") || "is-active";
    var multi = group.hasAttribute("data-multi");
    if (multi) item.classList.toggle(cls);
    else group.querySelectorAll("." + cls).forEach(function (el) { el.classList.remove(cls); });
    if (!multi) item.classList.add(cls);
    group.dispatchEvent(new CustomEvent("lapak:select", { bubbles: true, detail: { item: item, value: item.getAttribute("data-value") } }));

    /* Tab panel: data-tabs="grup" + data-value="x" ↔ data-panel="grup:x" */
    var tabs = group.getAttribute("data-tabs");
    if (tabs) {
      document.querySelectorAll('[data-panel^="' + tabs + ':"]').forEach(function (p) {
        p.hidden = p.getAttribute("data-panel") !== tabs + ":" + item.getAttribute("data-value");
      });
    }
  });

  /* 3. Stepper jumlah: <div class="stepper" data-stepper data-min="0" data-max="99"> */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-stepper] button");
    if (!btn) return;
    var box = btn.closest("[data-stepper]");
    var out = box.querySelector("output, input");
    var min = Number(box.getAttribute("data-min") || 0);
    var max = Number(box.getAttribute("data-max") || 999);
    var v = Number(out.value || out.textContent || 0) + (btn.hasAttribute("data-inc") ? 1 : -1);
    v = Math.max(min, Math.min(max, v));
    if ("value" in out && out.tagName === "INPUT") out.value = v; else out.textContent = v;
    box.dispatchEvent(new CustomEvent("lapak:change", { bubbles: true, detail: { value: v } }));
  });

  /* 4. Form demo: submit → sembunyikan form, tampilkan [data-success] di dalam/target */
  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form.matches("[data-demo-form]")) return;
    e.preventDefault();
    var sel = form.getAttribute("data-demo-form");
    var ok = sel ? document.querySelector(sel) : form.parentElement.querySelector("[data-success]");
    if (ok) { form.hidden = true; ok.hidden = false; }
  });

  /* 5. Gambar: <div class="img" data-img="assets/slug/hero.jpg"> → muat bila filenya ada */
  function loadImages() {
    document.querySelectorAll(".img[data-img]").forEach(function (box) {
      if (box.classList.contains("is-loaded")) return;
      var src = box.getAttribute("data-img");
      var img = new Image();
      img.alt = box.getAttribute("data-alt") || "";
      img.decoding = "async";
      img.onload = function () { box.appendChild(img); box.classList.add("is-loaded"); };
      img.src = src;
    });
  }

  /* 6. Format rupiah, dipakai skrip halaman */
  window.rupiah = function (n) { return "Rp" + Math.round(n).toLocaleString("id-ID"); };

  function init() {
    route();
    loadImages();
    if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.75 } });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
