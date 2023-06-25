import { FC, useState } from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";

import Animal from "@/models/class/animal.model";
import FancyImageHolderView from "@/components/view/fancy-image-holder/fancy-image-holder";
import SearchAnimal from "@/components/view/search-animal/search-animal";
import ResultAnimalView from "@/components/view/result-animal/result-animal-view";

import styles from './app-view.module.scss';

interface Props{
    selectedAnimal: Animal,
    displayNoResultsFound: boolean,
    animalFoundHandler:(found:boolean) => void
}









const AppView:FC = (props:Props) => {
   return (
    <Container maxWidth="sm" className={styles.mainPageContainer}>
    <Grid container maxWidth="sm">
      <Grid item xs={6}>
        <FancyImageHolderView animal={props.selectedAnimal}/>
        <ResultAnimalView
          displayNoResultsFound={props.displayNoResultsFound}
          animal={props.selectedAnimal}
        />
      </Grid>
      <Grid item xs={6}>
        <SearchAnimal animalFoundHandler={props.animalFoundHandler}/>
      </Grid>
    </Grid>
  </Container>
   ) 
}

export default AppView;