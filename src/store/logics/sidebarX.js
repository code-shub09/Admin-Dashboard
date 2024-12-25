import { useNavigate } from 'react-router-dom';

// Custom hook to handle navigation
export function useNavigation() {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/home');
    };

    const navigateToDoctorPage = () => {
        navigate('/profile');
    };

    const navigateAddNewDoctor = () => {
        navigate(-1);
    };

    const navigateMessage = () => {
        navigate(1);
    };

   

    return {
        navigateToHome,
        navigateMessage,
        navigateAddNewDoctor,navigateToDoctorPage
    };
}
