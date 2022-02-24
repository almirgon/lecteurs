import React, {useState} from "react";
import ImageUploading from "react-images-uploading";
import styles from "./Review.module.css";
import {ReactComponent as Book} from "../../assets/book.svg";
import Button from "../../components/Button/Button";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'

const ReviewPhoto = () => {
  const [images, setImages] = useState([]);
  const MySwal = withReactContent(Swal)
  const navigate  = useNavigate();

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const finishReview = () => {
    MySwal.fire({
      icon: 'success',
      title: `Review publicada com Sucesso`,
      text: `Sua Review foi publicada com sucesso em nosso site! :P`,
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      willClose: () => {
        navigate('/')
      }
    })
  };

  return (
    <div className="animeLeft">
      <h1 className="title">Adicione a capa do livro</h1>
      <ImageUploading
        value={images}
        acceptType={['jpeg', 'jpg','png']}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          <>
            {imageList.length == 0 && !errors ? (
              <>
              <div
                className={styles.reviewPhoto}
                style={isDragging ? {borderColor: "#013896"} : undefined}
                onClick={onImageUpload}
                disabled={errors?.maxNumber}
                {...dragProps}
              >
                <Book
                  style={
                    isDragging
                      ? {fill: "#013896", transition: "0.3s all"}
                      : {
                          fill: "#013896",
                        }
                  }
                  fill="#D8D8D8"
                />
                Click ou jogue a imagem (JPEG | PNG) aqui
              </div>
              </>
            ) : (
              <>
                {imageList.map((image, index) => (
                  <div key={index} className="animeLeft">
                    <img className={styles.photo} src={image["data_url"]} alt="cover-book"/>
                    <div className={styles.photoButtons}>
                      <Button onClick={() => onImageRemove(index)}>
                        Voltar
                      </Button>
                      <Button onClick={finishReview}>
                        Finalizar
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </ImageUploading>
    </div>
  );
};

export default ReviewPhoto;
