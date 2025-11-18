import React, { useState, useEffect } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import Button from '../components/ui/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

interface Question {
  id: string;
  question: string;
}

interface RevieweeProps { 
  id: string;
}

interface interfaceDepartment {
    name: string;
}

interface interfaceEmployee {
    id: string;
    name: string;
    nik: string;
    email: string;
}

const Review: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [departments, setDepartments] = useState<interfaceDepartment[]>([]);
  const [employees, setEmployees] = useState<interfaceEmployee[]>([]);
  const [selected, setSelected] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.User;

  const handleNext = () => {
    if (selected === "") {
      alert("Please select a reviewee before proceeding.");
      return;
    }

    const selectedReviewee: RevieweeProps = { id: selected };

    navigate('/task',{ state: { Reviewee: selectedReviewee } }); // Placeholder navigation
    // if (currentStep < questions.length - 1) {
    //   setCurrentStep(currentStep + 1);
    // } else {
    //   console.log("Submit answers:", answers);
    // }
  };

  const handleAnswerChange = (score: number) => {
    setAnswers({ ...answers, [questions[currentStep].id]: score });
  };
  

  useEffect(() => {
      if (!user)
        navigate('/');

      const fetchDepartments = async () => {
        try {
          setLoading(true);
          const response = await api.get<interfaceDepartment[]>(`/department?id=${user.data.departement}`);
          setDepartments(response.data.data);
          console.log('Department:', response.data.data);
        } catch (error) {
          console.error('Error fetching departments:', error);
        }finally {
          setLoading(false);
        }
      };
      
      const fetchEmployeeByDeptId = async () => {
        try {
          setLoading(true);
          const response = await api.get<interfaceEmployee[]>(`/employee-by-dept?departmentId=${user.data.departement}`);
          setEmployees(response.data.data);
          console.log('Employees:', response.data.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }finally {
          setLoading(false);
        }
      };
      
    fetchDepartments();
    fetchEmployeeByDeptId();
    

    }, [user, navigate]);

  const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
  };
  
  if (loading) return <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
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
              {user.data.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-800">{user.data.name}</p>
                <p className="text-sm text-gray-500">{user.data.email}</p>
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
            <p className="text-cyan-400 text-sm font-semibold mb-1">REVIEWEE SELECTION</p>
            <h2 className="text-xl font-bold mb-4">
              <span className="text-cyan-400">1 → </span> Select Reviewee
            </h2>

            {/* Select Box */}
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
                <option className='text-gray-800' value="">Select an option...</option>
                {employees
                  .filter((emp) => emp.id !== user.data.id)
                  .map((emp) => (
                  <option className='text-gray-800' key={emp.id} value={emp.id}>{emp.nik} - {emp.name}</option>
                ))}
            </select>

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

export default Review;