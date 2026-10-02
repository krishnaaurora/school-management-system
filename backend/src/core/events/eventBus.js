import { EventEmitter } from 'events';

/**
 * In-Memory Event Bus for Decoupled Inter-Module Communication
 * Enables Modular Monolith domains to publish and subscribe to domain events
 * without tight coupling.
 */
class AppEventBus extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50);
  }

  publish(eventName, payload) {
    console.log(`[EventBus] 📡 Event Published: ${eventName}`, payload?.id || '');
    this.emit(eventName, payload);
  }

  subscribe(eventName, handler) {
    this.on(eventName, async (payload) => {
      try {
        await handler(payload);
      } catch (err) {
        console.error(`[EventBus] ❌ Handler error on event "${eventName}":`, err);
      }
    });
  }
}

export const eventBus = new AppEventBus();

// Standard Domain Event Names
export const DOMAIN_EVENTS = {
  LEAVE_REQUESTED: 'leaves:requested',
  LEAVE_APPROVED: 'leaves:approved',
  LEAVE_REJECTED: 'leaves:rejected',
  SUBSTITUTION_ASSIGNED: 'substitutions:assigned',
  TIMETABLE_UPDATED: 'timetables:updated',
  USER_REGISTERED: 'users:registered',
  ADMISSION_SUBMITTED: 'admissions:submitted',
};
