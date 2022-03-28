import { useEffect, useState, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bars } from "react-loader-spinner";
import env from "react-dotenv";
import { Outlet } from "react-router-dom";
import Tile from "../tiles";
import Search from "../search";
import { getData, requestOptions } from '../../utils/calls';
import { ITrendingData } from "../../utils/interfaces";
import EndOfTiles from "../tiles/EndOfTiles";
import NoResult from "../tiles/NoResults";

const Board = (): JSX.Element => {
  const [trending, setTrending] = useState<ITrendingData[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const page = useRef(0);
  const [hasMore, setHasMore] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const apiCall = async (url: string) => {
    const {
      data,
      pagination
    } = await getData({url, options: requestOptions});
    if (!data.length) return setNotFound(true);
    const { offset = 0, total_count, count } = pagination;
    page.current = offset + 1;
    count * offset <= total_count && setHasMore(true);

    return data || [];
  }

  const getTrends = useCallback(async () => {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${env.API_KEY}&offset=${page.current}&limit=20`;
  
    const data = await apiCall(url)
    data.length && setTrending(prevState => prevState.concat(data));
  }, [])

  const getSearch = async () => {
    if (isSearch) {
      hasMore && setHasMore(false);
      page.current = 0;
    }

    const encoded = encodeURIComponent(searchTerm)
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${env.API_KEY}&q=${encoded}&offset=${page.current}&limit=20`;

    const data = await apiCall(url);
    data.length && setSearchResult(prevState => prevState.concat(data));
  }

  useEffect(() => {
    getTrends();
  }, [getTrends]);

  const LoaderDiv = () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    }}>
      <Bars color="#00BFFF" height={80} width={80} />
    </div>
  );

  if (notFound) return (<NoResult
    setIsSearch={setIsSearch}
    setNotFound={setNotFound}
  />)

  return (
    <div className="board">
      <div className="board__container">
        <div className="board__container__search">
            <Search
              setIsSearch={setIsSearch}
              searchData={getSearch}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
        </div>
        <Outlet />
        <InfiniteScroll
          next={isSearch ? getSearch : getTrends}
          hasMore={hasMore}
          children={
            isSearch ? 
            searchResult.map((data, index) => <Tile key={index} data={data} />) :
            trending.map((data, index) => <Tile key={index} data={data} />)
          }
          loader={<LoaderDiv />}
          dataLength={isSearch ? searchResult.length : trending.length}
          className="board__container__tiles"
          endMessage={(searchResult.length || trending.length) ? <EndOfTiles /> : <LoaderDiv />}
        />
      </div>
    </div>
  )
}

export default Board;