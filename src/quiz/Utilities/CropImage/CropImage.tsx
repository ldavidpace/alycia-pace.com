import cx from 'classnames';
import 'cropperjs/dist/cropper.css';
import React from 'react';
import Cropper, {
  ReactCropperElement,
} from 'react-cropper';

import styles from './CropImage.module.css';


export type CropImageProps = {
    cropData?: Cropper.Data,
    cropperRef: React.Ref<ReactCropperElement>;
} & ({
    file: File;
    url?: never;
} | {
    file?: never;
    url: string;
})

const CropImage = ({
    file, 
    url,
    cropperRef,
    cropData,
} : CropImageProps) => {
    const [dataUrl, setDataUrl] = React.useState(url);

    React.useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const result = ev.target?.result;
                if (typeof result === 'string') {
                    setDataUrl(result);
                }
            };
            reader.readAsDataURL(file);
        }
    }, [file]);



    return <div className={cx(styles.container)}><Cropper 
        data={cropData} 
        aspectRatio={2/3} 
        ref={cropperRef} 
        src={dataUrl} 
    /></div>
}

export default CropImage;