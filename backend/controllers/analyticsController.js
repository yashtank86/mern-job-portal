const Job = require("../models/Job");
const Application = require("../models/Application");

const getTrend = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

exports.getEmployerAnalytics = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const companyId = req.user._id;

    const now = new Date();
    const last7Days = new Date(now);
    last7Days.setDate(now.getDate() - 7);
    const prev7Days = new Date(now);
    prev7Days.setDate(now.getDate() - 14);

    // === COUNTS ===
    const totalActiveJobs = await Job.countDocuments({
      company: companyId,
      isClosed: false,
    });
    const jobs = await Job.find({ company: companyId }).select("_id").lean();
    const jobIds = jobs.map((job) => job._id);

    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });
    const totalHired = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
    });

    // === TRENDS ===

    // active job posts trend
    const activeJobsLast7 = await Job.countDocuments({
      company: companyId,
      createdAt: { $gte: last7Days, $lte: now },
    });

    const activeJobsPrev7 = await Job.countDocuments({
      company: companyId,
      createdAt: { $gte: prev7Days, $lte: last7Days },
    });

    const activeJobTrend = getTrend(activeJobsLast7, activeJobsPrev7);

    // Application Trend
    const applicationsLast7 = await Application.countDocuments({
      job: { $in: jobIds },
      createdAt: { $gte: last7Days, $lte: now },
    });

    const applicationsPrev7 = await Application.countDocuments({
      job: { $in: jobIds },
      createdAt: { $gte: prev7Days, $lte: last7Days },
    });

    const applicantTrend = getTrend(applicationsLast7, applicationsPrev7);

    // hired applications trend
    const hiredLast7 = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
      createdAt: { $gte: last7Days, $lte: now },
    });

    const hiredPrev7 = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Accepted",
      createdAt: { $gte: prev7Days, $lte: last7Days },
    });

    const hiredTrend = getTrend(hiredLast7, hiredPrev7);

    // === DATA ===
    const recentJobs = await Job.find({ company: companyId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title location type createdAt isClosed");

    const recentApplications = await Application.find({
      job: { $in: jobIds },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("applicant", "name email avatar")
      .populate("job", "title");

    res.json({
      counts: {
        totalActiveJobs,
        totalApplications,
        totalHired,
      },
      trends: {
        activeJobs: activeJobTrend,
        totalApplicants: applicantTrend,
        totalHired: hiredTrend,
      },
      data: {
        recentJobs,
        recentApplications,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "", error: error.message });
  }
};
