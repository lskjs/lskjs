import React, { Component } from 'react';
import { css } from '@emotion/core';
import Modal from './Modal2';
import Story from '../Story';
import Button from '../Button';

const {
  Title, Subtitle, Description, Image, Help, Content, Footer,
} = Modal;

const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const style = css`
  background: red;
`;

export default ({ storiesOf, action }) => {
  return storiesOf('Modal2', module)
    .add('1. Easy use', () => (
      <Story>
        <Modal
          size="small"
          trigger="trigger"
          title="title"
          subtitle="subtitle"
          image="https://picsum.photos/1280/720/?random"
          content="content"
          footer="footer"
          onClose={() => console.log('onClose')}
          onOpen={() => console.log('onOpen')}
        />
      </Story>
    ))
    .add('2. defaultVisible', () => (
      <Story>
        <Modal
          size="small"
          trigger="trigger"
          title="title"
          subtitle="subtitle"
          image="https://picsum.photos/1280/720/?random"
          content="content"
          footer="footer"
          defaultVisible
        />
      </Story>
    ))
    .add('3. Children', () => (
      <Story>
        <Modal
          size="small"
          defaultVisible
        >
          <Title>title</Title>
          <Subtitle>Subtitle</Subtitle>
          <Description>Description</Description>
          <Help>Help</Help>
          <Image src="https://picsum.photos/1280/720/?random" />
          <Content>
            content
          </Content>
          <Footer>
            <Button
              paint="primary"
            >
              OK
            </Button>
          </Footer>
        </Modal>
      </Story>
    ))
    .add('4. Children as function', () => (
      <Story>
        <Modal
          size="small"
          defaultVisible
        >
          {({ modal }) => (
            <React.Fragment>
              <Title>title</Title>
              <Subtitle>Subtitle</Subtitle>
              <Description>Description</Description>
              <Help>Help</Help>
              <Image src="https://picsum.photos/1280/720/?random" />
              <Content>
                content
              </Content>
              <Footer>
                <Button
                  paint="primary"
                  onClick={() => modal.close()}
                >
                  OK
                </Button>
              </Footer>
            </React.Fragment>
         )}
        </Modal>
      </Story>
    ))
    .add('5. Children with random div wrappers', () => (
      <Story>
        <Modal
          size="small"
          defaultVisible
        >
          <Title>title</Title>
          <Subtitle>Subtitle</Subtitle>
          <div>
            <Description>Description</Description>
            <Help>Help</Help>
            <Image src="https://picsum.photos/1280/720/?random" />
            <Content>
              content
            </Content>
          </div>
          <Footer>
            <Button
              paint="primary"
            >
              OK
            </Button>
          </Footer>
        </Modal>
      </Story>
    ))
    .add('6. Large content', () => (
      <Story>
        <Modal
          size="small"
          trigger="trigger"
          title="title"
          subtitle="subtitle"
          image="https://picsum.photos/1280/720/?random"
          content={(
            <div>
              {['Title', 'Title2', 'Title3'].map(title => (
                <React.Fragment key={title}>
                  <h3>{title}</h3>
                  <p>{lorem}</p>
                </React.Fragment>
            ))}
            </div>
          )}
          footer="footer"
          defaultVisible
        />
      </Story>
    ))
    .add('7. Modal with props', () => (
      <Story>
        <Modal
          // title="asd"
          size="large"
          // children={<Button>asd</Button>}
          // subHeader={<Button>asd</Button>}
          // closeComponent={() => console.log('closeComponent')}
          trigger={<div>asd</div>}
          // color="#ff0000"
          className={style}
          closable={false}
          // closeOnBackdrop={false}
          // body="asd"
          // disabled
          // small
          // onEdit={() => console.log('onEdit')}
          onClose={() => console.log('onClose')}
          onOpen={() => console.log('onOpen')}
        >
          <Title>title</Title>
          <Subtitle>Subtitle</Subtitle>
          <div>
            <Description>Description</Description>
            <Help>Help</Help>
            <Image src="https://picsum.photos/1280/720/?random" />
            <Content>
              content
            </Content>

          </div>
          <Footer>
            <Button
              paint="primary"
            >
              OK
            </Button>
          </Footer>
        </Modal>
      </Story>
    ));
  // .add('2. With title and wrap', () => (
  //   <Story>
  //     <Modal>
  //       <Trigger>
  //         <button>Open modal</button>
  //       </Trigger>
  //       <Content title="Sample title">
  //       Sample content
  //       </Content>
  //     </Modal>
  //   </Story>
  // ))
  // .add('3. Trigger close', () => (
  //   <Story>
  //     <Modal>
  //       <Trigger>
  //         <button>Trigger modal</button>
  //       </Trigger>
  //       <Content body>
  //       Sample content, and &nbsp;
  //         <Trigger type="close">
  //           <a>close</a>
  //         </Trigger>
  //       </Content>
  //     </Modal>
  //   </Story>
  // ))
  // .add('4. Full control', () => (
  //   <Story>
  //     <Modal>
  //       <Trigger>
  //         <button>Open modal</button>
  //       </Trigger>
  //       <Content>
  //         <Header closeButton>
  //         Hello!
  //         </Header>
  //         <Body>
  //         Some info content
  //         </Body>
  //         <Footer>
  //           <Close>
  //             <button>CLOSE ME</button>
  //           </Close>
  //         </Footer>
  //       </Content>
  //     </Modal>
  //   </Story>
  // ))
  // .add('5. Nested', () => (
  //   <Story>
  //     <Modal>
  //       <Trigger>
  //         <button>Open modal</button>
  //       </Trigger>
  //       <Content>
  //         <Header closeButton>
  //         Hello!
  //         </Header>
  //         <Body>
  //         Some info content
  //           <Modal>
  //             <Trigger>
  //               <button>Open new modal</button>
  //             </Trigger>
  //             <Content>
  //               <Header closeButton>
  //               Hello!
  //               </Header>
  //               <Body>
  //               Some info content
  //               </Body>
  //               <Footer>
  //                 <Close>
  //                   <button>CLOSE ME</button>
  //                 </Close>
  //               </Footer>
  //             </Content>
  //           </Modal>
  //         </Body>
  //         <Footer>
  //           <Close>
  //             <button>CLOSE ME</button>
  //           </Close>
  //         </Footer>
  //       </Content>
  //     </Modal>
  //   </Story>
  // ))

  // .add('6. External open and close', () => {
  //   class ComponentWithModal extends Component {
  //     render() {
  //       return (
  //         <div>
  //           <button onClick={() => this.modal.open()}>Open</button>
  //           <button onClick={() => this.modal.close()}>Close</button>
  //           <Modal ref={modal => this.modal = modal}>
  //             <Content>
  //               <Header closeButton>
  //                 Hello!
  //               </Header>
  //               <Body>
  //                 Some info content
  //               </Body>
  //               <Footer>
  //                 <Close>
  //                   <button>CLOSE ME</button>
  //                 </Close>
  //               </Footer>
  //             </Content>
  //           </Modal>
  //         </div>
  //       );
  //     }
  //   }
  //   return (
  //     <Story>
  //       <ComponentWithModal />
  //     </Story>
  //   );
  // })
  // .add('7. Visible by default', () => (
  //   <Story>
  //     <Modal visible>
  //       <Trigger>
  //         <button>Open modal</button>
  //       </Trigger>
  //       <Content>
  //         Sample content
  //       </Content>
  //     </Modal>
  //   </Story>
  // ))
  // .add('8. e.preventDefault', () => (
  //   <Story>
  //     <Modal>
  //       <Trigger>
  //         some trigger text, open modal <br />
  //         <button onClick={() => console.log('log1 log1 log1')}>Some console.log into modal and open modal</button>  <br />
  //         <button onClick={(e) => { e.preventDefault(); console.log('log2 log2 log2'); }}>Some console.log into modal  without open modal</button>
  //       </Trigger>
  //       <Content>
  //         Sample content
  //       </Content>
  //     </Modal>
  //   </Story>
  // ));

  // .add('Modal async trigger', () => {
  //   // npm i eventemitter3
  //   if (!require('eventemitter3')) {
  //     return <div>npm i eventemitter3</div>
  //   }
  //   const emitter = new require('eventemitter3').EventEmitter;
  //   // const emitter = {}
  //   const open = () => {
  //     setTimeout(() => {
  //       emitter.emit('open');
  //     }, 1000);
  //   };
  //   const close = () => {
  //     setTimeout(() => {
  //       emitter.emit('close');
  //     }, 1000);
  //   };
  //   return (<div>
  //     <button onClick={open}>
  //       Open async modal
  //     </button>
  //     <Modal emitter={emitter}>
  //       <Content>
  //         Sample content
  //         <button onClick={close}>
  //           Close async modal
  //         </button>
  //       </Content>
  //     </Modal>
  // </Story>
  //   </div>);
  // });
};
