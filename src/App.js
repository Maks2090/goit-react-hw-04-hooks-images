import './styles.css';
import { useState, useEffect } from 'react';
import { Notify } from "notiflix";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery'
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem'
import fetchImages from './Api/fetchImages';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from "react-loader-spinner";


export default function App() {
  const [page, setpage] = useState(null);
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [hits, setHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [loader, setLoader] = useState(false);

  
    useEffect(() =>{
      if(!value){
        return
      }

      showLoader(true);
      fetchImages(value, page)
        .then((totalImages) => {
          setHits(totalImages.data.hits.length);
          if (totalImages.data.hits.length === 0) {
            Notify.info(
              "Sorry, there are no images matching your search query. Please try again."
            );
            setHits(0)
          }
          setImages((prevImages) => [...prevImages, ...totalImages.data.hits])
          scrollToBottom()
        })
        .catch((error) => {
          Notify.info(
            "Sorry, there are no images matching your search query. Please try again."
          );
          setHits(0);
        })
        .finally(() => showLoader(false));
    }, [value, page])
    
    
  

  const showLoader = (status) => {
    return setLoader(status);
  };

  const writeToState = (data) => {
    if(data.image){
      setImages([]);
      setValue(data.image);
      setpage(data.page)
    } else {
      setpage(data.page);}
  };

   const writeSrcState = (data) => {
    setModalSrc(data)
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const onModal = (data) => {
    setShowModal(data);
  };

  return (
    <div>
      <Searchbar
        onSubmitForm={writeToState}
      />


      <ImageGallery>
        <ImageGalleryItem
          imageGallery={images}
          writeSrcState={writeSrcState}
          onModal={onModal}
        />
      </ImageGallery>

      {loader && (
        <Loader className="Loader" type="Puff" color="#3f51b5" height={80} width={80} timeout={1000}/>
      )}

      <Button
        totalHits={hits}
        onSubmit={writeToState}
        currentPage={page}
      />
      {showModal && (
        <Modal
          modalSrc={modalSrc}
          showLoader={showModal}
          onModal={onModal}
        />
      )}



    </div >
  )
}

