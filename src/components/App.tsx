import React, { useEffect } from 'react';
import styled from 'styled-components';
import useRootStore from '@hooks/useRootStore';
import { observer } from 'mobx-react-lite';

const apiKey = process.env.API_KEY;
const sessionId = process.env.SESSION_ID;
const token = process.env.TOKEN;

const App = observer(() => {
  const { session, publisher, initSession, initPublisher, subscribe, handleError } = useRootStore();

  // check api key, session id and token is provided
  if (!apiKey || !sessionId || !token) {
    alert('API key, SessionID and Token is not provided.');

    return null;
  }

  /**
   * check system requirements and init session
   */
  useEffect(() => {
    // check the system is satisfy requirements
    if (OT.checkSystemRequirements() !== 1) {
      alert('system does not satisfy the requirements');
      return;
    }

    // create session object
    initSession(apiKey, sessionId);
  }, []);

  /**
   * init publisher effect
   */
  useEffect(() => {
    if (!session) {
      console.log('session is not initialized yet...');
      return;
    }

    // Create a publisher
    if (!publisher) {
      console.log('publisher is not initialized yet...');
      initPublisher(
        'publisher',
        {
          insertMode: 'append',
          width: '100%',
          height: '100%',
        },
        handleError,
      );

      return;
    }

    // Connect to the session
    session.connect(token, function (error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }, [session, publisher]);

  /**
   * subscribe stream effect
   */
  useEffect(() => {
    if (!session) {
      console.log('session is not initialized yet...');
      return;
    }

    // Subscribe to a newly created stream
    session.on('streamCreated', function (event) {
      subscribe(
        event.stream,
        'subscriber',
        {
          insertMode: 'append',
          width: '100%',
          height: '100%',
        },
        handleError,
      );
    });
  }, [session]);

  return (
    <Wrapper id="videos">
      <h1>Vonage Group Call Example</h1>
      <SubscriberWrapper id="subscriber"></SubscriberWrapper>
      <PublisherWrapper id="publisher"></PublisherWrapper>
    </Wrapper>
  );
});

export default App;

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
