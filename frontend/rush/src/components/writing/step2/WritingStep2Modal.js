import React from 'react';
import Modal from 'react-modal';
import CancelButton from "./CancleButton";

const WritingStep2Modal = (props) => {
  return (
      <Modal            //모달 태그 내부에 옵션을 넣고 태그 사이에 내용을 넣는다
          isOpen={props.step === 2}        //모달의 오픈유무를 bool값으로 정한다.
          shouldCloseOnOverlayClick={false}     //close버튼을 눌러야만 모달이 종료
          //onRequestClose={closeModal}    // 모달이 닫히는 요청을 받으면 무엇을 할껀지
          style={{
            overlay: {
              backgroundColor: '#00112255'
            },
            content: {
              color: 'lightsteelblue',
              maxWidth: '500px',
              margin: 'auto',
            }
          }}
          contentLabel="Example Modal"       //모달의 라벨
      >
        <h2>Hello</h2>
        <CancelButton/>
        <div>I am a modal</div>

      </Modal>
  );
};

export default WritingStep2Modal;