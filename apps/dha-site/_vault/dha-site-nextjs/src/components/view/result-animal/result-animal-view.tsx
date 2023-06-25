import { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';

import Animal from '../../../models/class/animal.model';
import DecoratedListItem from '../../control/decorated-list-item/decorated-list-item';

import styles from './result-animal.module.scss';

interface Props {
  displayNoResultsFound: boolean;
  animal?: Animal;
}

const ResultAnimalView = ({
  displayNoResultsFound,
  animal,
}: Props): JSX.Element => {
  const [currentAnimal, setCurrentAnimal] = useState<Animal>();
  const [locationText, setLocationText] = useState<string>(' ');
  const [organizationText, setOrganizationText] = useState<string>(' ');
  const [descriptionText, setDescriptionText] = useState<string>(' ');
  const [breedText, setBreedText] = useState<string>(' ');

  useEffect(() => {
    setCurrentAnimal(animal);

    if (animal) {
      const locationText =
        animal.addressCity +
        ', ' +
        animal.addressState +
        ' ' +
        animal.addressZip;

      setLocationText(locationText);

      if (animal.organization && animal.organization.name)
        setOrganizationText(animal.organization.name);

      const descriptionText = animal.description
        ? animal.description
        : '(none)';
      setDescriptionText(descriptionText);

      setBreedText(animal.breed);
    }
  }, [animal]);

  return (
    <Container maxWidth="sm">
      <Box className="resultAnimalViewBox">
        {currentAnimal /*&& currentAnimal.url*/ && (
          <ul>
            <p>
              <b>
                <span style={{ color: 'pink' }}>
                  {currentAnimal.species.toUpperCase() +
                    ' - ' +
                    currentAnimal.gender.toUpperCase() +
                    ' - ' +
                    currentAnimal.age.toUpperCase() +
                    ' - ' +
                    currentAnimal.size.toUpperCase() +
                    ' SIZE'}
                </span>
              </b>
            </p>

            <DecoratedListItem label={'location'} description={locationText} />

            <DecoratedListItem
              label={'organization'}
              description={organizationText}
            />

            <DecoratedListItem
              label={'description'}
              description={descriptionText}
            />

            <DecoratedListItem label={'breed'} description={breedText} />

            <li>
              <p>
                <b>video:</b>
                <br />
                <span style={{ color: 'white' }}>
                  {currentAnimal.video ? '' : '(none)'}
                </span>
                {currentAnimal.video && (
                  <iframe
                    src={currentAnimal.video}
                    frameBorder="0"
                    scrolling="no"
                    allow="autoplay; encrypted-media"
                    title="video"
                    allowFullScreen
                  />
                )}
              </p>
            </li>

            {/* <li>
              <p>
                <b>breed:</b>
              </p>
              <div>
                <ul>
                  {animal.breedKeys?.map((item, index) => (
                    <li>
                      {item}: {animal.breedValues && animal.breedValues[index]}
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li>
              <p>
                <b>attributes:</b>
              </p>
              <div>
                <ul>
                  {animal.attributeKeys?.map((item, index) => (
                    <li>
                      {item}:{" "}
                      {animal.attributeValues && animal.attributeValues[index]}
                    </li>
                  ))}
                </ul>
              </div>
            </li> */}
          </ul>
        )}

        {displayNoResultsFound && (
          <div className="no-results-text">No Results Found.</div>
        )}
      </Box>
    </Container>
  );
};

export default ResultAnimalView;