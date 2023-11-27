import { updateContext } from 'AppContext';
import cx from 'classnames';
import React from 'react';
import { ReactCropperElement } from 'react-cropper';
import FileUpload from '~SubHeader/FileUpload/FileUpload';
import { useGetQuizById } from '~Utilities/AppContext/selectors/QuizSelectors';
import Button from '~Utilities/Button/Button';
import CropImage from '~Utilities/CropImage/CropImage';
import Input from '~Utilities/Input/Input';
import Loader from '~Utilities/Loader/Loader';
import { openModal } from '~Utilities/ModalService';
import Radio from '~Utilities/Radio/Radio';
import RadioGroup from '~Utilities/RadioGroup/RadioGroup';

import { createQuiz, updateQuiz } from '../../service/quizService';
import styles from './EditQuizConfig.module.css';

export type EditQuizConfigProps = { quizId: string };

const EditQuizConfig = ({ quizId }: EditQuizConfigProps) => {
  const quiz = useGetQuizById(quizId);
  const [name, setName] = React.useState(quiz?.name || "");
  const [file, setFile] = React.useState<File>();
  const [quizType, setQuizType] = React.useState(quiz?.type);
  const [cropData, setCropData] = React.useState<Cropper.Data>();
  const [dataUrl, setDataUrl] = React.useState<string>();
  const croppedBlob = React.useRef<Blob>();
  const cropperRef = React.useRef<ReactCropperElement>(null);

  const handleNewFile = (file?: File) => {
    if (!file) return;
    setFile(file);
    setCropData(undefined);
    setDataUrl(undefined);
    croppedBlob.current = undefined;
  };

  const onClickSave = () => {
    if (name) {
      let icon: Blob | File | undefined;
      if (croppedBlob.current) {
        icon = croppedBlob.current;
      } else if (file) {
        icon = file;
      }
      updateQuiz({
        ...quiz,
        name,
        type: quizType,
      }, icon).then((response) => {
        updateContext((context) => {
          context.quizzes[quizId].name = name;
          context.quizzes[quizId].type = quizType;
        })
      })
    }
  };

  React.useEffect(() => {
    if (quiz) {
      handleCancel();
    }
  }, [quiz]);

  const handleCancel = () => {
    setName(quiz?.name);
    setDataUrl(quiz?.icon);
    setQuizType(quiz?.type);
  }

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    setCropData(cropper?.getData());

    const croppedCanvas = cropper?.getCroppedCanvas();
    croppedCanvas?.toBlob(
      (blob) => {
        if (!blob) {
          return;
        }
        croppedBlob.current = blob;
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const compressedDataUrl = reader.result;
          if (typeof compressedDataUrl == "string") {
            setDataUrl(compressedDataUrl);
          }
        };
      },
      "image/jpeg",
      0.8
    );
  };

  const handleStartCropping = () => {
    import("Utilities/CropperModal").then((CropperModal) => {
      openModal((props) => (
        <CropperModal.default
          {...props}
          dataUrl={quiz.icon}
          cropperRef={cropperRef}
          cropData={cropData}
          onSave={() => handleCrop()}
        />
      ));
    });
  };

  return (
    <div className={cx(styles.container)}>
      <div className={styles.header}>
        <span className={styles.title}>Edit Quiz</span>
        <div className={styles.buttons}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant={"primary"} onClick={onClickSave}>Save</Button>
        </div>
      </div>
      <div className={styles.body}>
        {!quiz && <Loader />}
        <React.Suspense fallback={<Loader />}>
          <div>
            <label>
              <div>Name</div>
              <Input
                placeholder={"Quiz name"}
                value={name}
                onChange={setName}
              />
            </label>
          </div>
          <div>
            <div>Icon</div>
            <div className={styles.iconSettings}>
              <FileUpload
                file={file}
                dataUrl={dataUrl}
                onChange={handleNewFile}
              />

              {dataUrl && (
                <Button onClick={handleStartCropping}>Crop Icon</Button>
              )}
            </div>
          </div>
          <div>
            <div>Quiz Type</div>
            <div>
              <RadioGroup name={"quiz_type"}>
                {(name) => (
                  <React.Fragment>
                    <Radio
                      name={name}
                      value={"SUMMED_SCALE"}
                      checked={quizType === "SUMMED_SCALE"}
                      onChange={(checked) =>
                        checked && setQuizType("SUMMED_SCALE")
                      }
                    >
                      Summed Scale
                    </Radio>
                    <Radio
                      name={name}
                      value={"WEIGHTED_GROUPING"}
                      checked={quizType === "WEIGHTED_GROUPING"}
                      onChange={(checked) =>
                        checked && setQuizType("WEIGHTED_GROUPING")
                      }
                    >
                      Weighted Grouping
                    </Radio>
                  </React.Fragment>
                )}
              </RadioGroup>
            </div>
          </div>
        </React.Suspense>
      </div>
    </div>
  );
};

export default EditQuizConfig;
