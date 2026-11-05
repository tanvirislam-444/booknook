"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

const SmoothScroll = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    return (
<ReactLenis
root
options={
    {
        lerp:0.1,
        duration:1.2,
        smoothWheel:true,
    prevent: (node) =>
    node.closest("[data-lenis-prevent]") !== null,
    }

}
>
    {children}
</ReactLenis>
    );
};

export default SmoothScroll;