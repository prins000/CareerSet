import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
      <div className=" hidden md:block">

    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className=" flex items-center gap-2 text-[#6A38C2] hover:bg-[#6A38C2]/10"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </Button>
      </div>
  );
};

export default BackButton;
