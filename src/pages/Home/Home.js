import React from 'react';
import HomeCarousel from './components/HomeCarousel'
import HomeJumboTron from './components/HomeJumbotron'
import img1 from './../../static/img/sensor.jpeg';
import img2 from './../../static/img/sensores (2).jpeg';
import img3 from './../../static/img/sensores (3).jpeg';
import img4 from './../../static/img/sensores (4).jpeg';

  const items = [
    {
      src: img1,
      altText: 'Slide 1',
      caption: 'Slide 1'
    },
    {
      src: img2,
      altText: 'Slide 2',
      caption: 'Slide 2'
    },
    {
      src: img3,
      altText: 'Slide 3',
      caption: 'Slide 3'
    },
    {
      src: img4,
      altText: 'Slide 3',
      caption: 'Slide 3'
    }
  ];
  const content = {
      title: 'Flood Forecast',
      text: 'Sistema de pronóstico de inundación realizado como Proyecto Terminal en la Unidad Profesional Interdisciplinaria en Ingeniería y Tecnologías Avanzadas.',
      subtext: ' El modelo de predicción de inundaciones fue desarrollado usando los datos climatológicos ofrecidos por el gobierno de la CDMX. Si quieres saber más da click en el siguiente botón',
      button: 'Learn more'
  }

const Home = (props) => {

    return(
        <div>
            <HomeCarousel items={items}/>
            <HomeJumboTron content={content}/>
        </div>
    );
}

export default Home;