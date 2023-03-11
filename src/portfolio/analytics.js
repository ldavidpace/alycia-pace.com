let analyticsQueue = [];

const generateId = () => {
  return Math.floor(Math.random() * Math.pow(10, 16));
};

const getUserId = () => {
  let userId = localStorage.getItem('domoliytics:usertracker');
  if (!userId) {
    userId = generateId();
    localStorage.setItem('domoliytics:usertracker', userId);
  }
  return userId;
}

const addGlobalTrackVar = (key, value) => {
  globalKeys[key] = value;
}

const globalKeys = {
  userId: getUserId()
}

var Analytics = Object.assign(Analytics, {
  track: (key, values) => {
    values = values || {};
    analyticsQueue.push({
      event: key,
      url: window.location.href,
      ...globalKeys,
      ...values,
    });
  },
  addGlobalTrackVar: addGlobalTrackVar
});

Analytics.windowLoadTime = Analytics.windowLoadTime | new Date().getTime();

function trackLoop() {
  if (analyticsQueue.length) {

    const body = analyticsQueue;

    fetch('https://webhooks.demo.domo.com/streams/v1/data/eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiIzMDczNDE0ODljOTQ0OTRjYWEwNWQ2YWFkZWI5MjZiOTpkZW1vMTpkYXZpZC1kZXYtMTAzMyJ9.w1rt-rf-lCiPFD6O7qJtU3wT4dDHSFCgWn2CMqu1_yc', {
      method: 'POST',
      mode: "no-cors",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    analyticsQueue = [];
  }
  // console.log('Idle Timeout');
  window.requestIdleCallback(trackLoop);
}

window.requestIdleCallback(() => {
  Analytics.track('InitialLoadFinished', {
    url: window.location.href,
    loadTime: new Date().getTime() - Analytics.windowLoadTime,
  });
  trackLoop();
});
