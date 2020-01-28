import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useClientHydrated from '@charlietango/use-client-hydrated';

interface PortalProps {
  /** If you supply an id, then it will be set as the value of `data-portal`, allowing you to identify the portal container in the DOM. */
  id?: string;
  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ children, id }: PortalProps) => {
  const clientHydrated = useClientHydrated();
  const portalNode = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(clientHydrated);

  if (!portalNode.current && mounted) {
    // If the client is hydrated, we can attach the <div> element now. Otherwise, we wait untill the useEffect triggers
    portalNode.current = document.createElement('div');
    document.body.appendChild(portalNode.current);
  }

  useEffect(() => {
    if (!portalNode.current) {
      // After hydrating, we can safely create the containing div element
      portalNode.current = document.createElement('div');
      // Update mounted state, so the portal is rendered into the new div
      setMounted(true);
    }
    const node = portalNode.current;

    if (node) {
      document.body.appendChild(node);

      return () => {
        document.body.removeChild(node);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (portalNode.current) {
      // Set the data-portal attribute
      portalNode.current.setAttribute('data-portal', id || '');
    }
  }, [id]);

  return portalNode.current ? createPortal(children, portalNode.current) : null;
};
