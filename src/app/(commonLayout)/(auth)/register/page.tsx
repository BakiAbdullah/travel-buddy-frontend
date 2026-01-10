export const dynamic = "force-dynamic";
import RegisterForm from "@/components/modules/Auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 px-6">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/tracking.jpg')`,
        }}
      />

      {/* Dark Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Optional: Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-indigo-900/30"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md space-y-6">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
          <div className="space-y-2 text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600">
              Enter your information below to create your account
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
    </div>
  );
};

export default RegisterPage;
