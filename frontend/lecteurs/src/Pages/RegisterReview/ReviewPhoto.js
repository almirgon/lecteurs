import React, {useState, useEffect} from "react";
import ImageUploading from "react-images-uploading";
import styles from "./Review.module.css";
import {ReactComponent as Book} from "../../assets/book.svg";
import Button from "../../components/Button/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {useNavigate} from "react-router-dom";
import Spinner from "../../components/Loading/Spinner/Spinner";
import ReviewService from "../../services/ReviewService";

const ReviewPhoto = ({reviewData}) => {
  const [images, setImages] = useState([]);
  const swalNotification = withReactContent(Swal);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const finishReview = () => {
    ReviewService.sendBookCover(images).then(({data, status}) => {if(status === 200) {
      reviewData.photo = data.Location
      ReviewService.createReview(reviewData).then(({data,status}) => {
        if(status === 201){
          setLoading(false)
          swalNotification
            .fire({
              title: `${data.message}`,
              icon: "success",
              timer: 3000,
              showCancelButton: false,
              showConfirmButton: false,
              timerProgressBar: true,
            }).then(() => {navigate('/')})
        }
      }, err => {
        setLoading(false)
        const toast = swalNotification.mixin({
          toast: true,
          position: "bottom-left",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: toast => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        toast.fire({
          icon: "error",
          title: `${err.response.data}`,
        });
      })
    }}, err => {
      setLoading(false)
      const toast = swalNotification.mixin({
        toast: true,
        position: "bottom-left",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: toast => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      toast.fire({
        icon: "error",
        title: `${err.response.data}`,
      });
    })
  };

  useEffect(() => {
  }, []);

  return (
    <div className="animeLeft">
      <h1 className="title">Adicione a capa do livro</h1>
      <ImageUploading
        value={images}
        acceptType={["jpeg", "jpg", "png"]}
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
                <Button onClick={() => navigate("/review/")}>Voltar</Button>
              </>
            ) : (
              <>
                {imageList.map((image, index) => (
                  <div key={index} className="animeLeft">
                    <img
                      className={styles.photo}
                      src={image["data_url"]}
                      alt="cover-book"
                    />
                    <div className={styles.photoButtons}>
                      <Button onClick={() => onImageRemove(index)}>
                        Voltar
                      </Button>
                      <Button onClick={finishReview}>{loading ? <Spinner/> : 'Enviar'}</Button>
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
