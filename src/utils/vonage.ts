import OT from '@opentok/client';

// replace these values with those generated in your TokBox Account
const apiKey = process.env.API_KEY;
const sessionId = process.env.SESSION_ID;
const token = process.env.TOKEN;

// (optional) add server code here

// Handling all of our errors here by alerting them
function handleError(error: any) {
  if (error) {
    console.log(error);
    alert(error.message);
  }
}

function initializeSession() {
  // check api key, session id and token is provided
  if (!apiKey || !sessionId || !token) {
    console.log('API key, SessionID and Token is not provided.');

    return;
  }

  // check the system is satisfy requirements
  if (OT.checkSystemRequirements() !== 1) {
    console.log('system does not satisfy the requirements');
  }

  // create session object
  const session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function (event) {
    session.subscribe(
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

  // Create a publisher
  const publisher = OT.initPublisher(
    'publisher',
    {
      insertMode: 'append',
      width: '100%',
      height: '100%',
    },
    handleError,
  );

  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}

export default initializeSession;
