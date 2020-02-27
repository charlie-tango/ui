/** @jsx jsx */
import { jsx } from './jsx';
import React, { forwardRef } from 'react';
import useFocusTrap from '@charlietango/use-focus-trap';
import { RemoveScroll } from 'react-remove-scroll';
import { ResponsiveValue } from 'styled-system';

import { Portal } from './Portal';
import { ariaLabelPropType, cssVariant } from './utils';

export interface DialogBaseProps extends Omit<React.HTMLProps<HTMLDivElement>, 'as'> {
  as: React.ElementType;
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
  /**
   * The `themeKey` prop sets the default lookup area for `variant` values.
   */
  themeKey?: string | undefined;
}

export interface DialogProps extends DialogBaseProps {
  /** When teh user tries to dismiss the dialog, this function will be called. You will need to toggle the open state by responding to this function. */
  onDismiss: () => void;
  /** Set the initial focus to a specific item. By default, it will be set on the first valid focus element, but you can control this by setting a valid querySelector, or specific HTMLElement. */
  initialFocus?: string | HTMLElement;
  /** You can control if dialog is open. It essentially just renders `null` and deactivates the focus trap when false. */
  isOpen: boolean;
}

export const Dialog = ({
  isOpen,
  onDismiss,
  initialFocus,
  onClick,
  onKeyDown,
  variant,
  themeKey,
  ...rest
}: DialogProps) => {
  const ref = useFocusTrap(isOpen, { focusSelector: initialFocus });
  if (!isOpen) return null;

  return (
    <Portal>
      <RemoveScroll>
        <div
          ref={ref}
          css={theme => [
            {
              position: 'fixed',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
            cssVariant({ themeKey, variant, theme }),
          ]}
          onKeyDown={event => {
            if (onKeyDown) onKeyDown(event);
            if (event.key === 'Escape') {
              event.stopPropagation();
              onDismiss();
            }
          }}
          onClick={event => {
            if (onClick) onClick(event);
            event.stopPropagation();
            onDismiss();
          }}
          {...rest}
        />
      </RemoveScroll>
    </Portal>
  );
};

Dialog.defaultProps = {
  isOpen: true,
  variant: 'container',
  themeKey: 'dialog',
};

if (process.env.NODE_ENV === 'development') {
  Dialog.displayName = 'Dialog';
}

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBaseProps>(
  ({ themeKey, variant, ...props }, ref) => (
    <div
      ref={ref}
      css={theme => [
        {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        cssVariant({ themeKey, variant, theme }),
      ]}
      {...props}
    />
  ),
);

DialogBackdrop.defaultProps = {
  variant: 'backdrop',
  themeKey: 'dialog',
};

if (process.env.NODE_ENV === 'development') {
  DialogBackdrop.displayName = 'DialogBackdrop';
}

export const DialogContent = forwardRef<HTMLDivElement, DialogBaseProps>(
  ({ onClick, themeKey, variant, ...props }, ref) => (
    <div
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      css={theme => [
        {
          position: 'relative',
          margin: '0 auto',
          maxHeight: '100%',
          maxWidth: '100%',
          overflow: 'auto',
          outline: 'none',
        },
        cssVariant({ themeKey, variant, theme }),
      ]}
      onClick={event => {
        if (onClick) onClick(event);
        // Stop click events here, so they trigger the backdrop dismiss
        event.stopPropagation();
      }}
      {...props}
    />
  ),
);

DialogContent.defaultProps = {
  variant: 'content',
  themeKey: 'dialog',
};

if (process.env.NODE_ENV === 'development') {
  DialogContent.displayName = 'DialogContent';
  DialogContent.propTypes = {
    'aria-label': ariaLabelPropType,
    'aria-labelledby': ariaLabelPropType,
  };
}
