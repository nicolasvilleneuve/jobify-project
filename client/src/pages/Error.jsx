import notFound from "../assets/images/not-found.svg";
import {Link} from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
    return (
        <Wrapper className='full-page'>
            <div>
                <img src={notFound} alt="404" />
                <h4>Uh-oh, looks like that endpoint doesn't exist!</h4>
                <Link to='/'>Back Home</Link>
            </div>
        </Wrapper>
    );
};

export default Error;