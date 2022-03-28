import { useNavigate } from "react-router-dom";
import { INoResultProps } from "../../utils/interfaces";

const NoResult = ({ setIsSearch, setNotFound }: INoResultProps): JSX.Element => {
  const navigate = useNavigate();
  const undoNoResult = () => {
    navigate('/');
    setIsSearch(false);
    setNotFound(false)
  }
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'column',
      background: '#eeede7',
    }}>
      <h1>No results were found at this time</h1>
      <button
        onClick={undoNoResult}
        style={{
          height: '4rem',
          marginTop: '3rem',
        }}
      >
        Go Back To Home Page
      </button>
    </div>
  )
}

export default NoResult;