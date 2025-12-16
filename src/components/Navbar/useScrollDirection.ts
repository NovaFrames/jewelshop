import { useEffect, useState } from "react";

export const useScrollDirection = () => {
    const [direction, setDirection] = useState<"up" | "down">("up");

    useEffect(() => {
        let lastY = window.scrollY;

        const onScroll = () => {
            const currentY = window.scrollY;
            if (Math.abs(currentY - lastY) < 10) return;

            setDirection(currentY > lastY ? "down" : "up");
            lastY = currentY;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return direction;
};
