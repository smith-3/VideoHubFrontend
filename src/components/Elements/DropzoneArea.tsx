import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

interface DropzoneAreaProps {
    onDrop: (file: File[]) => void;
}

const DropzoneArea: React.FC<DropzoneAreaProps> = ({ onDrop }) => {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'video/*': [] },
        onDrop: (acceptedFiles: File[]) => {
            onDrop(acceptedFiles);
        }
    })

    return (
        <div
            {...getRootProps()}
            className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer mb-6 transition-all duration-300 ease-in-out ${
                isDragActive 
                ? 'border-white bg-white/10 text-white' // Cuando se arrastra un archivo, todo se vuelve blanco
                : 'border-gray-300 hover:border-white hover:bg-white/5 hover:text-white' // En hover, cambia a blanco
            }`}
        >
            <input {...getInputProps()} />
            <div className="space-y-2">
                <Upload className={`mx-auto ${isDragActive ? 'text-gray-300' : 'text-white'}`} size={48} />
            </div>
        </div>
    )
}

export default DropzoneArea
