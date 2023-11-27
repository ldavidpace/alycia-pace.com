import cx from 'classnames';
import React from 'react';
import { ReactCropperElement } from 'react-cropper';
import Button from '~Utilities/Button/Button';
import CropImage from '~Utilities/CropImage/CropImage';
import Loader from '~Utilities/Loader/Loader';
import Modal from '~Utilities/Modal/Modal';
import ModalBody from '~Utilities/Modal/ModalBody/ModalBody';
import ModalFooter from '~Utilities/Modal/ModalFooter/ModalFooter';

import styles from './CropperModal.module.css';

export type CropperModalProps = {
    dataUrl?: string;
    cropperRef: React.RefObject<ReactCropperElement>;
    cropData?: Cropper.Data
    onSave: () => void;
} & Omit<React.ComponentProps<typeof Modal>, 'children'>

const CropperModal = ({
    dataUrl, 
    cropData,
    cropperRef, 
    onSave, 
    onRequestClose, 
    ...ModalProps
} : CropperModalProps) => {
    const handleSave = () => {
        onSave();
        onRequestClose();
    }
    return <Modal onRequestClose={onRequestClose} {...ModalProps} className={cx()}>
        <ModalBody>
            {dataUrl ?<CropImage url={dataUrl} cropperRef={cropperRef} cropData={cropData}/>:<Loader/>}
        </ModalBody>
        <ModalFooter>
            <Button variant={'primary'} onClick={handleSave}>Save</Button>
            <Button onClick={onRequestClose}>Close</Button>
        </ModalFooter>
    </Modal>
}

export default CropperModal;