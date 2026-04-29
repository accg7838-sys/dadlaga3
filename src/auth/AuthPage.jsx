import { useEffect, useRef, useState } from "react";
import "./AuthPage.css";
import logo from "../assets/att.2Z41rSRwPlN2RVmHedanlvfzJd5oqsiftLNgRYVcRn8 2.png";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const loginFields = [
  { name: "email", label: "И-мэйл", type: "email", placeholder: "name@company.mn" },
  { name: "password", label: "Нууц үг", type: "password", placeholder: "••••••••" },
];

const signupFields = [
  { name: "company", label: "Байгууллагын нэр", type: "text", placeholder: "iBex LLC" },
  { name: "email", label: "И-мэйл", type: "email", placeholder: "name@company.mn" },
  { name: "password", label: "Нууц үг", type: "password", placeholder: "Хамгийн багадаа 8 тэмдэгт" },
  { name: "confirmPassword", label: "Нууц үг давтах", type: "password", placeholder: "Нууц үгээ дахин оруулна уу" },
];

const autoCompleteMap = {
  company: "organization",
  email: "email",
  password: "current-password",
  confirmPassword: "new-password",
  newPassword: "new-password",
};

const createInitialValues = () => ({
  company: "",
  email: "",
  password: "",
  confirmPassword: "",
  remember: false,
  agree: false,
});

export default function AuthPage({ onBackHome }) {
  const [mode, setMode] = useState("login");
  const [formValues, setFormValues] = useState(createInitialValues);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const redirectTimeoutRef = useRef(null);
  const fields = mode === "login" ? loginFields : signupFields;

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const handleModeChange = (nextMode) => {
    if (nextMode === mode) {
      return;
    }

    setMode(nextMode);
    setFormValues((previous) => ({
      ...createInitialValues(),
      email: previous.email,
      company: previous.company,
    }));
    setErrors({});
    setSuccessMessage("");
    setIsSubmitting(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    const nextValue = type === "checkbox" ? checked : value;

    setFormValues((previous) => ({
      ...previous,
      [name]: nextValue,
    }));

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const emailValue = formValues.email.trim();

    if (!emailPattern.test(emailValue)) {
      nextErrors.email = "Зөв и-мэйл хаяг оруулна уу.";
    }

    if (!formValues.password || formValues.password.length < 8) {
      nextErrors.password = "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой.";
    }

    if (mode === "signup") {
      if (!formValues.company.trim() || formValues.company.trim().length < 2) {
        nextErrors.company = "Байгууллагын нэрийг оруулна уу.";
      }

      if (formValues.confirmPassword !== formValues.password) {
        nextErrors.confirmPassword = "Нууц үг хоорондоо таарахгүй байна.";
      }

      if (!formValues.agree) {
        nextErrors.agree = "Нөхцөлийг зөвшөөрнө үү.";
      }
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    setErrors({});
    setSuccessMessage(
      mode === "login"
        ? "Амжилттай нэвтэрлээ. Нүүр хуудас руу шилжиж байна..."
        : "Бүртгэл амжилттай. Нүүр хуудас руу шилжиж байна..."
    );
    setIsSubmitting(true);

    if (redirectTimeoutRef.current) {
      window.clearTimeout(redirectTimeoutRef.current);
    }

    redirectTimeoutRef.current = window.setTimeout(() => {
      onBackHome();
    }, 900);
  };

  return (
    <main className="auth-page">
      <div className="auth-page__shell">
        <button type="button" className="auth-page__back" onClick={onBackHome}>
          Нүүр хуудас руу буцах
        </button>

        <section className="auth-card">
          <div className="auth-brand">
            <img src={logo} alt="IBEX" />
            <div>
              <p className="auth-brand__eyebrow">iBex Platform</p>
              <h1>{mode === "login" ? "Системд нэвтрэх" : "Шинэ эрх үүсгэх"}</h1>
            </div>
          </div>

          <div className="auth-tabs" role="tablist" aria-label="Auth modes">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => handleModeChange("login")}
              role="tab"
              aria-selected={mode === "login"}
            >
              Login
            </button>
            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => handleModeChange("signup")}
              role="tab"
              aria-selected={mode === "signup"}
            >
              Sign up
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {fields.map((field) => (
              <label key={field.name} className="auth-field">
                <span>{field.label}</span>
                <div
                  className={`auth-input-wrap ${
                    field.name === "password" || field.name === "confirmPassword"
                      ? "has-toggle"
                      : ""
                  }`}
                >
                  <input
                    name={field.name}
                    type={
                      field.name === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : field.name === "confirmPassword"
                          ? showConfirmPassword
                            ? "text"
                            : "password"
                          : field.type
                    }
                    placeholder={field.placeholder}
                    value={formValues[field.name]}
                    onChange={handleChange}
                    autoComplete={
                      mode === "signup" && field.name === "password"
                        ? autoCompleteMap.newPassword
                        : autoCompleteMap[field.name]
                    }
                    aria-invalid={errors[field.name] ? "true" : "false"}
                    required
                  />

                  {field.name === "password" && (
                    <button
                      type="button"
                      className="auth-password-toggle"
                      onClick={() => setShowPassword((previous) => !previous)}
                    >
                      {showPassword ? "Нуух" : "Харах"}
                    </button>
                  )}

                  {field.name === "confirmPassword" && (
                    <button
                      type="button"
                      className="auth-password-toggle"
                      onClick={() => setShowConfirmPassword((previous) => !previous)}
                    >
                      {showConfirmPassword ? "Нуух" : "Харах"}
                    </button>
                  )}
                </div>

                {errors[field.name] && <small className="auth-error">{errors[field.name]}</small>}
              </label>
            ))}

            {mode === "login" ? (
              <div className="auth-row">
                <label className="auth-checkbox">
                  <input
                    name="remember"
                    type="checkbox"
                    checked={formValues.remember}
                    onChange={handleChange}
                  />
                  <span>Намайг сана</span>
                </label>
                <button type="button" className="auth-link">
                  Нууц үгээ мартсан?
                </button>
              </div>
            ) : (
              <label className="auth-checkbox auth-checkbox--wide">
                <input
                  name="agree"
                  type="checkbox"
                  checked={formValues.agree}
                  onChange={handleChange}
                />
                <span>Үйлчилгээний нөхцөл болон нууцлалын бодлогыг зөвшөөрч байна.</span>
              </label>
            )}

            {errors.agree && <small className="auth-error auth-error--block">{errors.agree}</small>}
            {successMessage && <p className="auth-success">{successMessage}</p>}

            <button type="submit" className="auth-submit" disabled={isSubmitting}>
              {isSubmitting ? "Түр хүлээнэ үү..." : mode === "login" ? "НЭВТРЭХ" : "БҮРТГҮҮЛЭХ"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
