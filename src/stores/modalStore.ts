import { create } from "zustand";

interface IModalStore {
	open: boolean;
	name: string;
	setIsOpen: (isOpen: boolean) => void;
	setModalName: (name: string) => void;
}

const useModalOpen = create<IModalStore>()((set) => ({
	name: "",
	open: false, // Initialize 'open' with a default boolean value
	setIsOpen: (isOpen: boolean) => set(() => ({ open: isOpen })),
	setModalName: (name: string) => set(() => ({ name })),
}));

export const useGetModal = () => useModalOpen((state) => state.open);
export const useGetModalName = () => useModalOpen((state) => state.name);

export const useOpenModal = () => useModalOpen((state) => state.setIsOpen);
export const useSetModalName = () =>
	useModalOpen((state) => state.setModalName);
