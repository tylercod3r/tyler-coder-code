import Organization from './organization.model';

export default class Animal {
  name: string;
  gender: string;
  age: string;
  type: string;
  species: string;
  size: string;
  image: string;
  url: string;
  status: string;
  statusChangedAt: string;
  description: string;
  breed: string;
  attributeKeys: string[];
  attributeValues: string[];
  breedKeys: string[];
  breedValues: string[];
  addressCity: string;
  addressState: string;
  addressZip: string;
  video: string;
  organization: Organization;

  constructor(
    name: string,
    gender: string,
    age: string,
    type: string,
    species: string,
    size: string,
    image: string,
    url: string,
    status: string,
    statusChangedAt: string,
    description: string,
    breed: string,
    attributeKeys: string[],
    attributeValues: string[],
    breedKeys: string[],
    breedValues: string[],
    addressCity: string,
    addressState: string,
    addressZip: string,
    video: string,
    organization: Organization,
  ) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.type = type;
    this.species = species;
    this.size = size;
    this.image = image;
    this.url = url;
    this.status = status;
    this.statusChangedAt = statusChangedAt;
    this.description = description;
    this.breed = breed;
    this.attributeKeys = attributeKeys;
    this.attributeValues = attributeValues;
    this.breedKeys = breedKeys;
    this.breedValues = breedValues;
    this.addressCity = addressCity;
    this.addressState = addressState;
    this.addressZip = addressZip;
    this.video = video;
    this.organization = organization;
  }
}
