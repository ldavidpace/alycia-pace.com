import cx from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  useAppContext,
} from '~/Utilities/AppContext';

import useMergeRefs from '../../Utilities/mergeRefs/useMergeRefs';
import OnClickOutside from '../../Utilities/OnClickOutside';
import useOnEscape from '../../Utilities/onEscape/useOnEscape';
import styles from './UserDropdown.module.css';


export type UserDropdownProps = {};

const UserDropdown = ({}: UserDropdownProps) => {
  const buttonHandle = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleHandleClick = () => {
    setOpen(true);
  };
  const appContext = useAppContext();

  const handleClose = ()=> {setOpen(false)}
  React.useEffect(() => {
    let raf: number;
    const positionMenu = () => {
        if (menuRef.current && buttonHandle.current) {
            const handlePosition = buttonHandle.current.getBoundingClientRect();
            const menuWidth = menuRef.current.offsetWidth;
            const windowWidth = window.innerWidth;
            menuRef.current.style.top = `${handlePosition.bottom + 8}px`;
            menuRef.current.style.left = `${Math.min(
                handlePosition.left + 8, 
                windowWidth - menuWidth - 24
            )}px`;
            if (open) {
                raf = requestAnimationFrame(positionMenu);
            }
        }
    }
    if (open) {
        raf = requestAnimationFrame(positionMenu)
        return () => {
            cancelAnimationFrame(raf);
        }
    }
  }, [open]);
  const mergeRefs = useMergeRefs<HTMLDivElement>();
  useOnEscape({
    callback: handleClose
  })
  return (
    <div className={cx(styles.container)}>
        <button
          className={styles.userIcon}
          onClick={handleHandleClick}
          ref={buttonHandle}
        />
        {open &&
          ReactDOM.createPortal(
            <OnClickOutside<HTMLDivElement> onClick={handleClose} ignoreClassName={styles.userIcon}>
              {({ref}) => 
                <div className={styles.dropdown} ref={mergeRefs(menuRef, ref)}>
                  <div>Logged in as {appContext.user?.userName}</div>
                  <a href="/logout" className={styles.link}>Logout</a>
                </div>
              } 
            </OnClickOutside>,
            document.body
          )}
        </div>
  );
};

export default UserDropdown;
