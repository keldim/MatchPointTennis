export class LocalStorageStub {
  static store = {};
  static mockLocalStorage = {
    getItem: (key: string): string => {
      return key in LocalStorageStub.store ? LocalStorageStub.store[key] : null;
    },
    setItem: (key: string, value: string) => {
      LocalStorageStub.store[key] = `${value}`;
    }
  };
}
