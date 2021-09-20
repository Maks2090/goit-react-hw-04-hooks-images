import { useEffect  } from "react";
import PropTypes from 'prop-types';

export default function Modal({modalSrc, onModal}) {
  
  useEffect(()=>{
    const closeModal= (e) =>{
      if(e.code === "Escape"){
        onModal(false)
      }
    }
    window.addEventListener("keydown", closeModal);
    return ()=>{
      window.removeEventListener("keydown", closeModal);
    }
  }, [onModal])

   const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      onModal(false);
    }
  };
  return (
    <div className="Overlay" onClick={onCloseModal}>
         <div className="Modal">

             <img src={modalSrc} alt="modal img" />

         </div>

    </div>
  );
}


  Modal.propTypes = {
    modalSrc: PropTypes.string,
    onModal: PropTypes.func,
  };