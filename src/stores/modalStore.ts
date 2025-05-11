import { create } from "zustand";

interface IModalStore {
	open: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const useModalOpen = create<IModalStore>()((set) => ({
	open: false, // Initialize 'open' with a default boolean value
	setIsOpen: (isOpen: boolean) => set(() => ({ open: isOpen })),
}));

export const useGetModal = () => useModalOpen((state) => state.open);

export const useOpenModal = () => useModalOpen((state) => state.setIsOpen);
