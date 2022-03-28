import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ITile } from '../../utils/interfaces';

const Tile = ({ data: { title, images, id } }: ITile): JSX.Element => {
  const navigate = useNavigate();
  const { id: idFromRoute } = useParams();
  const {pathname} = useLocation();
  const condition1 = idFromRoute === id;
  const condition2 = pathname !== '/';
  // covering bases
  const eitherOfTheseStillImages = images['fixed_height_small_still']?.url || images['fixed_width_small_still']?.url || images['fixed_height_still']?.url;
  
  const imageOrGif = condition1 && condition2 ? images['original']?.webp : eitherOfTheseStillImages;

  const redirectTo = () => {
    if (idFromRoute) return;
    navigate(`/${id}`);
  }

  const sizeInMB = () => {
    const webpSize = Number(images['original']?.webp_size) / 1024 || 0;
    const size = Number(images['fixed_height_small_still']?.size) / 1024 || 0;
    return idFromRoute ? Math.round(webpSize) : Math.round(size);
  }

  return (
    <div className="tile" onClick={redirectTo}>
      <div className="tile__media">
        <img src={imageOrGif} alt="nice gif" />
      </div>
      <div className="tile__details">
        <p>name: {title}</p>
        <p>size: {sizeInMB()} MB</p>
      </div>
    </div>
  )
}

export default Tile;