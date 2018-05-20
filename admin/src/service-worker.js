function showNotification(event) {
  return new Promise(resolve => {
      const { body, title, tag } = JSON.parse(event.data.text());

      self.registration
          .getNotifications({ tag })
          .then(existingNotifications => { // close? ignore? })
          .then(() => {
              const icon = `/path/to/icon`;
              return self.registration
                  .showNotification(title, { body, tag, icon })
          })
          .then(resolve)
  })
}

self.addEventListener("push", event => {
event.waitUntil(
  showNotification(event)
      );
  }
});

self.addEventListener("notificationclick", event => {
  event.waitUntil(clients.openWindow("/"));
});