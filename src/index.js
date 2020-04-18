import { setupTooltips, showTooltip, hideTooltip, showConfirmation } from './tooltip';
import copyToClipboard from './copyToClipboard';
import { getBounds, getEmail } from './helpers';

let config = {
  defaultStyle: true,
  showTooltip: true,
  tooltipText: `Copy "{email}" to clipboard`,
  position: 'bottom',

  showConfirmation: true,
  confirmationText: `"{email}" copied to clipboard`,
  confirmationTimeout: 1000
};

const mouseoverHandler = e => {
  const bounds = getBounds(e.target);
  const email = getEmail(e.target);
  showTooltip(e.target, email, bounds, config.tooltipText);
};

const mouseoutHandler = e => {
  hideTooltip(e.target);
};

const clickHandler = e => {
  e.preventDefault();

  const email = getEmail(e.target);
  copyToClipboard(email);

  if (config.showConfirmation) {
    showConfirmation(email, config.confirmationText);

    if (config.confirmationTimeout) {
      setTimeout(() => {
        hideTooltip();
      }, config.confirmationTimeout);
    }
  } else if (config.showTooltip) {
    hideTooltip();
  }
};

const MailtoClipboard = (opts = {}) => {
  config = { ...config, opts };

  setupTooltips(config);

  const emails = Array.from(document.querySelectorAll(`a[href^="mailto:"]`));
  emails.forEach(el => {
    const email = getEmail(el);
    el.setAttribute('title', config.tooltipText.replace('{email}', email));

    if (config.showTooltip) {
      el.addEventListener('mouseover', mouseoverHandler);
      el.addEventListener('mouseout', mouseoutHandler);
    }
    el.addEventListener('click', clickHandler);
  });
};

export default MailtoClipboard;
