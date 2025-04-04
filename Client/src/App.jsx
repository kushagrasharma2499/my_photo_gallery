import React, { useEffect, useState } from 'react';
import Navbar from './Component/Navbar';
import Button from './Component/Button';
import Grid from './Component/Grid';
import Carousel from './Component/Carousel';
import axios from 'axios';
import { message } from 'antd';
//import Footer from './Component/Footer';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const getData = async () => {
    try {
      let res = await axios.get('https://photo-gallery-1.onrender.com/getData');
      setPhotos(res.data.data);
    } catch (error) {
      message.error(`${error}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <Carousel photos={photos} />
      <Button selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      <Grid photos={photos} setSelectedImage={setSelectedImage} />
    </>
  );
};

export default App;
