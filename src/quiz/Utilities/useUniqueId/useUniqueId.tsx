import React from 'react';
import { v4 as uuid } from 'uuid';


type UniqueIdProps = {
    prefix?: string;
    postfix?: string;
}

const useUniqueId = ({
    prefix = '',
    postfix = ''
}: UniqueIdProps) => {
    const ref = React.useRef(uuid())
    return `${prefix}${ref.current}${postfix}`;
}

export default useUniqueId;