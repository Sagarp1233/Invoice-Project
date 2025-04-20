
import { CardDescription, CardTitle } from "@/components/ui/card";
import RegistrationForm from "@/components/auth/RegistrationForm";
import RegistrationSuccess from "@/components/auth/RegistrationSuccess";
import { useRegistration } from "@/hooks/auth/useRegistration";

const Register = () => {
  const { loading, registered, handleRegister } = useRegistration();

  if (registered) {
    return <RegistrationSuccess />;
  }

  return (
    <>
      <CardTitle className="text-2xl text-center">Create an account</CardTitle>
      <CardDescription className="text-center">
        Enter your information to get started
      </CardDescription>
      
      <RegistrationForm onSubmit={handleRegister} loading={loading} />
    </>
  );
};

export default Register;
