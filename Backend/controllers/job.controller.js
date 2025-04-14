import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, skills, duration, jobMode, location, noOfOpening, jobType, startDate, responsibilities, requirements, salary, ppOffer, stipendType, perks, availability, questions, alternateMobileNo, companyId } = req.body;
        const userId = req.id;
        console.log("Job data received:");
        console.log({
            title,
            description,
            skills,
            duration,
            location,
            jobMode,
            noOfOpening,
            jobType,
            startDate,
            responsibilities,
            requirements,
            salary,
            ppOffer,
            stipendType,
            perks,
            availability,
            questions,
            alternateMobileNo,
            created_by: req.user._id,
            company: req.user.company._id,
        });

        if (!title || !description || !skills || !location || !duration || !jobMode || !noOfOpening || !jobType || !startDate || !responsibilities || !requirements || !salary || !ppOffer || !stipendType || !perks || !availability) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            skills: Array.isArray(skills) ? skills : skills.split(","),
            duration: Number(duration),
            jobMode,
            noOfOpening,
            jobType,
            startDate,
            location,
            responsibilities,
            requirements,
            salary,
            ppOffer,
            stipendType,
            perks: Array.isArray(perks) ? perks : perks.split(","),
            availability,
            questions,
            alternateMobileNo,
            company: req.user.company._id,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        }).populate({
            path: "company",
            select: "name" // Fetch only the company name
        });
        // const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
// export const updateJobById = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         console.log("Updating job with ID:", jobId);

//         const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });

//         if (!updatedJob) {
//             return res.status(404).json({ message: "Job not found.", success: false });
//         }

//         return res.status(200).json({ message: "Job updated successfully.", success: true, updatedJob });
//     } catch (error) {
//         console.error("Error updating job:", error);
//         return res.status(500).json({ message: "Server error", success: false });
//     }
// };
export const updateJobById = async (req, res) => {
    try {
        const { title,
            description,
            skills,
            duration,
            jobMode,
            noOfOpening,
            jobType,
            startDate,
            location,
            responsibilities,
            requirements,
            salary,
            ppOffer,
            stipendType,
            perks,
            availability,
            questions,
            alternateMobileNo } = req.body;
        const jobId = req.id;
        let job = await Job.findById(jobId);
        // console.log("Updating job with ID:", jobId);

        // Optional: Validate ObjectId format
        if (!jobId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid job ID format.", success: false });
        }

        // Optional: You might want to validate req.body here for required fields
        // Example: check if required fields like title, company, etc. are present
        // You can use Joi, express-validator, or manual checks

        // const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
        //     new: true,
        //     runValidators: true, // ensures schema validation on update
        // });
        if (!job) {
            return res.status(400).json({ message: "Job not found.", success: false });
        }

        console.log("User ID from middleware:", req.id);
        if (title !== undefined) job.title = title;
        if (description !== undefined) job.description = description;
        if (skills !== undefined) job.skills = skills;
        if (duration !== undefined) job.duration = duration;
        if (jobMode !== undefined) job.jobMode = jobMode;
        if (noOfOpening !== undefined) job.noOfOpening = noOfOpening;
        if (jobType !== undefined) job.jobType = jobType;
        if (startDate !== undefined) job.startDate = startDate;
        if (location !== undefined) job.location = location;
        if (responsibilities !== undefined) job.responsibilities = responsibilities;
        if (requirements !== undefined) job.requirements = requirements;
        if (salary !== undefined) job.salary = salary;
        if (ppOffer !== undefined) job.ppOffer = ppOffer;
        if (stipendType !== undefined) job.stipendType = stipendType;
        if (perks !== undefined) job.perks = perks;
        if (availability !== undefined) job.availability = availability;
        if (questions !== undefined) job.questions = questions;
        if (alternateMobileNo !== undefined) job.alternateMobileNo = alternateMobileNo;
        const savedJob = await job.save();

        job = {
            _id: job._id,
            title: savedJob.title,
            description: savedJob.description,
            skills: savedJob.skills,
            duration: savedJob.duration,
            jobMode: savedJob.jobMode,
            noOfOpening: savedJob.noOfOpening,
            jobType: savedJob.jobType,
            startDate: savedJob.startDate,
            location: savedJob.location,
            responsibilities: savedJob.responsibilities,
            requirements: savedJob.requirements,
            salary: savedJob.salary,
            ppOffer: savedJob.ppOffer,
            stipendType: savedJob.stipendType,
            perks: savedJob.perks,
            availability: savedJob.availability,
            questions: savedJob.questions,
            alternateMobileNo: savedJob.alternateMobileNo,
        };

        return res.status(200).json({ message: "Job updated successfully.", success: true, job });
    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

