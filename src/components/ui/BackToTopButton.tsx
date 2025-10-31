'use client';

import React from 'react';

export default function BackToTopButton() {
  return (
    <button
      onClick={() => {
        scrollTo(0, 0);
      }}
      className="back-to-top"
    >
      <span className="back-to-top__label">Back to top</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="21"
        viewBox="0 0 8 21"
        fill="none"
        className="back-to-top__icon"
      >
        <path
          d="M4.35355 0.646446C4.15829 0.451185 3.84171 0.451185 3.64645 0.646446L0.464465 3.82843C0.269203 4.02369 0.269203 4.34027 0.464465 4.53553C0.659728 4.7308 0.97631 4.7308 1.17157 4.53553L4 1.70711L6.82843 4.53553C7.02369 4.7308 7.34027 4.7308 7.53553 4.53553C7.7308 4.34027 7.7308 4.02369 7.53553 3.82843L4.35355 0.646446ZM4 21L4.5 21L4.5 1L4 1L3.5 1L3.5 21L4 21Z"
          fill="black"
        />
      </svg>
    </button>
  );
}
