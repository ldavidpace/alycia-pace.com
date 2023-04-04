import cx from 'classnames';
import React from 'react';


export type OnClickOutsideProps<E extends HTMLElement> = {
    children: (props: {ref: React.Ref<E>}) => React.ReactElement,
    onClick: (ev: MouseEvent) => void,
    listening?: boolean;
    ignoreClassName?: string;
}

const OnClickOutside = <E extends HTMLElement>({children, onClick, listening = true, ignoreClassName = ""} : OnClickOutsideProps<E>) => {
    const ref = React.useRef<E>(null)
    React.useEffect(() => {
        if(listening && ref.current) {
            const checkForClickOutside = (ev: MouseEvent) => {
                if (ev.target instanceof HTMLElement) {
                    if ((!ignoreClassName || !ev.target.matches(`.${ignoreClassName}`)) && ref.current !== ev.target && !ref.current?.contains(ev.target)) {
                        onClick(ev);
                    }
                }
            }
            document.addEventListener('click', checkForClickOutside)
            return () => {
                document.removeEventListener('click', checkForClickOutside)
            }
        }
    }, [onClick, listening])
    return children({ref});
}

export default OnClickOutside;