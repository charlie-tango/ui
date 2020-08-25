/** @jsx jsx */
import { jsx } from '@charlietango/emotion-sx';
import { forwardRef, HTMLProps } from 'react';
import useFocusTrap from '@charlietango/use-focus-trap';
import { RemoveScroll } from 'react-remove-scroll';

import { Portal } from './Portal';
import { ariaLabelPropType, sxVariant } from './utils';
import { ResponsiveValue } from 'styled-system';
import { ThemeProps } from './index';
import { PolymorphicComponent } from './polymorphic';

export interface DialogProps extends HTMLProps<HTMLDivElement> {
  /** When the user tries to dismiss the dialog, this function will be called. You will need to toggle the open state by responding to this function. */
  onDismiss: () => void;
  /** Set the initial focus to a specific item. By default, it will be set on the first valid focus element, but you can control this by setting a valid querySelector, or specific HTMLElement. */
  initialFocus?: string | HTMLElement;
  /** You can control if dialog is open. It essentially just renders `null` and deactivates the focus trap when false. */
  isOpen: boolean;
  /**
   * The variant key from the theme to use for this element.
   * */
  variant?: ResponsiveValue<string>;
  /**
   * The `themeKey` prop sets the default lookup area for `variant` values.
   */
  themeKey?: string;
}

export const Dialog = ({
  isOpen = true,
  onDismiss,
  initialFocus,
  onClick,
  onKeyDown,
  variant = 'container',
  ...rest
}: DialogProps) => {
  const ref = useFocusTrap(isOpen, { focusSelector: initialFocus });
  if (!isOpen) return null;

  return (
    <Portal>
      <RemoveScroll>
        <div
          ref={ref}
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            variant: sxVariant(variant, 'dialog'),
          }}
          onKeyDown={(event) => {
            if (onKeyDown) onKeyDown(event);
            if (event.key === 'Escape') {
              event.stopPropagation();
              onDismiss();
            }
          }}
          onClick={(event) => {
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

Dialog.displayName = 'Dialog';

export const DialogBackdrop = forwardRef<HTMLDivElement, ThemeProps<'div'>>(
  ({ as: Element = 'div', variant = 'backdrop', ...props }, ref) => (
    <Element
      ref={ref}
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        variant: sxVariant(variant, 'dialog'),
      }}
      {...props}
    />
  ),
) as PolymorphicComponent<ThemeProps>;

DialogBackdrop.displayName = 'DialogBackdrop';

export const DialogContent = forwardRef<
  HTMLDivElement,
  ThemeProps<'div'> & { onClick: (event: React.MouseEvent) => void }
>(({ as: Element = 'div', onClick, variant = 'content', ...props }, ref) => (
  <Element
    ref={ref}
    aria-modal="true"
    role="dialog"
    tabIndex={-1}
    sx={{
      position: 'relative',
      margin: '0 auto',
      maxHeight: '100%',
      maxWidth: '100%',
      overflow: 'auto',
      outline: 'none',
      variant: sxVariant(variant, 'dialog'),
    }}
    onClick={(event) => {
      if (onClick) onClick(event);
      // Stop click events here, so they trigger the backdrop dismiss
      event.stopPropagation();
    }}
    {...props}
  />
)) as PolymorphicComponent<ThemeProps>;

DialogContent.displayName = 'DialogContent';

if (process.env.NODE_ENV === 'development') {
  DialogContent.propTypes = {
    'aria-label': ariaLabelPropType,
    'aria-labelledby': ariaLabelPropType,
  };
}
