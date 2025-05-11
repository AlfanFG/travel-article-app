import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import Loading from "../ui/loading";

const CLOUD_NAME = import.meta.env.VITE_APP_CLOUD_NAME; // Your Cloudinary cloud name
const UPLOAD_PRESET = import.meta.env.VITE_APP_CLOUD_PRESET; // Create this in Cloudinary settings

interface IImageUpload {
	onChange?: (url: string) => void;
	value?: string;
}

export default function ImageUpload({ onChange, value }: IImageUpload) {
	const [loading, setIsloading] = useState(false);
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		setIsloading(true);
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", UPLOAD_PRESET);

		try {
			const response = await axios.post(
				`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
				formData
			);
			onChange?.(response.data.secure_url || "");
			setIsloading(false);
		} catch (error) {
			setIsloading(false);
			console.error("Upload failed:", error);
		} finally {
			setIsloading(false);
		}
	};

	return (
		<>
			<div className="flex relative justify-between items-center flex-wrap">
				<input
					type="file"
					onChange={handleFileChange}
					className="file-input file-input-bordered file-input-sm bg-gray-200 text-gray-500 cursor-default"
				/>

				<Button
					type="button"
					className="absolute right-0 bg-secondary h-8 rounded-l-none hover:bg-secondary/90"
					onClick={handleUpload}
					disabled={loading}
				>
					{loading ? <Loading className="loading-md" /> : <span>Upload</span>}
				</Button>
			</div>
			{value && (
				<div className="self-center">
					<img src={value} alt="Uploaded" className="rounded-md" width="300" />
				</div>
			)}
		</>
	);
}
