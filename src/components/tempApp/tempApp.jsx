import { getHellow, logout, validateToken } from '../../utils/axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const TempApp = () => {
  const navigate = useNavigate();

  const handelLogout = () => {
    const token = Cookies.get('dockteck_token');
    logout(token);
    Cookies.remove('dockteck_token');
    navigate('/login');
  };

  const handelValidateToken = async () => {
    const token = Cookies.get('dockteck_token');
    const isValid = await validateToken(token);
  };

  return (
    <div>
      <h1>You've logged in successfully</h1>

      <button onClick={() => getHellow(Cookies.get('dockteck_token'))}>
        Get hellow
      </button>
      <br />
      <br />
      <button onClick={handelLogout}>Logout</button>
      <br />
      <br />
      <button onClick={handelValidateToken}>Validate Token</button>
    </div>
  );
};

export default TempApp;
