import React from 'react';
import ReactDom from 'react-dom/client';
import {
  AppContextProvider,
} from 'Utilities/AppContext';


type ModalRenderProps = {
  open: boolean;
  onRequestClose: () => void;
  onExited: () => void;
}

export const openModal = (renderModal: (props: ModalRenderProps) => React.ReactNode) => {
    const target = document.createElement('div');
    target.classList.add('Modal');
    document.body.appendChild(target);
    const root = ReactDom.createRoot(target);
    const onExited = () => {
      root.unmount();
      target.remove();
    }
    const createModal = (open: boolean) => {
      const onRequestClose = () => {
        createModal(false);
      }  
      setTimeout(() => {
        root.render(<AppContextProvider>{renderModal({
          open,
          onRequestClose,
          onExited
        })}</AppContextProvider>);
      })
    }
    createModal(true);
}