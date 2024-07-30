import { Trash2 } from "lucide-react";
import Modal from "@/Base-components/Modal";

interface DeleteModalProps {
  showDeleteModal: boolean;
  handleDeleteCancel: () => void;
  handleDeleteConfirm: () => void;
  deleting: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({showDeleteModal, handleDeleteCancel, handleDeleteConfirm, deleting}) => {
  return (
    <Modal show={showDeleteModal} onClose={handleDeleteCancel} maxWidth="md">
      <div className="p-6">
        <Trash2 className="w-16 h-16 mx-auto text-red-500" />
        <h2 className="mt-6 text-xl font-bold">Are you sure?</h2>
        <p className="mt-2 text-gray-600">
          Do you really want to delete these records? <br />
          This process cannot be undone.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
            onClick={handleDeleteCancel}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
              deleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleDeleteConfirm}
            disabled={deleting}
          >
            {deleting ? "Suppression en cours..." : "Supprimer"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
