type Subscriber<T> = (value: T) => void
type Updater<T> = (value: T) => T

export function storable<T>(value: T) {
  const subscribers = new Set<Subscriber<T>>()

  function set(newValue: T) {
    value = newValue
    subscribers.forEach((subscriber) => subscriber(value))
  }

  function update(updater: Updater<T>) {
    set(updater(value))
  }

  function subscribe(subscriber: Subscriber<T>) {
    subscribers.add(subscriber)

    return () => {
      subscribers.delete(subscriber)
    }
  }

  return { set, update, subscribe }
}