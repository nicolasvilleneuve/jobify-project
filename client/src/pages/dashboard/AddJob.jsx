import {FormRow, FormRowSelect, Alert} from "../../components";
import {useAppContext} from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";


const AddJob = () => {
    const {
        isLoading,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        isEditing,
        handleChange,
        clearValues,
        createJob
    } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!position || !company || !jobLocation) {
        //     displayAlert();
        //     return
        // }
        if (isEditing) {
            // evenatually editJob();
            return
        }
        createJob();
        console.log('created job')
    }

    const handleJobInput = (e) => {
        handleChange({name: e.target.name, value: e.target.value})
    }

    return (
        <Wrapper>
            <form className="form">
                <h3> {isEditing ? 'Edit Job' : 'Add Job'}</h3>
                {showAlert && <Alert/>}

                <div className="form-center">
                    <FormRow
                        type='text'
                        name='position'
                        value={position}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type='text'
                        name='company'
                        value={company}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type='text'
                        labelText="job location"
                        name='jobLocation'
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />

                    <FormRowSelect
                        name='jobType'
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />

                    <FormRowSelect
                        labelText='status'
                        name='status'
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />

                    <div className="btn-container">
                        <button
                            className='btn btn-block submit-btn'
                            type='submit'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            Submit
                        </button>
                        <button
                            className='btn btn-block clear-btn'
                            type='clear'
                            onClick={(e) => {
                                e.preventDefault();
                                clearValues();
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};
export default AddJob;