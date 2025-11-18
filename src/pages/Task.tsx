import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

interface Question {
    id: string;
    name: string;
    type: string;
}

interface RevieweeProps { 
    id: string;
    name: string;
    department: string;
  email: string;
  titleId?: string;
}

interface interfaceDepartment {
    name: string;
}

const Task: React.FC = () => {

    const [revieweeDetails, setRevieweeDetails] = useState<RevieweeProps>({ id: '', name: '', department: '', email: '', titleId: '' });
    const [departments, setDepartments] = useState<interfaceDepartment[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const reviewee = location.state?.Reviewee
        
    useEffect(() => {
        if (!reviewee)
            navigate('/')

        const fetchRevieweeDetails = async () => {
            try {
                setLoading(true);
                // Fetch additional details if needed
                const result = await api.get(`/employee?id=${reviewee.id}`);
                setRevieweeDetails(result.data.data);
              await fetchDepartments(result.data.data.departmentId);
              await fetchHardCompetencies(result.data.data.departmentId, result.data.data.titleId);
              await fetchSoftCompetencies(result.data.data.departmentId, result.data.data.titleId);
            } catch (error) {
                console.error('Error fetching reviewee details:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchDepartments = async (departmentId: string) => {
            try {
                const result = await api.get<interfaceDepartment[]>(`/department?id=${departmentId}`);
                setDepartments(result.data.data);
                console.log('Department:', result.data.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };
      
        const fetchHardCompetencies = async (departmentId: string, titleId: string) => {
          try {
            const result = await api.get<Question[]>(`/hardcompetencies?titleId=${titleId}&departmentId=${departmentId}`);
            const additem = await result.data.data.map((item: Question) => ({ ...item, type: 'hardcompetencies' }));
            setQuestions(additem);
            console.log('Hard Competencies:', questions);
          } catch (error) {
              console.error('Error fetching Hard Competencies:', error);
          }
        };

      const fetchSoftCompetencies = async (departmentId: string, titleId: string) => {
          try {
            const result = await api.get<Question[]>(`/softcompetencies?titleId=${titleId}&departmentId=${departmentId}`);
            const additem = await result.data.data.map((item: Question) => ({ ...item, type: 'softcompetencies' }));
            setQuestions((prevQuestions) => [...prevQuestions, ...additem]);
            console.log('Soft Competencies:', questions);
          } catch (error) {
              console.error('Error fetching Soft Competencies:', error);
          }
      };

      fetchRevieweeDetails();

    }, [reviewee, navigate]);
  
  console.log('Reviewee Questions:', questions);
  
  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Submit answers:", answers);
      alert("Thank you! Answers submitted.");
    }
  };

  const handleAnswerChange = (score: number) => {
    setAnswers({ ...answers, [questions[currentStep].id]: score });
  };

  if (loading && questions.length === 0) return <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="text-white text-lg">Please wait...</p>
                      </div>;
  
  const progress = ((currentStep + 1) / questions.length) * 100;

    return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/3 max-w-sm bg-white flex flex-col justify-between p-6 border-r border-gray-200">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src="/logo.png"
              alt="Leverate Logo"
              className="h-16"
            />
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold">
              {revieweeDetails.name.charAt(0).toUpperCase()}
            </div>
            <div>
                <p className="font-medium text-gray-800">{revieweeDetails.name}</p>
                <p className="font-medium text-gray-800">As a Reviewee</p>
                            <p className="text-sm text-gray-500">{revieweeDetails.email}</p>
                {departments.map((dept) => (
                  <p key={dept.name} className="text-sm text-gray-500">{dept.name}</p>
                ))}
            </div>
          </div>
          </div>

        {/* Sign Out Button */}
        <button className="bg-black text-white w-full py-3 mt-6 rounded-md font-semibold hover:bg-gray-900 transition">
          <span className="mr-2">↩</span> Sign Out
        </button>

        <p className="text-xs text-gray-500 mt-6">
          Leverate Group Asia Performance Review
        </p>
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-gradient-to-br from-black via-purple-900 to-blue-900 text-white flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('/bg-particles.png')] bg-cover bg-center opacity-50"></div>

        <div className="relative z-10 w-full max-w-lg px-8">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-700 rounded-full mb-6">
            <div
              className="h-1 bg-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="bg-[#0a0f1a] bg-opacity-80 rounded-lg p-6 shadow-lg">
              <p className="text-cyan-400 text-sm font-semibold mb-1">{currentStep + 1} - {questions[currentStep].type === 'hardcompetencies' ? 'Hard Competencies' : 'Soft Competencies'}</p>
              <h2 className="text-xl font-bold mb-4">
                {questions[currentStep].name}
              </h2>
              
              {/* Rating 1–5 */}
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    onClick={() => handleAnswerChange(score)}
                    className={`w-12 h-12 rounded-lg font-semibold transition-all duration-200 
                      ${answers[questions[currentStep].id] === score
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      }`}
                  >
                    {score}
                  </button>
                ))}
              </div>

            {/* OK Button */}
            <div className="flex justify-end mt-6">
                <button
                  onClick={handleNext}
                  className="bg-gray-800 hover:bg-gray-700 px-5 py-2 rounded-md font-semibold flex items-center gap-2">
                Next <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Task;