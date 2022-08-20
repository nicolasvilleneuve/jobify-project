import {JobsContainer, SearchContainer} from "../../components/index";
import Wrapper from "../../assets/wrappers/DashboardFormPage";


const AllJobs = () => {
    return (
        <div>
            <div>
                <Wrapper>
                    <SearchContainer />
                </Wrapper>
            </div>
            <div>
                <JobsContainer />
            </div>
        </div>
)
};
export default AllJobs;
