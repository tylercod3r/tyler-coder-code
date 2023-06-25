import React, { useState, useEffect, MouseEvent } from 'react';

import { Client } from '@petfinder/petfinder-js';

import {
  PETFINDER_API_KEY,
  PETFINDER_SECRET_KEY,
} from '../../../models/consntant/constants';
import Organization from '../../../models/class/organization.model';
// import { DropdownSearchOrg } from '../dropdownSearchOrg/dropdownSearchOrg';

import './searchByOrgView.sass';

interface Props {
  title: string;
  orgsFoundHandler(
    displayNoResultsFound: boolean,
    orgs?: Organization[],
    pageCount?: number,
    pageIndex?: number,
    totalCount?: number,
  ): void;
  forcedPageIndex: number;
}

export default function SearchOrgView({
  title,
  orgsFoundHandler,
  forcedPageIndex,
}: Props) {
  // const [animalTypes, setAnimalTypes] = useState<string[]>();
  // const [selectedAnimalType, setSelectedAnimalType] = useState<string>("Dog");
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [location, setLocation] = useState<string>();
  const [searchButtonEnabled, setSearchButtonEnabled] =
    useState<boolean>(false);

  const inputPrompt = 'Enter Location...';

  useEffect(() => {
    console.log('USE EFFECT _ FORCED: ' + forcedPageIndex);

    if (forcedPageIndex > -1) setPageIndex(forcedPageIndex);
    console.log('SET FORCED INDEX: ' + forcedPageIndex);

    // types
    // const client = new Client({
    //   apiKey: PETFINDER_API_KEY,
    //   secret: PETFINDER_SECRET_KEY,
    // });

    // let animalTypes = [""];
    // client.animalData.types().then((resp) => {
    //   for (let type of resp.data.types) {
    //     animalTypes.push(type.name);
    //   }

    //   // TODO - hack! 1st slot is empty?
    //   animalTypes.splice(0, 1);

    //   // setAnimalTypes(animalTypes);

    //   // setSelectedAnimalType(animalTypes[0]);

    setSearchButtonEnabled(false);
    // });
  }, [forcedPageIndex]);

  useEffect(() => {
    if (location && location.length > 0) requestServerData();
  }, [pageIndex]);

  const requestServerData = () => {
    console.log('******* REQUEST=SERVER=DATA PAGE INDEX: ' + pageIndex);

    setSearchButtonEnabled(false);

    const client = new Client({
      apiKey: PETFINDER_API_KEY,
      secret: PETFINDER_SECRET_KEY,
    });

    // serach for animal
    const searchParams = {
      // type: selectedAnimalType,
      // breed: selectedAnimalBreed,
      sort: 'distance',
      // limit: 1,
      location: location,
      // gender: selectedAnimalGender,
      page: pageIndex + 1,
    };

    client.organization
      .search(searchParams)
      .then(parseResponse)
      .catch(function (error) {
        // notify parent component - no results
        orgsFoundHandler(true);

        setSearchButtonEnabled(false);
      });
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    requestServerData();
  };

  function parseResponse(response: any) {
    console.log('RESPONSE @ SEARCH BY ORG');
    console.log(response.data);

    // // get animal
    const orgData = response.data.organizations;
    const pagData = response.data.pagination;
    const totalCount = pagData.total_count;

    // // notify parent component
    orgsFoundHandler(
      false,
      getOrgs(orgData),
      pagData['total_pages'],
      pageIndex,
      totalCount,
    );
  }

  function getOrgs(data: []) {
    const orgs: Organization[] = [];

    data.forEach((org) => {
      orgs.push(
        new Organization(
          org['id'],
          org['name'],
          org['phone'],
          org['email'],
          org['distance'],
          org['address']['address1'],
          org['address']['address2'],
          org['address']['city'],
          org['address']['country'],
          org['address']['postcode'],
          org['address']['state'],
          org['adoption']['policy'],
          org['adoption']['url'],
          org['photos']['length'],
          org['social_media']['facebook'],
          org['social_media']['instagram'],
          org['social_media']['pinterest'],
          org['social_media']['twitter'],
          org['social_media']['youtube'],
          org['url'],
        ),
      );
    });

    console.log('************ TOTAL ORGS: ' + orgs.length);

    return orgs;
  }

  const handleSelect = (e: any) => {
    e.preventDefault();

    const target = e.target;
    if (target instanceof HTMLInputElement) {
      setLocation(target.value);

      setSearchButtonEnabled(target.value.length > 0);
    }
  };

  return (
    <div className="search-box">
      {/* <DropdownSearchOrg
        formLabel="Rescue a New Friend!"
        buttonText="SEARCH BY ORG"
        action="/"
        onChange={handleSelect}
        onSubmit={handleSubmit}
        searchButtonEnabled={searchButtonEnabled}
        inputPrompt={inputPrompt}
      /> */}
    </div>
  );
}
