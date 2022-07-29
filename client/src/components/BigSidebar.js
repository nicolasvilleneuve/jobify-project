import Wrapper from "../assets/wrappers/BigSidebar";
import {Logo, NavLinks} from "./index";

const BigSidebar = () => {
    return (
        <Wrapper>
            <div>
                <header>
                <Logo/>
                </header>
            </div>
            <NavLinks />
        </Wrapper>
    )
};

export default BigSidebar;