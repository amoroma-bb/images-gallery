import { useState, useEffect } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import { Container, Row, Col } from "react-bootstrap";
import Welcome from "./components/Welcome";
import Spinner from "./components/Spinner";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



// const API_URL = "https://192.168.1.162:5050"

function App() {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5050/images`);
      setImages(res.data || []);
      setLoading(false)
      toast.success("Saved iamges download")

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => getSavedImages(), [])

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // fetch(
    //   // `http://192.168.1.162:5050/new-image?query=${word}`
    //   `http://127.0.0.1:5050/new-image?query=${word}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setImages([{ ...data, title: word }, ...images]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    try {
      const res = await axios.get(`http://127.0.0.1:5050/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
      toast.info(`Newe image ${word} was found`)
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setWord("");
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`http://127.0.0.1:5050/images/${id}`)
      if (res.data?.deleted_id) {
        toast.warn(`Image${images.find((i) => i.id === id).title} was deleted`)
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`http://127.0.0.1:5050/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(images.map((image) => image.id === id ? { ...image, saved: true } : image));
      }
      console.log(res.data);
      toast.info(`Image ${imageToBeSaved.title} has been saved`)

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div>
      <Header title="Images Gallery" />
      {loading ? (<Spinner />) : (
        <>

          <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard image={image} deleteImage={handleDeleteImage} saveImage={handleSaveImage} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      <ToastContainer/>
    </div>
  );
}

export default App;
