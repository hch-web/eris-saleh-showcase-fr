import bgImage from 'assets/gradient-background.jpg';

export const particlesOptions = {
  background: {
    image: `url(${bgImage})`,
    size: 'cover',
    position: '50% 50%',
  },
  fpsLimit: 60,
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
      value: 'rgba(255, 255, 255, 0.4)',
    },
    links: {
      color: 'rgba(255, 255, 255, 0.4)',
      distance: 150,
      enable: true,
      opacity: 0.3,
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
      value: 0.4,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: false,
};

export const test = '';
