import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      loadUser();
    }, []);

    async function loadUser() {
        try {
            const storedUser = await AsyncStorage.getItem("@user");

            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
  

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}