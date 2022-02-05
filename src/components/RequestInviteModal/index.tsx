import RequestStage from './RequestStage';
import SuccessStage from './SuccessStage';
import { createPortal } from 'react-dom';
import { useState } from 'react';

interface RequestInviteModalProps {
    isVisible: boolean;
    hide: () => void;
}

export enum Stage {
    request,
    success,
}

const RequestInviteModal = ({ isVisible, hide }: RequestInviteModalProps) => {
    const [stage, setStage] = useState(Stage.request);

    const onSuccess = () => setStage(Stage.success);

    const onOk = () => {
        setStage(Stage.request);
        hide();
    };

    return isVisible
        ? createPortal(
              <div
                  role="dialog"
                  className="fixed top-0 flex items-center justify-center w-screen h-screen transition-all bg-black/50 backdrop-blur-sm"
              >
                  <div className="w-5/6 max-w-md p-8 bg-white border border-black">
                      {stage === Stage.request ? <RequestStage {...{ onSuccess }} /> : null}
                      {stage === Stage.success ? <SuccessStage {...{ onOk }} /> : null}
                  </div>
              </div>,
              document.body,
          )
        : null;
};

export default RequestInviteModal;
