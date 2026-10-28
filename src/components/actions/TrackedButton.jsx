import React from 'react';
import { trackEvent } from '../../lib/telemetry';

export default function TrackedButton({
  eventName,
  eventData = {},
  children,
  className = '',
  onClick,
  href,
  as = href ? 'a' : 'button',
  ...props
}) {
  const handleClick = (e) => {
    trackEvent(eventName, eventData);
    if (onClick) {
      onClick(e);
    }
  };

  if (as === 'a' || href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
