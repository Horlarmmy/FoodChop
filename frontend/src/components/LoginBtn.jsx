import { useAuth } from "../use-auth-client";

// eslint-disable-next-line react/prop-types
const LoginBtn = ({content}) => {
  const {  logout } = useAuth();

    return (
      <div>
          <button onClick={logout} className='bg-secondary text-white md:py-3 py-1 md:text-xl text-base md:font-semibold font-medium hover:bg-secondary/95 hover:text-white active:bg-primary active:text-white md:px-6 px-3 rounded-md'>
          {content}
        </button>
      </div>
    )
  }
  
  export default LoginBtn