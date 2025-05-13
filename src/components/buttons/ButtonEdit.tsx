import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";

interface IButtonEdit {
  onClick: () => void;
}

export default function ButtonEdit({ onClick }: IButtonEdit) {
  return (
    <Button
      title="Edit"
      onClick={onClick}
      className="bg-yellow-400 hover:bg-yellow-300"
    >
      <FaEdit />
    </Button>
  );
}
