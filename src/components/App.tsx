import React, { useEffect } from 'react';
import initializeSession from '@utils/vonage';
import styled from 'styled-components';
import useRootStore from '@hooks/useRootStore';
import { observer } from 'mobx-react-lite';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: lightgray;
`;

const SubscriberWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const PublisherWrapper = styled.div`
  position: absolute;
  width: 360px;
  height: 240px;
  bottom: 10px;
  left: 10px;
  z-index: 100;
  border: 3px solid white;
  border-radius: 3px;
`;

function App() {
  const { counter, add, sub } = useRootStore();

  useEffect(() => {
    initializeSession();
  }, []);

  return (
    <Wrapper id="videos">
      <h1>Vonage Group Call Example</h1>
      <SubscriberWrapper id="subscriber"></SubscriberWrapper>
      <PublisherWrapper id="publisher"></PublisherWrapper>
    </Wrapper>
  );
}

export default observer(App);
