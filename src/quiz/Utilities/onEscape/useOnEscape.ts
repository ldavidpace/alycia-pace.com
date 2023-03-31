import React from 'react';


type useOnEscapeProps = {
    callback: (ev: KeyboardEvent) => void,
    listening?: boolean
};

const useOnEscape = ({callback, listening = true}: useOnEscapeProps) => {

    React.useEffect(() => {
        if (listening) {
            const handleKeyUp = (ev: KeyboardEvent) => {
                if (ev.key == 'Escape') {
                    callback(ev);
                }
            }
            document.addEventListener('keyup', handleKeyUp)
            return () => {
                document.removeEventListener('keyup', handleKeyUp)
            }
        }
    }, [callback, listening])
}

export default useOnEscape;