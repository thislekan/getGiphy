
interface IOptions {
  method: string;
  headers: {
    'Content-Type': string;
    'Accept': string;
  }
}

export interface IFetchInputs {
  url: string!;
  options?: IOptions;
}

interface IstillImages {
  url: string;
  height: string;
  width: string;
  size: string;
  mp4: string;
  webp: string;
  webp_size: string;
}

interface IImagesObject {
  '480w_still'?: IstillImages,
  'fixed_height_small_still'?: IstillImages;
  'fixed_height'?: IstillImages;
  'original_mp4'?: IstillImages;
  'original'?: IstillImages;
  'fixed_width_small_still'?: IstillImages;
  'fixed_height_still'?: IstillImages;
}

export interface ITile {
  data: {
    title: string;
    images: IImagesObject;
    id?: string;
    showGif?: boolean;
  }
}

export interface ITrendingData {
  title: string;
  images: {
    '480w_still': IstillImages;
    'fixed_height_small_still': IstillImages;
    'fixed_height': IstillImages;
    'original_mp4': IstillImages;
    'original': IstillImages;
    'fixed_width_small_still': IstillImages;
    'fixed_height_still': IstillImages;
  }
}

export interface ISearchProps {
  setIsSearch: (value: boolean) => void;
  searchData: (value?: string) => void;
  setSearchTerm: (value: string) => void;
  searchTerm: string; 
}

export interface IBoardGifState {
  title?: string;
  images?: IImagesObject
}

export interface INoResultProps {
  setIsSearch: (val: boolean) => void;
  setNotFound: (val: boolean) => void;
}