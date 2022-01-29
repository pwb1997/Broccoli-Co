import { useState } from 'react';
import { createPortal } from 'react-dom';
import RequestStage from './RequestStage';
import SuccessStage from './SuccessStage';

interface RequestInviteModalProps {
    isVisible: boolean;
    hide: () => void;
}

export enum Stage {
    'request',
    'success',
}

const RequestInviteModal = ({ isVisible, hide }: RequestInviteModalProps) => {
    const [stage, setStage] = useState(Stage.request);

    const onOk = () => {
        setStage(Stage.request);
        hide();
    };

    return isVisible
        ? createPortal(
              <div className="fixed top-0 flex items-center justify-center w-screen h-screen bg-black/50 backdrop-blur-sm">
                  <div className="w-5/6 max-w-md p-8 bg-white border border-black h-[28rem]">
                      <RequestStage
                          isVisible={stage === Stage.request}
                          onSuccess={() => setStage(Stage.success)}
                      />
                      <SuccessStage isVisible={stage === Stage.success} onOk={() => onOk()} />
                  </div>
              </div>,
              document.body,
          )
        : null;
};

export default RequestInviteModal;
