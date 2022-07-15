// TODO: make use of `isVirtual` field instead of this
// The 'old' version of the goldstar api did not have a specific field for virtual events so they came like this.
// Once the script is updated to reflect their new `isVirtual` field, and a migration was done, this function becomes redundant
export const isVirtualEvent = (eventLocation: string | undefined) =>
  eventLocation === 'undefined, undefined, undefined';
