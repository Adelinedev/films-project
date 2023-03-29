import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function VideoPlayer({ src, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div className="overlay">
        <div className="modal">
          <span className="close-button" onClick={handleClose}>
            <HighlightOffIcon style={{ color: "white" }} />
          </span>
          <iframe
            width="100%"
            height="400"
            id="videoPlayer"
            src={`https://www.youtube.com/embed/${src}?autoplay=1`}
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default VideoPlayer;
