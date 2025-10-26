import {
  MapPin,
  IndianRupee,
  ArrowLeft,
  Building2,
  Clock,
  Users,
} from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import { useAuth } from "../../context/AuthContext";
import { formatINR } from "../../utils/helper";

const JobPostingPreview = ({ formData, setIsPreview }) => {
  const { user } = useAuth();
  const currencies = [{ value: "INR", label: "\u20B9" }];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with glassmorphism effect */}
        <div className="mb-8 backdrop-blur-sm bg-white/80 border border-white/20 shadow-xl rounded-2xl px-6 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Job Preview
              </h2>
            </div>
            <button
              onClick={() => setIsPreview(false)}
              className="group flex items-center space-x-2 px-6 py-3 text-xs md:text-sm font-medium text-gray-600 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 border border-gray-200 hover:border-transparent rounded-xl transition-all duration-300 shadow-lg shadow-gray-100 hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="">Back to edit</span>
            </button>
          </div>
          {/* Main Content Card */}
          <div className="">
            {/* Hero section with clean background */}
            <div className="relative bg-white px-0 pb-8 mt-8 border-b border-gray-100">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-0">
                  <div className="flex-1">
                    <h1 className="text-lg lg:text-xl font-semibold mb-2 leading-tight text-gray-900">
                      {formData.jobTitle}
                    </h1>

                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {formData.isRemote ? "Remote" : formData.location}
                        </span>
                        {formData.isRemote && formData.location && (
                          <span className="text-sm text-gray-500">
                            {" "}
                            &#x2022; {formData.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {user?.companyLogo ? (
                    <img
                      src={user.companyLogo}
                      alt="company logo"
                      className="h-16 md:h-20 w-16 md:w-20 object-cover rounded-2xl border-4 border-white/20 shadow-lg"
                    />
                  ) : (
                    <div className="h-20 w-20 bg-gray-50 border-2 border-gray-200 rounded-2xl flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-6 md:mt-0">
                  <span className="px-4 py-2 bg-blue-50 text-sm text-blue-700 font-semibold rounded-full border border-blue-200">
                    {
                      CATEGORIES.find((c) => c.value === formData.category)
                        ?.label
                    }
                  </span>
                  <span className="px-4 py-2 bg-purple-50 text-sm text-purple-700 font-semibold rounded-full border border-purple-200">
                    {JOB_TYPES.find((j) => j.value === formData.jobType)?.label}
                  </span>
                  <div className="flex items-center space-x-1 px-4 py-2 bg-gray-50 text-sm text-gray-700 font-semibold rounded-full border border-gray-200">
                    <Clock className="h-4 w-4" />
                    <span>Posted Today</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Content Section */}
            <div className="px-0 pb-8 space-y-8">
              {/* Salary Section */}
              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-6 rounded-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                        <IndianRupee className="h-4 md:h-6 w-4 md:w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          Compensation
                        </h3>
                        <div className="text-sm md:text-lg font-bold text-gray-900">
                          {
                            currencies.find(
                              (c) => c.value === formData.currency
                            )?.label
                          }
                          {/* {formData.salaryMin.toLocaleString("en-IN")} -{" "} */}
                          {formatINR(formData.salaryMin)} -{" "}
                          {
                            currencies.find(
                              (c) => c.value === formData.currency
                            )?.label
                          }
                          {formatINR(formData.salaryMax)}
                          {/* {formData.salaryMax.toLocaleString("en-IN")} */}
                          <span className="text-sm md:text-lg text-gray-600 font-normal ml-1">
                            {" "}
                            per year
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-2 text-sm text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      <Users className="h-4 w-4" />
                      <span className="">Competitive</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Job Description */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full "></div>
                  <span className="text-base md:text-lg">About This Role</span>
                </h3>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {formData.description}
                  </div>
                </div>
              </div>
              {/* Requirements */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full "></div>
                  <span className="text-base md:text-lg">
                    What We're Looking For
                  </span>
                </h3>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {formData.requirements}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPreview;
