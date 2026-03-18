import { useState } from "react";
import { FaPlus } from "react-icons/fa";

interface CreatePermission{
    name:string;
    description?:string;
}

// interface UpdatePermission{
//     name?:string;
//     description?:string;
// }

interface CreatePermissionModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onSubmit:(data:CreatePermission)=>void;
}

function CreatePermission({isOpen,onClose,onSubmit}:CreatePermissionModalProps) {
    const [formData, setFormData] = useState<CreatePermission>({
        name: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', description: '' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-semibold mb-4 dark:text-black">Create Permission</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Permission Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="changePassword:create"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="A brief description of the permission"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border dark:text-black dark:border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 flex gap-1 items-center justify-center w-1/2 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border w-1/2 bg-[#1A3263] text-white rounded-lg hover:bg-[#1A3263]/90 flex gap-1 items-center justify-center"
                        >
                          <FaPlus />  Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default CreatePermission