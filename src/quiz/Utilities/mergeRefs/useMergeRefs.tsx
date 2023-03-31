import React from "react";

const useMergeRefs = <T extends HTMLElement>() => {
    const lastRefs = React.useRef<Array<React.Ref<T>>>([]);
    const callback = React.useRef<React.RefCallback<T>>();

    const mergeRefs =(...refs: Array<React.Ref<T>>) => {
        if (lastRefs.current.length !== refs.length || lastRefs.current.some(((ref, index) => ref !== refs[index]))) {
            lastRefs.current = refs;
            callback.current = (ref: T) => {
                refs.forEach((mergedRef) => {
                    if (!mergedRef) return;
                    if (typeof mergedRef === 'function') {
                        mergedRef(ref);
                    } else {
                        //This is typed as immutable ignore that for this case.
                        (mergedRef as any).current = ref;
                    }
                });
            }
        }
        
        return  callback.current;
    };

    return mergeRefs;

}


export default useMergeRefs;