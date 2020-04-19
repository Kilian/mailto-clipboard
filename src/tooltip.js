import { getBounds } from './helpers';

const defaultStyles = `
  .MailtoClipboard-tooltip {
    font-family: sans-serif;
    pointer-events: none;
    position:absolute;
    background: #444;
    filter: drop-shadow(0px 0px 4px rgba(0,0,0,0.33));
    color: #fff;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    opacity:0;
    transition: .2s ease-out opacity, .2s ease-out transform;
  }

  .MailtoClipboard-tooltip-top {
    transform: translateX(-50%) translateY(.5rem);
  }
  .MailtoClipboard-tooltip-bottom {
    transform: translateX(-50%) translateY(-.5rem);
  }

  .MailtoClipboard-tooltip.MailtoClipboard-tooltip-top::before {
    content: " ";
    position:absolute;
    left:50%;
    border:5px solid #444;
    border-color:#444 transparent transparent transparent;
    bottom:-10px;
  }
  .MailtoClipboard-tooltip.MailtoClipboard-tooltip-bottom::before {
    content: " ";
    position:absolute;
    left:50%;
    border:5px solid #444;
    border-color:transparent transparent #444 transparent;
    top:-10px;
  }

  .MailtoClipboard-tooltip-active {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const injectCSS = () => {
  const style = document.createElement('style');
  style.innerHTML = defaultStyles;
  document.querySelector('head').appendChild(style);
};

let Tooltip;

export const setupTooltips = config => {
  if (config.defaultStyle && (config.showTooltip || config.showConfirmation)) {
    injectCSS();
  }

  if (config.showTooltip || config.showConfirmation) {
    Tooltip = document.createElement('span');
    Tooltip.classList.add(
      'MailtoClipboard',
      'MailtoClipboard-tooltip',
      config.position === 'top' ? 'MailtoClipboard-tooltip-top' : 'MailtoClipboard-tooltip-bottom'
    );
    document.body.appendChild(Tooltip);
  }
};

export const showTooltip = (el, email, bounds, text) => {
  Tooltip.innerHTML = text.replace('{email}', email);

  el.dataset.title = el.getAttribute('title');
  el.setAttribute('title', '');

  Tooltip.style.left = `${bounds.left + bounds.width / 2}px`;

  if (Tooltip.classList.contains('MailtoClipboard-tooltip-top')) {
    Tooltip.style.top = `${bounds.top - getBounds(Tooltip).height - 5}px`;
  } else {
    Tooltip.style.top = `${bounds.top + bounds.height + 5}px`;
  }

  Tooltip.classList.add('MailtoClipboard-tooltip-active');
};

export const hideTooltip = el => {
  Tooltip.classList.remove('MailtoClipboard-tooltip-active');

  el.setAttribute('title', el.dataset.title);
  delete el.dataset.title;
};

export const showConfirmation = (email, text) => {
  Tooltip.innerHTML = text.replace('{email}', email);
  Tooltip.classList.add('MailtoClipboard-confirmation-active');
};
