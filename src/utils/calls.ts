import { IFetchInputs } from './interfaces';

export const getData = async ({url, options }: IFetchInputs) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export const requestOptions =  {
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-url-encoded',
    'Accept': 'application/json'
  }
}