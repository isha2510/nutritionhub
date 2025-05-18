import { FaEdit } from 'react-icons/fa';

interface EditButtonProps {
  handleEdit?: () => void;
}

const EditButton = ({ handleEdit }: EditButtonProps) => {
  return (
    <button type="button" onClick={handleEdit} title="Edit Recipe">
      <FaEdit size={24} className="text-current" />
    </button>
  );
};

export default EditButton;
