let proxy = {};
const subscribers = {
  all: [],
  specific: {}
};

// create subscribe function, which allows to only subscribe to specific props
const subscribe = (fn, props) => {
  if (props) {
    props.forEach(prop => {
      if (!subscribers.specific[prop]) subscribers.specific[prop] = [];
      subscribers.specific[prop].push(fn);
    });
  } else subscribers.all.push(fn);
};

module.exports = () => {
  // create reference to state - this way, when we override it with a new object, we will still have a reference to the old one
  const old = window.player.state;

  // create proxy object to old state, which will call the relevant function subscribers
  proxy = new Proxy(old, {
    set: function(target, prop, value) {
      subscribers.all.forEach(fn => fn(target, prop, value));
      if (subscribers.specific[prop])
        subscribers.specific[prop].forEach(fn => fn(target, prop, value));
      return Reflect.set(target, prop, value);
    }
  });

  // override the state with our proxy object
  window.player.state = proxy;

  // create global object with subscribe function (maybe one day unsubscribe function if it's gonna be needed)
  window.hookedPlayer = {
    proxy,
    subscribe
  };
};
