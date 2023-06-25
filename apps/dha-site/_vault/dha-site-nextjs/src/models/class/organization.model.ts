export default class Organization {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  distance?: number;
  address1?: string;
  address2?: string;
  addressCity?: string;
  addressCountry?: string;
  addressPostCode?: string;
  addressState?: string;
  adoptionPolicy?: string;
  adoptionUrl?: string;
  photos?: number;
  socialMediaFacebook?: string;
  socialMediaInstagram?: string;
  socialMediaPinterest?: string;
  socialMediaTwitter?: string;
  socialMediaYoutube?: string;
  url?: string;

  constructor(
    id: string,
    name?: string,
    phone?: string,
    email?: string,
    distance?: number,
    address1?: string,
    address2?: string,
    addressCity?: string,
    addressCountry?: string,
    addressPostCode?: string,
    addressState?: string,
    adoptionPolicy?: string,
    adoptionUrl?: string,
    photos?: number,
    socialMediaFacebook?: string,
    socialMediaInstagram?: string,
    socialMediaPinterest?: string,
    socialMediaTwitter?: string,
    socialMediaYoutube?: string,
    url?: string,
  ) {
    this.id = id;
    if (name) this.name = name;
    if (phone) this.phone = phone;
    if (email) this.email = email;
    if (distance) this.distance = distance;

    if (address1) this.address1 = address1;
    if (address2) this.address2 = address2;
    if (addressCity) this.addressCity = addressCity;
    if (addressState) this.addressState = addressState;
    if (addressPostCode) this.addressPostCode = addressPostCode;
    if (addressCountry) this.addressCountry = addressCountry;
    if (adoptionPolicy) this.adoptionPolicy = adoptionPolicy;
    if (adoptionUrl) this.adoptionUrl = adoptionUrl;
    if (photos) this.photos = photos;

    if (socialMediaFacebook) this.socialMediaFacebook = socialMediaFacebook;
    if (socialMediaInstagram) this.socialMediaInstagram = socialMediaInstagram;
    if (socialMediaPinterest) this.socialMediaPinterest = socialMediaPinterest;
    if (socialMediaTwitter) this.socialMediaTwitter = socialMediaTwitter;
    if (socialMediaYoutube) this.socialMediaYoutube = socialMediaYoutube;

    if (url) this.url = url;
  }
}
