import { useState, useEffect, MouseEvent } from 'react';
import { Box, Container } from '@mui/material';
import { useAnimate } from 'react-simple-animate';
import axios from 'restyped-axios';
import { GiphyAPI } from 'restyped-giphy-api';

import FancyImage from '../../fancy-image/fancy-image-layout';

import styles from './fancy-image-holder.module.scss'

import {
  GIPHY_URL_BASE,
  GIPHY_API_KEY,
  GIPHY_SEARCH_TERM,
  PLACERHOLDER_IMAGE_URL,
} from '../../../models/consntant/constants';

import Animal from '../../../models/class/animal.model';

interface Props {
  animal?: Animal;
}

const FancyImageHolder = ({ animal }: Props): JSX.Element => {
  const [imgSrc, setImgSrc] = useState('');
  const [animalGender, setAnimalGender] = useState<string | undefined>(
    animal?.gender,
  );
  const [imageStyles, setImageStyles] = useState({
    border: '20px solid #000000',
    borderRadius: '25px',
    marginTop: '0.5rem',
    width: '80%',
    height: '100%',
    color: '#000000',
  });

  const client = axios.create<GiphyAPI>({ baseURL: GIPHY_URL_BASE });

  const { play, style } = useAnimate({
    start: { opacity: 0 },
    end: { opacity: 1 },
    delay: 0.6,
  });

  useEffect(() => {
    client
      .request({
        url: '/gifs/random',
        params: {
          api_key: GIPHY_API_KEY,
          tag: GIPHY_SEARCH_TERM,
        },
      })
      .then((res) => {
        // define
        type ImageObject = { downsized_large: { url: string } };

        class GiphyRandomPic {
          images: ImageObject;

          constructor() {
            this.images = {} as ImageObject;
          }
        }

        // parse
        const gRandomPic = Object.assign(new GiphyRandomPic(), res.data.data);
        const imageURL = gRandomPic.images.downsized_large.url;

        // set
        setImgSrc(imageURL);

        // animate
        play(true);
      });
  }, []);

  useEffect(() => {
    // set image
    if (animal?.image) {
      setImgSrc(animal?.image);
      setAnimalGender(animal?.gender);

      if (imageStyles) {
        const color = animal?.gender === 'male' ? '#5555d9' : '#ffa3d9';
        const newObj = { ...imageStyles, color };
        setImageStyles(newObj);
      }

      console.log('ANIMAL STATUS: ' + animal.status);
    }
  }, [animal?.image]);

  const handleAdoptClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open(animal?.url, '_blank');
  };

  return (
    <Box className="fancy-image-holder-box">
      <Container>
        {/* <div style={style}>
        <div style={{ color: 'white' }}>
          <h1>Dont Hurt Animals!</h1>
        </div>
      </div> */}

        <FancyImage
          style={imageStyles}
          placeholderImg={PLACERHOLDER_IMAGE_URL}
          src={imgSrc}
        />

        <div style={style}>
          {animalGender ? (
            ''
          ) : (
            <img src="./img/giphy-logo.gif" alt="giphy-logo" />
          )}
        </div>

        <div style={{ width: `100%`, background: `` }}>
          {animal && (
            <div style={{ width: `100%`, textAlign: `center` }}>
              <div style={{ paddingBottom: '2px' }}>
                <p>
                  <span style={{ color: 'cyan', fontSize: '60px' }}>
                    {animal?.name}
                  </span>
                </p>

                <p>
                  <b>
                    <span style={{ color: 'green', fontSize: '30px' }}>
                      {animal.status.toUpperCase()}
                    </span>
                  </b>
                  <br />
                  <span
                    style={{
                      color: '#BADA55',
                      fontSize: '20px',
                      marginLeft: '0px',
                    }}
                  >
                    (<b>UPDATED: </b>
                  </span>

                  <span style={{ color: 'white', fontSize: '20px' }}>
                    {animal.statusChangedAt})
                  </span>
                </p>
              </div>

              <button className="adopt-button" onClick={handleAdoptClick}>
                ADOPT ME!
              </button>
            </div>
          )}
        </div>
      </Container>
    </Box>
  );
};

export default FancyImageHolder;