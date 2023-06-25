import './searchAnimalView.sass';

import { useState, useEffect, MouseEvent } from 'react';
import { Client } from '@petfinder/petfinder-js';
import { Box, Button, Typography, TextField, Tooltip } from '@mui/material';

import {
  SEARCH_PROMPT,
  SEARCH_ANY_LABEL,
  SEARCH_LOCATION_TOOLTIP_FRAGMENTS,
  SEARCH_FIND_LOCALS_LABEL,
  SEARCH_LOCATION_DEFAULT_INPUT_TEXT,
  SEARCH_GENDER_OPTIONS,
  SEARCH_SIZE_OPTIONS,
  SEARCH_FIND_PET_LABEL,
  SEARCH_DISTANCE_OPTIONS,
  SEARCH_ORG_LIST_QUERY_PAGE_SIZE,
  SEARCH_ORG_LIST_DISPLAY_PAGE_SIZE,
  PETFINDER_SECRET_KEY,
  PETFINDER_API_KEY,
} from './../../../models/consntant/constants';
import Animal from '../../../models/class/animal.model';
import Organization from '../../../models/class/organization.model';
import Dropdown from './../../control/dropdown/dropdown';
import ResultOrgView from '../resultOrgView/resultOrgView';
import OrgListView from '../orgListView/orgListView';

interface Props {
  animalFoundHandler(displayNoResultsFound: boolean, animal?: Animal): void;
}

const serverClient = new Client({
  apiKey: PETFINDER_API_KEY,
  secret: PETFINDER_SECRET_KEY,
});

const SearchAnimalView = ({ animalFoundHandler }: Props) => {
  // setters ///////////////////////////////////////////////////////
  const [animalTypes, setAnimalTypes] = useState<string[]>(['']);
  const [selectedAnimalType, setSelectedAnimalType] = useState<string>();
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>();

  const [location, setLocation] = useState<string>();
  const [locationTooltipText, setLocationTooltipText] = useState<string>();

  const [searchButtonEnabled, setSearchButtonEnabled] =
    useState<boolean>(false);

  const [genderTypes, setGenderTypes] = useState<string[]>(['']);
  const [selectedGenderType, setSelectedGenderType] = useState<string>('');

  const [sizeType, setSizeType] = useState<string>();
  const [selectedSizeType, setSelectedSizeType] = useState<string>();

  const [breedTypes, setBreedTypes] = useState<string[]>(['']);
  const [selectedBreedType, setSelectedBreedType] = useState<string>();
  const [disableBreedDropdown, setDisableBreedDropdown] = useState<boolean>();
  const [organizationTypes, setOrganizationTypes] = useState<Organization[]>();
  const [organizationType, setOrganizationType] = useState<Organization>();
  const [selectedOrganizationType, setSelectedOrganizationType] =
    useState<Organization>();
  const [organizationTypeLabels, setOrganizationTypeLabels] = useState<
    string[]
  >([SEARCH_ANY_LABEL]);
  const [organizationTypeDropdownEnabled, setOrganizationTypeDropdownEnabled] =
    useState<boolean>(false);

  const [selectedDistance, setSelectedDistance] = useState<number>();
  //////////////////////////////////////////////////////////////////

  // use effect ////////////////////////////////////////////////////
  useEffect(() => {
    // location tooltip
    const tip = SEARCH_LOCATION_TOOLTIP_FRAGMENTS.join('\n');
    setLocationTooltipText(tip);

    setDisableBreedDropdown(true);

    setGenderTypes(SEARCH_GENDER_OPTIONS);

    requestServerAnimals();

    setLocation(SEARCH_LOCATION_DEFAULT_INPUT_TEXT);
  }, []);

  useEffect(() => {
    if (selectedAnimal) {
      if (selectedOrganizationType) {
        // set org
        selectedAnimal.organization = selectedOrganizationType;

        // notify parent component
        animalFoundHandler(false, selectedAnimal);
      } else {
        // retrieve 'org' data
        requestServerOrg(selectedAnimal.organization.id);
      }
    }
  }, [selectedAnimal]);
  //////////////////////////////////////////////////////////////////

  // click handler-get animal //////////////////////////////////////
  const handleSearchClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSearchButtonEnabled(false);

    requestServerAnimal();
  };
  //////////////////////////////////////////////////////////////////

  // click handler-get orgs ////////////////////////////////////////
  const handleRequestOrganizationsClick = (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    setSearchButtonEnabled(false);

    requestServerOrgs();
  };
  //////////////////////////////////////////////////////////////////

  // handler-dropdown select ///////////////////////////////////////
  const handleLocationInputChange = (e: any) => {
    setLocation(e.target.value);
  };

  const typeSelectHandler = (value: string): void => {
    setSelectedAnimalType(value);

    requestServerBreeds(value);
  };

  const genderSelectHandler = (value: string): void => {
    setSelectedGenderType(value);
  };

  const sizeSelectHandler = (value: string): void => {
    setSelectedSizeType(value);
  };

  const breedSelectHandler = (value: string): void => {
    setSelectedBreedType(value);
  };

  const organizationSelectHandler = (value: string): void => {
    if (organizationTypes) {
      for (let i = 0; i < organizationTypes.length; i++) {
        const org = organizationTypes[i];
        if (org.name?.toLowerCase() === value) {
          setSelectedOrganizationType(org);
        }
      }
    }
  };

  const distanceSelectHandler = (value: string): void => {
    setSelectedDistance(+value);
  };
  //////////////////////////////////////////////////////////////////

  // handler - pagintaion //////////////////////////////////////////
  const handlePaginationRequest = (e: any) => {
    // setLocation(e.target.value);
    console.log('handle pagination request!');
  };
  //////////////////////////////////////////////////////////////////

  // http request-animals //////////////////////////////////////////
  const requestServerAnimals = () => {
    // disable button
    setSearchButtonEnabled(false);

    // call server
    serverClient.animalData.types().then((resp) => {
      // get types
      const animalTypes: string[] = [];
      for (const type of resp.data.types) {
        animalTypes.push(type.name);
      }

      // set types
      setAnimalTypes(animalTypes);

      // button state
      enableButtons(true);
    });
  };
  //////////////////////////////////////////////////////////////////

  // http request-animal (signular) ////////////////////////////////
  const requestServerAnimal = () => {
    // config
    const searchParams = {
      type: selectedAnimalType,
      // breed: selectedAnimalBreed,
      sort: 'random',
      limit: 1,
      location: location,
      distance: selectedDistance,
      size: selectedSizeType,
      breed: selectedBreedType,
      gender: selectedGenderType,
      organization: selectedOrganizationType?.id,
    };

    // call server
    serverClient.animal
      .search(searchParams)
      .then(handleResponseRequestAnimal)
      .catch(function (error) {
        // notify parent component - no results
        animalFoundHandler(true);

        // button state
        enableButtons(true);
      });
  };
  //////////////////////////////////////////////////////////////////

  // http request-breeds //////////////////////////////////////////
  const requestServerBreeds = (animalType: string) => {
    // disable button
    setSearchButtonEnabled(false);

    setDisableBreedDropdown(true);

    // call server
    serverClient.animalData.breeds(animalType).then((resp) => {
      // get types
      const breedTypes: string[] = [];
      for (const type of resp.data.breeds) {
        breedTypes.push(type.name);
      }

      // set types
      setBreedTypes(breedTypes);

      // button state
      enableButtons(true);

      setDisableBreedDropdown(false);
    });
  };
  //////////////////////////////////////////////////////////////////

  // http request-orgs /////////////////////////////////////////////
  const requestServerOrgs = () => {
    // config
    const searchParams = {
      sort: 'distance',
      // limit: 4, // SEARCH_ORG_LIST_QUERY_PAGE_SIZE,
      location: location,
      distance: selectedDistance,
      // page: pageIndex + 1,
    };

    // call server
    serverClient.organization
      .search(searchParams)
      .then(handleResponseRequestOrgs)
      .catch(function (error) {
        // debug
        console.log('error @ requestServerOrgs: ' + error);

        // button state
        enableButtons(true);
      });
  };
  //////////////////////////////////////////////////////////////////

  // http request-org (singular) ///////////////////////////////////
  const requestServerOrg = (orgID: string) => {
    // call server
    serverClient.organization
      .show(orgID)
      .then(handleResponseRequestOrg)
      .catch(function (error) {
        // debug
        console.log('error @ requestServerOrg: ' + error);

        // button state
        enableButtons(true);
      });
  };
  //////////////////////////////////////////////////////////////////

  // http response-animal //////////////////////////////////////////
  const handleResponseRequestAnimal = (response: any) => {
    // get animal
    const animalData = response.data.animals[0];

    // set animal
    setSelectedAnimal(parseAnimal(animalData));

    // button state
    enableButtons(true);
  };
  //////////////////////////////////////////////////////////////////

  // http response-orgs ////////////////////////////////////////////
  const handleResponseRequestOrgs = (response: any) => {
    // debug
    console.log(response.data);

    // // get animal
    const orgData = response.data.organizations;
    const pagData = response.data.pagination;
    const totalCount = pagData.total_count;

    //// RECOMMENT -- add below!!!!!!!!!!!!!!!!!!!!!!!
    // // notify parent component
    // orgsFoundHandler(
    //   false,
    //   getOrgs(orgData),
    //   pagData['total_pages'],
    //   pageIndex,
    //   totalCount,
    // );

    setOrganizationTypes(parseOrgs(orgData));
    setOrganizationTypeLabels(parseOrgTypeLabels(orgData));
    setOrganizationTypeDropdownEnabled(true);

    enableButtons(true);
  };
  //////////////////////////////////////////////////////////////////

  // http response-org /////////////////////////////////////////////
  const handleResponseRequestOrg = (response: any) => {
    const org: Organization = parseOrg(response.data.organization);
    if (org && selectedAnimal) {
      // set org
      selectedAnimal.organization = org;

      // notify parent component
      animalFoundHandler(false, selectedAnimal);
    } else {
      console.log('org not found @ handleResponseRequestOrg.');
    }

    enableButtons(true);
  };
  //////////////////////////////////////////////////////////////////

  // http response parse-animal ////////////////////////////////////
  const parseAnimal = (data: any) => {
    // debug
    // console.log('parse animal: ' + data);

    // name
    const name = data.name;

    // gender
    const gender = data.gender.toLowerCase();

    // age
    const age = data.age.toLowerCase();

    // type / species
    const type = data.type.toLowerCase();
    const species = data.species.toLowerCase();

    // size
    const size = data.size.toLowerCase();

    // image / url
    const image = data.photos[0].large;
    const url = data.url;

    // status / status changed at
    const status = data.status;
    const statusChangedAt = data.status_changed_at;

    // descrition
    const description = data.description;

    // breed
    const breed = data.breeds.primary;

    // attributes
    const attributeKeys: string[] = Object.keys(data.attributes);
    const attributeValues: string[] = Object.values(data.attributes);

    // breeds
    const breedKeys: string[] = Object.keys(data.breeds);
    const breedValues: string[] = Object.values(data.breeds);

    // address
    const addressCity: string = data.contact.address.city;
    const addressState: string = data.contact.address.state;
    const addressZip: string = data.contact.address.postcode;

    // video
    let video = '';
    if (data.videos.length > 0) {
      // get url
      const str = data.videos[0].embed;
      const index = str.indexOf('src');
      const newStr = str.substring(index, str.length - 1);
      const indexQ1 = newStr.indexOf("'", 0);
      const indexQ2 = newStr.indexOf("'", indexQ1 + 1);

      video = newStr.substring(indexQ1 + 1, indexQ2);
    }

    // org
    const org = new Organization(data.organization_id);

    // set data
    // note: 'org name' not yet known, only org-id!
    const animal = new Animal(
      name,
      gender,
      age,
      type,
      species,
      size,
      image,
      url,
      status,
      statusChangedAt,
      description,
      breed,
      attributeKeys,
      attributeValues,
      breedKeys,
      breedValues,
      addressCity,
      addressState,
      addressZip,
      video,
      org,
    );

    return animal;
  };
  //////////////////////////////////////////////////////////////////

  // http response parse-orgs //////////////////////////////////////
  const parseOrgs = (data: any) => {
    const orgs: Organization[] = [];

    data.forEach((org: any) => {
      orgs.push(parseOrg(org));
    });

    return orgs;
  };

  // http response parse-org (singular) ////////////////////////////
  const parseOrg = (data: any) => {
    const org: Organization = new Organization(
      data['id'],
      data['name'],
      data['phone'],
      data['email'],
      data['distance'],
      data['address']['address1'],
      data['address']['address2'],
      data['address']['city'],
      data['address']['country'],
      data['address']['postcode'],
      data['address']['state'],
      data['adoption']['policy'],
      data['adoption']['url'],
      data['photos']['length'],
      data['social_media']['facebook'],
      data['social_media']['instagram'],
      data['social_media']['pinterest'],
      data['social_media']['twitter'],
      data['social_media']['youtube'],
      data['url'],
    );

    return org;
  };
  //////////////////////////////////////////////////////////////////

  // http response parse-org labels ////////////////////////////////
  const parseOrgTypeLabels = (data: Organization[]) => {
    const labels: string[] = [];

    data.forEach((org) => {
      if (org.name) labels.push(org.name);
    });

    return labels;
  };
  //////////////////////////////////////////////////////////////////

  // button util ///////////////////////////////////////////////////
  const enableButtons = (enable: boolean) => {
    setSearchButtonEnabled(enable);
  };

  return (
    <Box className="search-animal-view-box">
      <Typography variant="h4" component="h5">
        {SEARCH_PROMPT}
      </Typography>

      <Button
        className="search-animal-view-button"
        variant="contained"
        onClick={handleSearchClick}
        disabled={!searchButtonEnabled}
        sx={{ margin: '20px' }}
      >
        {SEARCH_FIND_PET_LABEL}
      </Button>

      <Dropdown
        label="type"
        items={animalTypes}
        defaultOption={SEARCH_ANY_LABEL}
        selectHandler={typeSelectHandler}
        disable={false}
      />

      <Dropdown
        label="breed"
        items={breedTypes}
        defaultOption={SEARCH_ANY_LABEL}
        selectHandler={breedSelectHandler}
        disable={disableBreedDropdown!}
      />

      <Dropdown
        label="gender"
        items={genderTypes}
        defaultOption={SEARCH_ANY_LABEL}
        selectHandler={genderSelectHandler}
        disable={false}
      />

      <Dropdown
        label="size"
        items={SEARCH_SIZE_OPTIONS}
        defaultOption={SEARCH_ANY_LABEL}
        selectHandler={sizeSelectHandler}
        disable={false}
      />

      <Tooltip
        title={
          <div style={{ whiteSpace: 'pre-line' }}>{locationTooltipText}</div>
        }
      >
        <TextField
          id="filled-basic"
          label="location"
          fullWidth
          variant="filled"
          defaultValue={SEARCH_LOCATION_DEFAULT_INPUT_TEXT}
          onChange={handleLocationInputChange}
        />
      </Tooltip>

      <Dropdown
        label="distance"
        items={SEARCH_DISTANCE_OPTIONS}
        defaultOption={SEARCH_ANY_LABEL}
        selectHandler={distanceSelectHandler}
        disable={false}
      />

      <Button
        variant="contained"
        onClick={handleRequestOrganizationsClick}
        disabled={!searchButtonEnabled}
        className="search-animal-view-button"
        sx={{ marginBottom: '20px', marginTop: '20px' }}
      >
        {SEARCH_FIND_LOCALS_LABEL}
      </Button>

      {/* <Dropdown
        label="organization"
        items={organizationTypeLabels}
        defaultOption={SEARCH_ANY_LABEL}
        selectHandler={organizationSelectHandler}
        disable={!organizationTypeDropdownEnabled}
      /> */}

      <OrgListView
        displayNoResultsFound={true}
        orgData={organizationTypes}
        pageCount={1}
        pageIndex={0}
        totalCount={organizationTypes ? organizationTypes.length : 0}
        paginationRequestHandler={handlePaginationRequest}
      />
    </Box>
  );
};

export default SearchAnimalView;
