import { useState } from "react";
import { createContainer } from "unstated-next";

interface ModalState {
    /** Name of the current modal */
    currentModal: string | null;
    /**
     * Should the modal show an overlay?
     *
     * You should set z-index for the modal higher than where you define the overlay to be shown.
     */
    modalHasOverlay?: boolean;
}

type ModalContainer = ModalState & {
    /**
     * Show a modal window
     *
     * Limitation: Allows only 1 modal at a time
     */
    showModal: (modalName: string, modalHasOverlay: boolean) => void;
    /** Close a modal window */
    closeModal: () => void;
    /** Toggle between show and close modal states */
    toggleModal: (modalName: string, modalHasOverlay: boolean) => void;
};

function useModal(initialState: ModalState = { currentModal: null, modalHasOverlay: false }): ModalContainer {
    const [modal, setModal] = useState(initialState);

    const showModal = (modalName: string, modalHasOverlay: boolean) => {
        setModal({ currentModal: modalName, modalHasOverlay });
    };
    const closeModal = () => setModal({ currentModal: null, modalHasOverlay: false });
    const toggleModal = (modalName: string, modalHasOverlay: boolean) => {
        modal.currentModal === modalName ? closeModal() : showModal(modalName, modalHasOverlay);
    };

    return { ...modal, showModal, closeModal, toggleModal };
}

export const ModalContext = createContainer(useModal);
ModalContext.Provider.displayName = "ModalContextProvider";
