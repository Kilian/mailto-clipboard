import { setupTooltips, showTooltip, hideTooltip, removeTooltip, showConfirmation } from './tooltip';
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
  if (config.showTooltip) {
    const bounds = getBounds(e.target);
    const email = getEmail(e.target);
    showTooltip(e.target, email, bounds, config.tooltipText);
  }
};

const mouseoutHandler = e => {
  if (config.showTooltip) {
    hideTooltip(e.target);
  }
};

const clickHandler = e => {
  e.preventDefault();

  const email = getEmail(e.target);
  copyToClipboard(email);

  if (config.showConfirmation) {
    showConfirmation(email, config.confirmationText);

    if (config.confirmationTimeout) {
      setTimeout(() => {
        hideTooltip(e.target);
      }, config.confirmationTimeout);
    }
  } else if (config.showTooltip) {
    hideTooltip(e.target);
  }
};

const destroy = () => {
  removeTooltip();

  const emails = Array.from(document.querySelectorAll(`a[href^="mailto:"]`));
  emails.forEach(el => {
    if (el.dataset.MailtoClipboardApplied) {
      el.removeEventListener('mouseover', mouseoverHandler);
      el.removeEventListener('mouseout', mouseoutHandler);
      el.removeEventListener('click', clickHandler);
      el.setAttribute('title', el.dataset.originalTitle || "");

      delete el.dataset.MailtoClipboardApplied;
      delete el.dataset.originalTitle;
    }
  });
};

const MailtoClipboard = (opts = {}) => {
  config = { ...config, ...opts };

  setupTooltips(config);

  const emails = Array.from(document.querySelectorAll(`a[href^="mailto:"]`));
  emails.forEach(el => {
    if (!el.dataset.MailtoClipboardApplied) {
      const email = getEmail(el);

      if (el.getAttribute('title')) {
        el.dataset.originalTitle = el.getAttribute('title');
      }

      el.setAttribute('title', config.tooltipText.replace('{email}', email));
      el.addEventListener('mouseover', mouseoverHandler);
      el.addEventListener('mouseout', mouseoutHandler);
      el.addEventListener('click', clickHandler);

      el.dataset.MailtoClipboardApplied = true;
    }
  });
};

MailtoClipboard.destroy = destroy;

export default MailtoClipboard;
