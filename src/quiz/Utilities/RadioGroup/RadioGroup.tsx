import cx from 'classnames';
import React from 'react';
import useUniqueId from '~Utilities/useUniqueId/useUniqueId';

import styles from './RadioGroup.module.css';

export type RadioGroupProps = {
    name?: string; 
    children: (name: string) => ReturnType<React.FC<any>>
}

const RadioGroup = ({name, children} : RadioGroupProps) => {
    const id = useUniqueId({prefix: "RadioGroup"})
    return children(name || id);
}

export default RadioGroup;