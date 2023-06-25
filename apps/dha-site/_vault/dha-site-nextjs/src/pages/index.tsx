import { FC, useState, Fragment } from "react";

import Animal from "@/models/class/animal.model";
import AppView from "@/components/view/app/app-view";
import AppBarView from '@/components/view/app-bar/app-bar-view';

import styles from "../app-view.module.scss";

const Home: FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>();
  const [displayNoResultsFound, setDisplayNoResultsFound] =
    useState<boolean>(false);

  const animalFoundHandler = (showNoResultsFound: boolean, animal?: Animal) => {
    setDisplayNoResultsFound(showNoResultsFound);
    setSelectedAnimal(animal);
  };

  return (
    <Fragment>
      <AppBarView/>
      <AppView 
        selectedAnimal={selectedAnimal} 
        displayNoResultsFound={displayNoResultsFound}
        animalFoundHandler={animalFoundHandler}/>
    </Fragment>
  );
};

export default Home;