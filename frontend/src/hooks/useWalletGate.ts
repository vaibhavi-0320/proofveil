import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useWalletGate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const wallet = localStorage.getItem("proofveil_wallet");
    if (!wallet) {
      navigate("/");
    }
  }, [navigate]);
};
