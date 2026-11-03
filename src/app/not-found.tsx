
"use client";


import Link from "next/link";
import styled from "styled-components";

const NotFound = () => {
  return (
    <StyledWrapper>
      <main className="not-found">
        <div className="content">
          {/* Animated Book */}
          <div className="scene" role="status" aria-label="Page not found">
            <div className="book" aria-hidden="true">
              <div className="stack">
                <div className="back-cover" />
                <div className="page" />
                <div className="page" />
                <div className="page" />
                <div className="page" />
                <div className="page" />
                <div className="page" />
                <div className="cover" />
              </div>
            </div>
          </div>

          {/* 404 Text */}
          <div className="text-content">
            <span className="error-label">OOPS! PAGE NOT FOUND</span>

            <h1>404</h1>

            <h2>Lost in the pages?</h2>

            <p>
              Looks like this page has wandered off the bookshelf.
              Don&apos;t worry, there are plenty of wonderful stories
              waiting for you on our homepage.
            </p>

            <Link href="/" className="home-btn">
              <span>←</span> Back to Home
            </Link>

            <div className="bottom-text">
              <span>BOOKNOOK</span>
              <span>Every book has a story.</span>
            </div>
          </div>
        </div>
      </main>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  * {
    box-sizing: border-box;
  }

  .not-found {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
    background: #faf5ec;
    overflow: hidden;
  }

  .content {
    width: 100%;
    max-width: 1050px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 55px;
  }

  /* BOOK ANIMATION */

  .scene {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 380px;
    perspective: 1200px;
    animation: appear 1s ease both;
  }

  .book {
    --w: 113px;
    --h: 170px;
    --dur: 4s;
    --cover: #873e23;
    --paper: #faf5ec;
    --paper-back: #f6f0e4;
    --endpaper: #e8e0d0;
    --ink: rgba(160, 130, 90, 0.25);
    --foil: rgba(180, 210, 255, 0.55);

    position: relative;
    width: 260px;
    height: 200px;
    transform-style: preserve-3d;
    animation: bob var(--dur) ease-in-out infinite;
  }

  @keyframes bob {
    0%, 100% {
      transform: rotateX(28deg) rotateY(-10deg);
    }
    50% {
      transform: rotateX(28deg) rotateY(-10deg) translateY(-12px);
    }
  }

  .stack {
    position: absolute;
    top: 5px;
    left: 50%;
    width: var(--w);
    height: var(--h);
    transform: translateZ(10px);
    transform-style: preserve-3d;
  }

  .stack > * {
    position: absolute;
    inset: 0;
    transform-origin: left center;
    transform-style: preserve-3d;
    will-change: transform;
    animation: var(--dur) ease-in-out infinite;
  }

  .stack > *::before,
  .stack > *::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 0 3px 3px 0;
    backface-visibility: hidden;
    background-repeat: no-repeat;
    transform: translateZ(var(--z, 0px));
  }

  .stack > *::after {
    transform: translateZ(var(--z, 0px)) rotateY(180deg);
  }

  .page::before,
  .page::after,
  .cover::after {
    background-image:
      repeating-linear-gradient(var(--ink) 0 2px, #0000 0 40px),
      repeating-linear-gradient(#0000 0 10px, var(--ink) 0 12px, #0000 0 40px),
      repeating-linear-gradient(#0000 0 20px, var(--ink) 0 22px, #0000 0 40px),
      repeating-linear-gradient(#0000 0 30px, var(--ink) 0 32px, #0000 0 40px);
    background-position: 10px 12px;
    background-size:
      93px var(--rows),
      70px var(--rows),
      57px var(--rows),
      86px var(--rows);
  }

  .page::before {
    --rows: 110px;
    background-color: var(--paper);
    box-shadow: inset -10px 0 10px -8px rgba(0, 0, 0, 0.16);
  }

  .page::after {
    --rows: 90px;
    background-color: var(--paper-back);
    box-shadow: inset 10px 0 10px -8px rgba(0, 0, 0, 0.16);
  }

  .cover::before {
    background-color: var(--cover);
    background-image:
      radial-gradient(
        circle at 56px 46px,
        #0000 0 15px,
        rgba(180, 210, 255, 0.2) 15px 16px,
        #0000 16px 22px,
        rgba(180, 210, 255, 0.35) 22px 24px,
        #0000 24px
      ),
      linear-gradient(var(--foil) 0 0),
      linear-gradient(var(--foil) 0 0);
    background-position: 0 0, 12px 122px, 12px 132px;
    background-size: auto, 71px 3px, 49px 3px;
    border-radius: 0 4px 4px 0;
    box-shadow: inset -14px 0 12px -8px rgba(0, 0, 0, 0.35);
  }

  .cover::after {
    --ink: rgba(160, 130, 90, 0.2);
    --rows: 50px;
    background-color: var(--endpaper);
    border-radius: 0 4px 4px 0;
    box-shadow: inset 12px 0 10px -8px rgba(0, 0, 0, 0.13);
  }

  .back-cover::before {
    background-color: var(--cover);
    border-radius: 0 4px 4px 0;
    box-shadow:
      inset -4px 0 10px rgba(0, 0, 0, 0.3),
      inset -18px 0 12px -8px rgba(0, 0, 0, 0.25);
  }

  .back-cover::after {
    display: none;
  }

  .cover {
    --z: 0px;
    animation-name: f0;
  }

  .page:nth-child(2) {
    --z: -0.3px;
    animation-name: f1;
  }

  .page:nth-child(3) {
    --z: -0.6px;
    animation-name: f2;
  }

  .page:nth-child(4) {
    --z: -0.9px;
    animation-name: f3;
  }

  .page:nth-child(5) {
    --z: -1.2px;
    animation-name: f4;
  }

  .page:nth-child(6) {
    --z: -1.5px;
    animation-name: f5;
  }

  .page:nth-child(7) {
    --z: -1.8px;
    animation-name: f6;
  }

  .back-cover {
    --z: -2.1px;
  }

  @keyframes f0 {
    0% { transform: rotateY(0deg); }
    5% { transform: rotateY(-8deg); }
    25%, 60% { transform: rotateY(-178deg); }
    70% { transform: rotateY(-172deg); }
    85%, 100% { transform: rotateY(0deg); }
  }

  @keyframes f1 {
    0%, 2% { transform: rotateY(0deg); }
    7% { transform: rotateY(-8deg); }
    27%, 58% { transform: rotateY(-178deg); }
    68% { transform: rotateY(-172deg); }
    83%, 100% { transform: rotateY(0deg); }
  }

  @keyframes f2 {
    0%, 4% { transform: rotateY(0deg); }
    9% { transform: rotateY(-8deg); }
    29%, 56% { transform: rotateY(-178deg); }
    66% { transform: rotateY(-172deg); }
    81%, 100% { transform: rotateY(0deg); }
  }

  @keyframes f3 {
    0%, 6% { transform: rotateY(0deg); }
    11% { transform: rotateY(-8deg); }
    31%, 54% { transform: rotateY(-178deg); }
    64% { transform: rotateY(-172deg); }
    79%, 100% { transform: rotateY(0deg); }
  }

  @keyframes f4 {
    0%, 8% { transform: rotateY(0deg); }
    13% { transform: rotateY(-8deg); }
    33%, 52% { transform: rotateY(-178deg); }
    62% { transform: rotateY(-172deg); }
    77%, 100% { transform: rotateY(0deg); }
  }

  @keyframes f5 {
    0%, 10% { transform: rotateY(0deg); }
    15% { transform: rotateY(-8deg); }
    35%, 50% { transform: rotateY(-178deg); }
    60% { transform: rotateY(-172deg); }
    75%, 100% { transform: rotateY(0deg); }
  }

  @keyframes f6 {
    0%, 12% { transform: rotateY(0deg); }
    17% { transform: rotateY(-8deg); }
    37%, 48% { transform: rotateY(-178deg); }
    58% { transform: rotateY(-172deg); }
    73%, 100% { transform: rotateY(0deg); }
  }

  /* TEXT CONTENT */

  .text-content {
    animation: slideIn 0.9s ease both;
  }

  .error-label {
    display: inline-block;
    color: #a65b3d;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 3px;
    animation: fadeIn 1s ease both;
  }

  h1 {
    margin: 12px 0 0;
    color: #873e23;
    font-size: clamp(100px, 15vw, 155px);
    line-height: 1;
    font-weight: 900;
    letter-spacing: -8px;
    text-shadow: 5px 7px 0 rgba(135, 62, 35, 0.09);
  }

  h2 {
    margin: 12px 0;
    color: #422b1f;
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 800;
  }

  .text-content p {
    max-width: 430px;
    color: #806d60;
    font-size: 15px;
    line-height: 1.9;
  }

  /* HOME BUTTON */

  .home-btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-top: 24px;
    padding: 14px 28px;
    border-radius: 8px;
    background: #873e23;
    color: white;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 8px 20px rgba(135, 62, 35, 0.2);
    transition: all 0.3s ease;
  }

  .home-btn span {
    font-size: 20px;
    transition: transform 0.3s ease;
  }

  .home-btn:hover {
    background: #a65b3d;
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(135, 62, 35, 0.3);
  }

  .home-btn:hover span {
    transform: translateX(-5px);
  }

  .bottom-text {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 65px;
    padding-top: 18px;
    border-top: 1px solid #e4d6c4;
    color: #a08d7e;
    font-size: 11px;
    letter-spacing: 1px;
  }

  .bottom-text span:first-child {
    color: #873e23;
    font-weight: 900;
    letter-spacing: 3px;
  }

  @keyframes appear {
    from { opacity: 0; transform: scale(0.85); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(45px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* RESPONSIVE */

  @media (max-width: 768px) {
    .content {
      grid-template-columns: 1fr;
      gap: 5px;
      text-align: center;
    }

    .scene {
      min-height: 280px;
    }

    .book {
      transform: scale(0.85);
    }

    .text-content p {
      margin-left: auto;
      margin-right: auto;
    }

    .bottom-text {
      justify-content: center;
      margin-top: 40px;
    }

    h1 {
      font-size: 110px;
    }
  }

  @media (max-width: 400px) {
    .not-found {
      padding: 25px 18px;
    }

    .scene {
      min-height: 240px;
    }

    h1 {
      font-size: 90px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .book,
    .stack > *,
    .scene,
    .text-content,
    .error-label {
      animation: none !important;
    }

    .home-btn,
    .home-btn span {
      transition: none;
    }
  }
`;

export default NotFound;

