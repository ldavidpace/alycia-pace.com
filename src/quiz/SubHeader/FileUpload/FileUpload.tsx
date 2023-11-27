import cx from 'classnames';
import React from 'react';
import useUniqueId from 'Utilities/useUniqueId';
import Button from '~Utilities/Button';
import Icon from '~Utilities/Icon/Icon';

import styles from './FileUpload.module.css';

export type FileUploadProps = {
    file?: File,
    dataUrl?: string,
    onChange: (file?: File) => void;
    onStartImageCrop?: () => void;
}

const FileUpload = ({
    file,
    dataUrl,
    onChange,
    onStartImageCrop
} : FileUploadProps) => {
    const input = React.useRef<HTMLInputElement>(null);
    const uniqueId = useUniqueId({prefix: "FileUpload_"});
    
    const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = ev.target.files?.[0];
        onChange(newFile);
        ev.target.files = null;
    }

    return <div>
        <label htmlFor={uniqueId} className={styles.target}>
            { !file && !dataUrl? (<React.Fragment>
                <div>Choose Icon</div>
                <div>+</div>
                </React.Fragment>):
                ( !dataUrl? <div>Loading</div>:
                    <img className={styles.preview} src={dataUrl}/>
                )
            }
            <Button as={'div'}className={styles.editButton} variant={'tight'}>
                <Icon name={'pencil'}></Icon>
            </Button>
            <input 
                id={uniqueId}
                ref={input} 
                type="file" 
                onChange={handleFileChange} 
                className={styles.input}
            />
        </label>
    </div>
}

export default FileUpload;