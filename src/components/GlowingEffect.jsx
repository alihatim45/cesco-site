"use client";

import { useEffect } from "react";
import "./glowing-effect.css";

const CARD_SELECTORS = [
  ".card-hover",
  ".modern-surface",
  ".service-feature-card",
  ".product-spotlight-card",
  ".project-feature",
  ".project-thumbnail",
  ".inner-service-card",
  ".inner-product-card",
  ".about-story-panel",
  ".about-value-card",
  ".about-info-panel",
  ".contact-info-panel",
  ".project-gallery-card",
  ".calculator-primary-card",
  ".catalog-intro",
  ".catalog-cta",
  ".product-description-panel",
  "main article",
  "main div[class*='rounded-'][class*='shadow'][class*='bg-']",
  "main div[class*='rounded-'][class*='border'][class*='bg-']",
  "[data-glow-card]",
].join(",");

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/** One delegated pointer listener drives the glow for every card on the site. */
export default function GlowingEffect() {
  useEffect(() => {
    const cards = new Set();
    const canTrackPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let collectionFrame = 0;
    let pointerX = -10000;
    let pointerY = -10000;

    const collectCards = () => {
      collectionFrame = 0;
      document.querySelectorAll(CARD_SELECTORS).forEach((card) => {
        if (card.matches("a, button") || card.closest("header, nav, footer")) return;
        const rect = card.getBoundingClientRect();
        if (rect.width < 180 || rect.height < 100) return;
        card.classList.add("cesco-glow-card");
        if (!card.querySelector(":scope > .cesco-glow-layer")) {
          const layer = document.createElement("span");
          layer.className = "cesco-glow-layer";
          layer.setAttribute("aria-hidden", "true");
          card.appendChild(layer);
        }
        cards.add(card);
      });
    };

    const scheduleCollection = () => {
      if (!collectionFrame) collectionFrame = window.requestAnimationFrame(collectCards);
    };

    const paint = () => {
      frame = 0;
      if (!canTrackPointer.matches || reduceMotion.matches) return;
      cards.forEach((card) => {
        if (!card.isConnected) {
          cards.delete(card);
          return;
        }
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const proximity = Math.max(80, Math.min(170, Math.max(rect.width, rect.height) * 0.38));
        const edgeX = Math.max(rect.left - pointerX, 0, pointerX - rect.right);
        const edgeY = Math.max(rect.top - pointerY, 0, pointerY - rect.bottom);
        const active = clamp(1 - Math.hypot(edgeX, edgeY) / proximity, 0, 1);
        if (active <= 0) {
          card.style.setProperty("--cesco-glow-active", "0");
          return;
        }
        const angle = (Math.atan2(pointerY - centerY, pointerX - centerX) * 180) / Math.PI + 90;
        card.style.setProperty("--cesco-glow-active", active.toFixed(3));
        card.style.setProperty("--cesco-glow-angle", `${angle.toFixed(2)}deg`);
        card.style.setProperty("--cesco-glow-x", `${clamp(pointerX - rect.left, 0, rect.width).toFixed(1)}px`);
        card.style.setProperty("--cesco-glow-y", `${clamp(pointerY - rect.top, 0, rect.height).toFixed(1)}px`);
      });
    };

    const schedulePaint = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const onPointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      schedulePaint();
    };
    const clear = () => cards.forEach((card) => card.style.setProperty("--cesco-glow-active", "0"));

    scheduleCollection();
    const observer = new MutationObserver(scheduleCollection);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", clear);
    window.addEventListener("scroll", schedulePaint, { passive: true });
    window.addEventListener("resize", schedulePaint, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", clear);
      window.removeEventListener("scroll", schedulePaint);
      window.removeEventListener("resize", schedulePaint);
      if (frame) window.cancelAnimationFrame(frame);
      if (collectionFrame) window.cancelAnimationFrame(collectionFrame);
      cards.forEach((card) => {
        card.querySelector(":scope > .cesco-glow-layer")?.remove();
        card.classList.remove("cesco-glow-card");
        ["--cesco-glow-active", "--cesco-glow-angle", "--cesco-glow-x", "--cesco-glow-y"].forEach((name) => card.style.removeProperty(name));
      });
    };
  }, []);

  return null;
}