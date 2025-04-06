"use client";

import { useEffect } from "react";

export const FallingEffect = ({ type = "snow" }: { type?: "snow" | "heart" }) => {
  useEffect(() => {
    const createFallingElement = () => {
      const element = document.createElement("div");
      element.style.position = "fixed";
      element.style.top = "-50px";
      element.style.left = Math.random() * window.innerWidth + "px";
      element.style.zIndex = "9999";
      element.style.opacity = Math.random().toString();
      element.style.pointerEvents = "none";

      if (type === "snow") {
        element.style.width = element.style.height = Math.random() * 10 + 5 + "px";
        element.style.background = "white";
        element.style.borderRadius = "50%";
      } else if (type === "heart") {
        element.innerHTML = "❤️";
        element.style.fontSize = Math.random() * 20 + 10 + "px";
      }

      document.body.appendChild(element);

      let speed = Math.random() * 3 + 2;
      let horizontalSpeed = Math.random() * 2 - 1;

      const fallInterval = setInterval(() => {
        let topPosition = parseFloat(element.style.top) + speed;
        let leftPosition = parseFloat(element.style.left) + horizontalSpeed;

        element.style.top = topPosition + "px";
        element.style.left = leftPosition + "px";

        if (topPosition > window.innerHeight) {
          clearInterval(fallInterval);
          element.remove();
        }
      }, 30);
    };

    const interval = setInterval(createFallingElement, 200);

    return () => clearInterval(interval);
  }, [type]);

  return null; // Không hiển thị gì cả, chỉ chạy hiệu ứng
};

