import Pusher from "pusher-js";

class PusherService {
  constructor() {
    this.pusher = null;
    this.channel = null;
  }

  // Initialize Pusher
  initPusher(appKey, cluster) {
    this.pusher = new Pusher(appKey, {
      cluster: cluster,
      encrypted: true,
    });
  }

  // Subscribe to a channel
  subscribeToChannel(channelName) {
    if (!this.pusher) {
      throw new Error("Pusher is not initialized. Call initPusher first.");
    }
    this.channel = this.pusher.subscribe(channelName);
    return this.channel;
  }

  // Bind to an event
  bindEvent(eventName, callback) {
    if (!this.channel) {
      throw new Error(
        "No channel is subscribed. Call subscribeToChannel first."
      );
    }
    this.channel.bind(eventName, callback);
  }
}

// Export a singleton instance
export default new PusherService();
