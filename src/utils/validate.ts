export function validate(formData: { email: string; lozinka: string }) {
    const errors: { email?: string; lozinka?: string } = {};
  
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email nije validan.";
    }
  
    if (formData.lozinka.length < 6) {
      errors.lozinka = "Lozinka mora imati bar 6 karaktera.";
    }
  
    return errors;
  }