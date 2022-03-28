import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import env from "react-dotenv";
import Tile from "../tiles";
import { getData, requestOptions } from "../../utils/calls";
import { ITrendingData } from "../../utils/interfaces";

const Modal = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gif, setGif] = useState<ITrendingData[] | null>(null);

  const checkGifInLocalStorage = useCallback(() => {
    const stringifiedData = localStorage.getItem(`gif:${id}`);
    return stringifiedData ? JSON.parse(stringifiedData) : null;
  }, [id])

  const fetchGif = useCallback(async (url: string) => {
    const gifExists = checkGifInLocalStorage();
    if (gifExists) return setGif(gifExists);

    const {data} = await getData({url, options: requestOptions });
    if (data) {
      setGif(data);
      const stringifiedData = JSON.stringify(data);
      localStorage.setItem(`gif:${id}`, stringifiedData);
    }
  }, [checkGifInLocalStorage, id])

  const redirectTo = () => navigate('/');

  useEffect(() => {
    if (id) {
      const url = `https://api.giphy.com/v1/gifs?api_key=${env.API_KEY}&ids=${id}`;
      fetchGif(url);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [fetchGif, id]);

  return (
    <div className="modal">
      <div className="modal__body">
        <div className="modal__body__closer" onClick={redirectTo}>X</div>
        <div className="modal__body__content">
          {gif?.map((data, index) => <Tile data={data} key={index} />)}
        </div>
      </div>
    </div>
  );
}

export default Modal;