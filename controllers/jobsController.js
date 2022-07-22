
const createJob = async (req, res) => {
    res.send("create job");
};
const getAllJobs = async (req, res) => {
    res.send("get all jobs");
};
const deleteJob = async (req, res) => {
    res.send("job deleted");
};
const updateJob = async (req, res) => {
    res.send("Job updated");
};
const showStats = async (req, res) => {
    res.send("the stats");
};

export {createJob, deleteJob, getAllJobs, updateJob, showStats};