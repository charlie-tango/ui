import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';
import { Portal } from './Portal';
import { RemoveScroll } from 'react-remove-scroll';
import useFocusTrap from '@charlietango/use-focus-trap';
import { ariaLabelPropType } from './utils';

export interface DialogProps extends BoxProps {
  /** When teh user tries to dismiss the dialog, this function will be called. You will need to toggle the open state by responding to this function. */
  onDismiss: () => void;
  /** Use Flexbox to center the content inside the dialog. You can disable this, or just override the `display: flex` styling itself. */
  centerContent: boolean;
  /** Set the initial focus to a specific item. By default, it will be set on the first valid focus element, but you can control this by setting a valid querySelector, or specific HTMLElement. */
  initialFocus?: string | HTMLElement;
  /** You can control if dialog is open. It essentially just renders `null` and deactivates the focus trap when false. */
  isOpen: boolean;
}

export const Dialog = ({
  isOpen,
  onDismiss,
  initialFocus,
  centerContent,
  onClick,
  onKeyDown,
  sx,
  ...rest
}: DialogProps) => {
  const ref = useFocusTrap(isOpen, { focusSelector: initialFocus });
  if (!isOpen) return null;

  return (
    <Portal>
      <RemoveScroll>
        <Box
          ref={ref}
          variant="container"
          {...rest}
          themeKey="dialog"
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: centerContent ? 'flex' : 'block',
            justifyContent: 'center',
            alignItems: 'center',
            ...sx,
          }}
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
        />
      </RemoveScroll>
    </Portal>
  );
};

Dialog.defaultProps = {
  isOpen: true,
  centerContent: true,
};

export const DialogBackdrop: React.FC<BoxProps> = forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, ...props }, ref) => (
    <Box
      ref={ref}
      variant="backdrop"
      {...props}
      themeKey="dialog"
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        ...sx,
      }}
    />
  ),
);

export const DialogContent: React.FC<BoxProps> = forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, ...props }, ref) => (
    <Box
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      variant="content"
      {...props}
      onClick={event => {
        // Stop click events here, so they trigger the backdrop dismiss
        event.stopPropagation();
      }}
      themeKey="dialog"
      sx={{
        position: 'relative',
        margin: '0 auto',
        maxHeight: '100%',
        maxWidth: '100%',
        overflow: 'auto',
        outline: 'none',
        ...sx,
      }}
    />
  ),
);

if (process.env.NODE_ENV === 'development') {
  DialogContent.displayName = 'DialogContent';
  DialogContent.propTypes = {
    'aria-label': ariaLabelPropType,
    'aria-labelledby': ariaLabelPropType,
  };
}
