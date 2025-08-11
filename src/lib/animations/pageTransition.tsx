const pageAnimation = () => {
  document.documentElement.animate(
    [
      { transform: 'translateX(0)', opacity: 1 },
      { transform: 'translateX(-100%)', opacity: 0.5 },
    ],
    {
      duration: 1200,
      easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-old(page-content)',
    },
  );

  document.documentElement.animate(
    [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }],
    {
      duration: 1200,
      easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-new(page-content)',
    },
  );
};

export default pageAnimation;
