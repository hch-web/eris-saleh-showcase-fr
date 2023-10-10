export const particlesOptions = {
  background: {
    image: 'linear-gradient(231deg, rgba(2,0,36,1) 0%, #2f609f 50%, rgba(2,0,36,1) 100%)',
    size: 'cover',
    position: '50% 50%',
  },
  fpsLimit: 90,
  interactivity: {
    events: {
      onClick: {
        enable: false,
      },
      onHover: {
        enable: false,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce',
      },
      random: true,
      speed: 4,
      straight: true,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 100,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
};

export const test = '';
