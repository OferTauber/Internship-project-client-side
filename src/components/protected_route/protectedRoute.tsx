import Spinner from '../spinner/spinner';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { validateToken } from '../../utils/axios';
import Cookies from 'js-cookie';
import { convertTypeAnyToString } from '../../utils/convertors';

const ProtectedRoute: React.FunctionComponent<{
  children: any;
}> = ({ children }) => {
  const [spinner, setSpinner] = useState(true);
  const [tokenIsValid, setTokenIsValid] = useState(false);

  useEffect(() => {
    const validate = async () => {
      isMunted = true;
      const token = convertTypeAnyToString(Cookies.get('dockteck_token'));
      const accessIsApproved = await validateToken(token);
      if (isMunted) {
        setTokenIsValid(accessIsApproved);
        if (!accessIsApproved) Cookies.remove('dockteck_token');
        setSpinner(false);
      }
    };

    let isMunted: boolean = false;
    validate();

    return () => {
      isMunted = false;
    };
  });

  if (spinner) return <Spinner />;

  // return (
  //   <Route element={tokenIsValid ? children : <Navigate to={'/login'} />} />
  // );
  return tokenIsValid ? <>{children}</> : <Navigate to={'/login'} />;
};

export default ProtectedRoute;
