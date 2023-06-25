import './mainPage.sass';

import { FC, useState } from 'react';
import { Container } from '@mui/material';

import Animal from './../../../models/class/animal.model';
import FancyImageHolderView from '../../view/fancyImageHolderView/fancyImageHolderView';
import SearchAnimalView from './../../view/searchAnimalView/searchAnimalView';
import ResultAnimalView from './../../view/resultAnimalView/resultAnimalView';
import Grid from '@mui/material/Grid';

const MainPage: FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>();
  const [displayNoResultsFound, setDisplayNoResultsFound] =
    useState<boolean>(false);

  const animalFoundHandler = (showNoResultsFound: boolean, animal?: Animal) => {
    setDisplayNoResultsFound(showNoResultsFound);
    setSelectedAnimal(animal);
  };

  return (
    <Container maxWidth="sm" className="mainPageContainer">
      <Grid container maxWidth="sm">
        <Grid item xs={6}>
          <FancyImageHolderView animal={selectedAnimal} />
          <ResultAnimalView
            displayNoResultsFound={displayNoResultsFound}
            animal={selectedAnimal}
          />
        </Grid>
        <Grid item xs={6}>
          <SearchAnimalView animalFoundHandler={animalFoundHandler} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainPage;
