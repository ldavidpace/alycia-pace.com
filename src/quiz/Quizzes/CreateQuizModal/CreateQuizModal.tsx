import cx from 'classnames';
import React from 'react';
import Button from 'Utilities/Button';
import Modal from 'Utilities/Modal';
import ModalBody from 'Utilities/Modal/ModalBody';
import ModalFooter from 'Utilities/Modal/ModalFooter';
import ModalHeader from 'Utilities/Modal/ModalHeader';
import FileUpload from '~/SubHeader/FileUpload';
import { createQuiz } from '~service/quizService';
import Loader from '~Utilities/Loader';

import styles from './CreateQuizModal.module.css';

import type { ReactCropperElement } from 'react-cropper';
const CropImage = React.lazy(() => import("Utilities/CropImage"));

export type CreateQuizModalProps = {
  open: boolean;
  onRequestClose: () => void;
  onExited: () => void;
};

const CreateQuizModal = ({
  open,
  onRequestClose,
  onExited,
}: CreateQuizModalProps) => {
  const [name, setName] = React.useState("");
  const [file, setFile] = React.useState<File>();
  const [cropping, setCropping] = React.useState(false);
  const [cropData, setCropData] = React.useState<Cropper.Data>();
  const [dataUrl, setDataUrl] = React.useState<string>();
  const croppedBlob = React.useRef<Blob>();
  const cropperRef = React.useRef<ReactCropperElement>(null);

  React.useEffect(() => {
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result;
            if (typeof result === 'string') {
                setDataUrl(result);
            }
        }
        reader.readAsDataURL(file);
    }
}, [file]);

  const handleFileChange = (file?: File) => {
    setFile(file);
  };
  const handleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value);
  };

  const handleStartImageCrop = () => {
    setCropping(true);
  };

  const onClickSave = () => {
    if (cropping) {
        const cropper = cropperRef.current?.cropper;
        setCropData(cropper?.getData());
        
        const croppedCanvas = cropper?.getCroppedCanvas()
        croppedCanvas?.toBlob(blob => {
          if (!blob) {return}
          croppedBlob.current = blob;
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const compressedDataUrl = reader.result;
            if (typeof compressedDataUrl == 'string') {
              setDataUrl(compressedDataUrl);
            }
          };
        }, 'image/jpeg', 0.8);
        setCropping(false);
    } else {
        if (name) {
          if (croppedBlob.current) {
            createQuiz(name, croppedBlob.current);
            onRequestClose();
          } else if (file){
            createQuiz(name, file)
            onRequestClose();
          }
        }
    }

  }

  const onCancel = () => {
    if (cropping) {
        setCropping(false);
        setCropData(undefined);
    } else {
        onRequestClose();
    }
    
  }

  return (
    <Modal
      open={open}
      onRequestClose={onRequestClose}
      onExited={onExited}
      size={"md"}
      className={cx(styles.container)}
    >
      <ModalHeader>Create Quiz</ModalHeader>
      <ModalBody>
        <React.Suspense fallback={<Loader />}>
            {!cropping || !file ? (
            <React.Fragment>
                <div>
                <label>
                    {" "}
                    Name{" "}
                    <input
                        placeholder={"Quiz name"}
                        value={name}
                        onChange={handleNameChange}
                    ></input>
                </label>
                </div>
                <div>
                <FileUpload
                    file={file}
                    dataUrl={dataUrl}
                    onChange={handleFileChange}
                    onStartImageCrop={handleStartImageCrop}
                />
                </div>
            </React.Fragment>
            ) : (
            <div>
                <CropImage cropData={cropData} file={file} cropperRef={cropperRef}/>
            </div>
            )}
        </React.Suspense>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={onClickSave}>Save</Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateQuizModal;
